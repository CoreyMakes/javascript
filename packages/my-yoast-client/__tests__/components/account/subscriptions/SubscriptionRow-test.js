import React from 'react';
import { createComponentWithIntl } from "../../../../utils";
import { MemoryRouter } from "react-router-dom";
import SubscriptionRow from '../../../../src/components/account/subscriptions/SubscriptionRow';

test('The Subscription component matches the snapshot', () => {
	const component = createComponentWithIntl(
		<MemoryRouter>
			<SubscriptionRow

				subscriptionsArray={
					[
						{
							id: "a",
							name: "SEO Premium for WordPress",
							iconSource: "https://yoast-mercury.s3.amazonaws.com/uploads/2013/02/Yoast_Icon_Large_RGB.png",
							used: 14,
							limit: 20,
							status: "active",
							hasNextPayment: true,
							nextPayment: new Date( "April 4, 2017" ),
							endDate: new Date(),
							billingAmount: 12512,
							billingCurrency: "USD",
						},
					]
				}
				onManage={ () => {
					console.log( "clicked on manage button" );
				} }
				isGrouped={ false }
		/>
		</MemoryRouter>
	);

	let tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
