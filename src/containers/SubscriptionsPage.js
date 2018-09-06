import { connect } from "react-redux";
import { onSearchQueryChange } from "../actions/search";
import { getAllSubscriptions } from "../actions/subscriptions";
import SubscriptionsPage from "../components/SubscriptionsPage";
import { push } from "react-router-redux";
import { getOrders } from "../actions/orders";

export const mapStateToProps = ( state ) => {
	let allIds = state.entities.subscriptions.allIds;

	let subscriptions = allIds.map( ( subscriptionId ) => {
		let subscription = state.entities.subscriptions.byId[ subscriptionId ];
		// Selects the latest order to get the latest subscription number.
		let orderId = subscription.orders.slice( -1 )[ 0 ];
		let order = state.entities.orders.byId[ orderId ];

		let subscriptionProps = {
			id: subscription.id,
			icon: subscription.product.icon,
			name: subscription.name,
			subscriptionNumber: order.invoiceNumber,
			used: subscription.used,
			limit: subscription.limit,
			requiresManualRenewal: subscription.requiresManualRenewal,
			hasNextPayment: subscription.nextPayment !== null,
			nextPayment: new Date( subscription.nextPayment ),
			hasEndDate: subscription.endDate !== null,
			endDate: new Date( subscription.endDate ),
			billingAmount: subscription.price,
			billingCurrency: subscription.currency,
			status: subscription.status,
		};
		return subscriptionProps;
	} );

	let query = state.ui.search.query;

	if ( query.length > 0 ) {
		subscriptions = subscriptions.filter( ( subscription ) => {
			let formattedDate = new Intl.DateTimeFormat( "en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			} ).format( subscription.nextPayment );

			return subscription.name.toUpperCase().includes( query.toUpperCase() ) ||
							subscription.limit.toString() === query ||
							subscription.used.toString() === query ||
							formattedDate.toUpperCase().includes( query.toUpperCase() ) ||
							( subscription.billingAmount / 100 ).toString().includes( query.toUpperCase() );
		} );
	}

	subscriptions = subscriptions.filter( ( subscription ) => {
		if ( ! subscription.hasEndDate ) {
			return true;
		}

		let currentDate = new Date();
		let endDate = new Date( subscription.endDate );
		endDate.setMonth( endDate.getMonth() + 1 );

		return currentDate.getTime() <= endDate.getTime();
	} );

	return {
		subscriptions,
		query,
	};
};

export const mapDispatchToProps = ( dispatch, ownProps ) => {
	return {
		onSearchChange: ( query ) => {
			dispatch( onSearchQueryChange( query ) );
		},
		onManage: ( subscriptionId ) => {
			dispatch( push( "/account/subscriptions/" + subscriptionId ) );
		},
		loadData: () => {
			dispatch( getOrders() );
			dispatch( getAllSubscriptions() );
		},
	};
};

const SubscriptionsPageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)( SubscriptionsPage );

export default SubscriptionsPageContainer;
