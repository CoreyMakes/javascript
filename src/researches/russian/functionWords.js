const transitionWords = require( "./transitionWords.js" )().allWords;

/**
 * Returns an object with exceptions for the prominent words researcher
 * @returns {Object} The object filled with exception arrays.
 */

// Verbs
const filteredPassiveAuxiliaries = [ "быть", "был", "была", "было", "были", "будет", "будут"];
const otherAuxiliaries = [
	"мочь", "мог", "могла", "могли", "могу", "можешь", "может", "можем", "можете", "могут",
	"смочь", "смогу", "сможешь", "сможет", "сможем", "сможете", "смогут",
	"решиться", "решился", "решилась", "решились", "решусь", "решишься", "решится", "решимся", "решитесь", "решатся",
	"делать", "делал", "делала", "делало", "делали", "делали", "делаю", "делаешь", "делает", "делаем", "делаете", "делают",
	"сделать", "сделал", "сделала", "сделало", "сделали", "сделали", "сделаю", "сделаешь", "сделает", "сделаем", "сделаете", "сделают",
	"иметь", "имел", "имела", "имело", "имели", "имею", "имеешь", "имеет", "имеем", "имеете", "имеют",
	"следует", "следовало", "необходимо", "необходим", "необходима", "необходимы", "нужно", "нужен", "нужна",
	"обязан", "обязана", "обязано", "обязаны",
	"должен", "должна", "должно", "должны",
	"требуется", "требуются",
	"имеется", "имеются",
];
const copula = [
	"появиться", "появился","появилась", "появилось", "появились", "появлюсь", "появишься", "появится", "появимся", "появитесь", "появимся",
	"появляться", "появлялся", "появлялась", "появлялось", "появлялись", "появляюсь", "появляешься", "появляется", "появляемся", "появляются", "появляетесь",
	"стал", "стала", "стало", "стану", "станешь", "станет", "станем", "станете", "станут",
	"становиться", "становился", "становилось", "становилась", "становились", "становлюсь", "становишься", "становится", "становимся", "становитесь", "становятся",
	"прийти", "пришел", "пришёл", "пришла", "пришло", "пришли", "приду", "придешь", "придёшь", "придет", "придёт", "придем", "придём", "придете", "придёте", "придут",
	"приходить", "приходил", "приходила", "приходило", "приходили", "прихожу", "приходишь", "приходит", "приходим", "приходите", "приходят",
	"держать", "держал", "держала", "держало", "держали", "держу", "держишь", "держит", "держим", "держите", "держут",
	"содержать", "содержал", "содержала", "содержало", "содержали", "содержу", "содержишь", "содержит", "содержим", "содержите", "содержут",
	"остаться", "остался", "осталась", "осталось", "остались", "останусь", "останешься", "останется", "останутся", "останетесь", "останемся",
	"оставаться", "оставался", "оставалась", "оставалось", "оставались", "остаюсь", "остаешься", "остаёшься", "остается", "остаётся", "остаемся", "остаёмся", "остаетесь", "остаётесь", "остаются",
	"изменяться", "изменялся", "изменялась", "изменялось", "изменялись", "изменюсь", "изменишься", "изменится", "изменимся", "изменитесь", "изменятся",
];

// These verbs are frequently used in interviews to indicate questions and answers.
const interviewVerbs = [
	"сказать", "сказал", "сказала", "сказали",
	"говорить", "говорил", "говорила", "говорили", "говорит", "говорю", "говорим", "говоришь", "говорят", "говорите",
	"объявить", "объявил", "объявила", "объявили",
	"заявить", "заявил", "заявила", "заявили",
	"спросить", "спросил", "спросила", "спросили",
	"указать", "указал", "указала", "указали",
	"объяснить", "объяснил", "объяснила", "объяснили",
	"подумать", "подумал", "подумала", "подумали",
	"думать", "думал", "думала", "думали", "думаю", "думает", "думаешь", "думаем", "думаете", "думают",
	"рассказывать", "рассказывал", "рассказывала", "рассказывали", "рассказывают", "рассказывает",
	"рассказать", "рассказал", "рассказала", "рассказали",
	"обсудить", "обсудил", "обсудила", "обсудили",
	"предложить", "предложил", "предложила", "предложили",
	"понимать", "понимал", "понимала", "понимали", "понимаю", "понимаешь", "понимает", "понимаем", "понимаете", "понимают",
	"добавить", "добавил", "добавила", "добавили", "добавлю", "добавишь", "добавит", "добавим", "добавите", "добавят",
];
const delexicalizedVerbs = [
	"казаться", "кажется", "казалось", "казалась", "казался", "казались", "кажутся",
	"давайте", "давай",
	"хотеть", "хочу", "хочешь", "хочет", "хотим", "хотите", "хотят", "хотел", "хотела", "хотело", "хотели",
	"показать", "показал", "показала", "показало", "показали", "покажу", "покажешь", "покажет", "покажем", "покажете", "покажут",
	"показывать", "показывал", "показывала", "показывало", "показывали", "показываю", "показываешь", "показывает", "показываем", "показываете", "показывают",
	"идти", "шел", "шёл", "шла", "шло", "шли", "иду", "идешь", "идёшь", "идет", "идёт", "идем", "идём", "идете", "идёте", "идут",
	"брать", "брал", "брала", "брало", "брали", "беру", "берешь", "берёшь", "берёт", "берем", "берём", "берёте", "берут",
	"взять", "взял", "взяла", "взяло", "взяли", "возьму", "возьмешь", "возьмет", "возьмем", "возьмете", "возьмут",
	"класть", "кладу", "кладешь", "кладет", "кладёшь", "кладёт", "кладем", "кладете", "кладём", "кладёте", "кладут",
	"положить", "положил", "положила", "положило", "положили", "положу", "положишь", "положит", "положим", "положите", "положат",
	"использовать", "использовал", "использовала", "использовало", "использовали", "использую", "используешь", "используем", "используете", "используют",
	"пробовать", "пробовал", "пробовала", "пробовало", "пробовали", "пробую", "пробуешь", "пробует", "пробуем", "пробуете", "пробуют",
	"попробовать", "попробовал", "попробовала", "попробовало", "попробовали", "попробую", "попробуешь", "попробует", "попробуем", "попробуете", "попробуют",
	"иметь", "имел", "имела", "имело", "имели", "имею", "имеешь", "имеет", "имеем", "имеете", "имеют",
	"означать", "означал", "означала", "означало", "означали", "означает", "означают",
	"добавлять", "добавлял", "добавляла", "добавляло", "добавляли", "добавляю", "добавляешь", "добавляет", "добавляем", "добавляете", "добавляют",
	"состоять", "состоял", "состояла", "состояло", "состояли", "состою", "состоишь", "состоит", "состоим", "состоите", "состоят",
	"убеждаться", "убедился", "убедилась", "убедилось", "убедишься", "убедится", "убедимся", "убедитесь", "убедятся",
	"убеждать", "убедил", "убедила", "убедили", "убедишь", "убедит", "убедим", "убедите", "убедят",
	"являться", "являлся", "являлась", "являлось", "являлись", "являюсь", "являешься", "является", "являемся", "являетесь", "являются",
];

// Numerals
const cardinalNumerals = [
	"один", "одна", "одно", "одни",
	"два", "две",
	"три", "четыре", "пять", "шесть", "семь", "восемь", "девять", "десять", "одиннадцать",
	"двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать",
	"двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто", "сто", "сотни",
	"двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот",
	"тысяча", "тысячи", "тысяче", "тысячей", "тысячам", "тысячами", "тысячах",
	"миллион", "миллиона", "миллиону", "миллионом", "миллионе", "миллионы", "миллионов", "миллионам", "миллионами", "миллионах",
	"миллиард", "миллиарда", "миллиарду", "миллиардом", "миллиарде", "миллиарды", "миллиардов", "миллиардам","миллиардами", "миллиардах",
];

const ordinalNumerals = [
	"первый", "первого", "первому", "первом", "первым", "первая", "первой", "первое", "первые", "первых", "первыми",
	"второй", "второго", "второму", "втором", "вторым", "вторая", "второй", "второе", "вторые", "вторых", "вторыми",
	"третий", "третьего", "третьему", "третьим", "третьем", "третья", "третьей", "третье", "третьи", "третьих", "третьими",
	"четвертый", "четвертого","четвертому", "четвертым", "четвертом", "четвертая", "четвертой", "четвертое", "четвертые", "четвертых", "четвертыми",
	"пятый", "пятого", "пятому", "пятом", "пятым", "пятая", "пятое", "пятые", "пятых", "пятыми",
	"шестой", "шестого", "шестому", "шестым", "шестая", "шестое", "шестые", "шестых", "шестыми",
	"седьмой", "седьмого", "седьмому", "седьмым", "седьмая", "седьмое", "седьмые", "седьмых", "седьмыми",
	"восьмой", "восьмого", "восьмому", "восьмым", "восьмая", "восьмое", "восьмые", "восьмых", "восьмыми",
	"девятый", "девятого", "девятому", "девятым", "девятая", "девятое", "девятые", "девятых", "девятыми",
	"десятый", "десятого", "десятому", "десятым", "десятая", "десятое", "десятые", "десятых", "десятыми",
	"одиннадцатый", "одиннадцатого", "одиннадцатому", "одиннадцатым", "одиннадцатая", "одиннадцатое", "одиннадцатые", "одиннадцатых", "одиннадцатыми",
	"двенадцатый", "двенадцатого", "двенадцатому", "двенадцатым", "двенадцатая", "двенадцатое", "двенадцатые", "двенадцатых", "двенадцатыми",
	"тринадцатый", "тринадцатого", "тринадцатому", "тринадцатым", "тринадцатая", "тринадцатое", "тринадцатые", "тринадцатых", "тринадцатыми",
	"четырнадцатый", "четырнадцатого", "четырнадцатому", "четырнадцатым", "четырнадцатая", "четырнадцатое", "четырнадцатые", "четырнадцатых", "четырнадцатыми",
	"пятнадцатый", "пятнадцатого", "пятнадцатому", "пятнадцатым", "пятнадцатая", "пятнадцатое", "пятнадцатые", "пятнадцатых", "пятнадцатыми",
	"шестнадцатый", "шестнадцатого", "шестнадцатому", "шестнадцатым", "шестнадцатая", "шестнадцатое", "шестнадцатые", "шестнадцатых", "шестнадцатыми",
	"семнадцатый", "семнадцатого", "семнадцатому", "семнадцатым", "семнадцатая", "семнадцатое", "семнадцатые", "семнадцатых", "семнадцатыми",
	"восемнадцатый", "восемнадцатого", "восемнадцатому", "восемнадцатым", "восемнадцатая", "восемнадцатое", "восемнадцатые", "восемнадцатых", "восемнадцатыми",
	"девятнадцатый", "девятнадцатого", "девятнадцатому", "девятнадцатым", "девятнадцатая", "девятнадцатое", "девятнадцатые", "девятнадцатых", "девятнадцатыми",
	"двадцатый", "двадцатого", "двадцатому", "двадцатым", "двадцатая", "двадцатое", "двадцатые", "двадцатых", "двадцатыми",
	"тридцатый", "тридцатого", "тридцатому", "тридцатым", "тридцатая", "тридцатое", "тридцатые", "тридцатых", "тридцатыми",
	"сороковой", "сорокового", "сороковому", "сороковым", "сороковая", "сороковое", "сороковые", "сороковых", "сороковыми",
	"пятидесятый", "пятидесятого", "пятидесятому", "пятидесятым", "пятидесятая", "пятидесятое", "пятидесятые", "пятидесятых", "пятидесятыми",
	"шестидесятый", "шестидесятого", "шестидесятому", "шестидесятым", "шестидесятая", "шестидесятое", "шестидесятые", "шестидесятых", "шестидесятыми",
	"семидесятый", "семидесятого", "семидесятому", "семидесятым", "семидесятая", "семидесятое", "семидесятые", "семидесятых", "семидесятыми",
	"восьмидесятый", "восьмидесятого", "восьмидесятому", "восьмидесятым", "восьмидесятая", "восьмидесятое", "восьмидесятые", "восьмидесятых", "восьмидесятыми",
	"девяностый", "девяностого", "девяностому", "девяностым", "девяностая", "девяностое", "девяностые", "девяностых", "девяностыми",
	"сотый", "сотого", "сотому", "сотым", "сотая", "сотое", "сотые", "сотых", "сотыми",
	"двухсотый", "двухсотого", "двухсотому", "двухсотым", "двухсотая", "двухсотое", "двухсотые", "двухсотых", "двухсотыми",
	"трехсотый", "трехсотого", "трехсотому", "трехсотым", "трехсотая", "трехсотое", "трехсотые", "трехсотых", "трехсотыми",
	"трёхсотый", "трёхсотого", "трёхсотому", "трёхсотым", "трёхсотая", "трёхсотое", "трёхсотые", "трёхсотых", "трёхсотыми",
	"четырехсотый", "четырехсотого", "четырехсотому", "четырехсотым", "четырехсотая", "четырехсотое", "четырехсотые", "четырехсотых", "четырехсотыми",
	"четырёхсотый", "четырёхсотого", "четырёхсотому", "четырёхсотым", "четырёхсотая", "четырёхсотое", "четырёхсотые", "четырёхсотых", "четырёхсотыми",
	"пятисотый", "пятисотого", "пятисотому", "пятисотым", "пятисотая", "пятисотое", "пятисотые", "пятисотых", "пятисотыми",
	"шестисотый", "шестисотого", "шестисотому", "шестисотым", "шестисотая", "шестисотое", "шестисотые", "шестисотых", "шестисотыми",
	"семисотый", "семисотого", "семисотому", "семисотым", "семисотая", "семисотое", "семисотые", "семисотых", "семисотыми",
	"восьмисотый", "восьмисотого", "восьмисотому", "восьмисотым", "восьмисотая", "восьмисотое", "восьмисотые", "восьмисотых", "восьмисотыми",
	"девятисотый", "девятисотого", "девятисотому", "девятисотым", "девятисотая", "девятисотое", "девятисотые", "девятисотых", "девятисотыми",
	"тысячный", "тысячного", "тысячному", "тысячным", "тысячная", "тысячное", "тысячные", "тысячных", "тысячными",
	"миллионный", "миллионного", "миллионному", "миллионным", "миллионная", "миллионное", "миллионные", "миллионных", "миллионными",
	"миллиардный", "миллиардного", "миллиардному", "миллиардным", "миллиардная", "миллиардное", "миллиардные", "миллиардных", "миллиардными",
];

// Pronouns (in all cases)
const personalPronouns = [
	"я", "меня", "мне", "мной", "мною",
	"ты", "тебя", "тебе", "тобой",
	"он", "его", "ему", "нем", "нём", "им", "ним",
	"она", "ее", "её", "ей", "ею", "ней", "нею",
	"оно",
	"мы", "нам", "нас", "нами",
	"вы", "вас", "вам", "вами",
	"они", "них", "ими", "ними", "их",
];
const demonstrativePronouns = [ 
	"тот", "тому", "том", "тем", "того", "та", "той", "то", "те", "тех", "теми",
	"этот", "этому", "этом", "этим", "этого", "эта", "этой", "это", "эти", "этих", "этими",
	"такой", "такого", "такому", "таким", "таком", "такая", "такое", "такие", "таких", "такими",
	"этакий", "этакого", "этакому", "этаким", "этаком", "этакая", "этакое", "этакие", "этаких", "этакими",
];
const possessivePronouns = [ 
	"мой", "моего", "моему", "моём", "моим", "моя", "моей", "мое", "моё", "мои", "моих", "моим",
	"твой", "твоего", "твоему", "твоём", "твоем", "твоим", "твоя", "твоей", "твое", "твоё", "твои", "твоих", "твоим",
	"свой", "своего", "своему", "своём", "своем", "своим", "своя", "своей", "свое", "своё", "свои", "своих", "своим",
	// Words "его", "ее", "их" already included in personalPronouns
	"наш", "нашего", "нашему", "нашем", "наша", "нашей", "наше", "наши", "нашим", "наших",
	"ваш", "вашего", "вашему", "вашем", "ваша", "вашей", "ваше", "ваши", "вашим", "ваших",
];
const quantifiers = [
	"некоторый", "некоторого", "некоторому", "некоторым", "некотором", "некоторая", "некоторую", "некоторое", "некоторые", "некоторых", "некоторыми",
	"многие", 
	"много", 
	"множество",
	"каждый", "каждого", "каждому", "каждым", "каждом", "каждая", "каждую", "каждое", "каждые", "каждых", "каждыми",
	"достаточно", 
	"мало",
	"больше", 
	"большинство", "большинства", "большинству", "большинстве",
	"несколько", "нескольких",
	"меньше",
	"наиболее",
	"наименее",
	// For expressions like "что угодно", "кто угодно", "зачем угодно"
	"угодно", "же",
];
const reflexivePronouns = [ "себя" ];
const indefinitePronouns = [
	"ничто","ничего", "ничему", "ничем", "ни о чем", "ни о чём",
	"никого", "никому", "никем", "ни о ком",
	"весь", "всего", "всему", "всем", "всём", "все", "всех", "всеми",
	"всякий", "всякого", "всякому", "всяким", "всяком", "всякая", "всякой", "всякую", "всякое", "всякие", "всяких", "всякими",
	"кто-то", "кого-то", "кому-то", "кем-то", "ком-то",
	"что-то", "чего-то", "чему-то", "чем-то", "чём-то",
	"кто-либо", "кого-либо", "кому-либо", "кем-либо", "ком-либо",
	"что-либо", "чего-либо", "чему-либо", "чем-либо", "чём-либо",
	"кое-кто", "кое-кого", "кое-кому", "кое-кем", "кое-ком",
	"кое-что", "кое-чего", "кое-чему", "кое-чем", "кое-чём",
	"любой", "любого", "любому", "любым", "любом", "любая", "любую", "любое", "любые", "любых", "любыми",
	"какой", "какого", "какому", "каким", "каком", "какая", "какую", "какое", "какие", "каких", "какими",
];
const indefinitePronounsPossessive  = [
	"чей-то", "чьего-то", "чьему-то", "чьим-то", "чьем-то", "чьём-то", "чья-то", "чьей-то", "чье-то", "чьё-то", "чьи-то", "чьих-то", "чьими-то",
	"ничей", "чьего", "чьему", "чьим", "чьем", "чьём", "чья", "чьей", "чье", "чьё", "чьи", "чьих", "чьими",
	"ничейный", "ничейного", "ничейному", "ничейным", "ничейном", "ничейная", "ничейной", "ничейную", "ничейное", "ничейные", "ничейных", "ничейными",
];

// Interrogatives, adverbs, intensifiers, adjectives
const interrogativeDeterminers = [
	"который", "которого", "которому", "которым", "котором", "которая", "которую", "которое", "которые", "которых", "которыми",
	"чей", "чьего", "чьему", "чьим", "чьем", "чьём", "чья", "чьей", "чье", "чьё", "чьи", "чьих", "чьими",
];
const interrogativePronouns = [
	"кто", "кого", "кому", "кем", 
	"что", "чего", "чему", "чем", "чём",
];
const interrogativeProAdverbs = [
	"где",
	"куда",
	"откуда",
	"как",
	"почему",
	"зачем",
	"сколько",
	"ли",
	"то",
	];
const locativeAdverbs = [ "везде", "нигде", "там", "здесь", "повсюду"];
const adverbialGenitives = [ "никогда", "всегда", "однажды", "единожды", "дважды", "трижды", "четырежды" ];
const intensifiers = [
	"чрезвычайно", "очень", "крайне", "абсолютно", "полностью", "совершенно",
	"довольно", "несколько", "значительно",
	"немного", "немножко", "частично",
];
const generalAdjectivesAdverbs = [
	"базовый", "базового", "базовому", "базовым", "базовом", "базовая", "базовой", "базовое", "базовые", "базовых", "базовым", "базовыми",
	"быстрый", "быстрого", "быстрому", "быстрым", "быстром", "быстрая", "быстрой", "быстрое", "быстрые", "быстрых", "быстрым", "быстрыми",
	"быстрейший", "быстрейшего", "быстрейшему", "быстрейшим", "быстрейшем", "быстрейшая", "быстрейшей", "быстрейшее", "быстрейшие", "быстрейших", "быстрейшим", "быстрейшими",
	"большой", "большого", "большому", "большим", "большом", "большая", "большое", "большие", "больших", "большим", "большими",
	"быстрее",
	"важный", "важного", "важному", "важным", "важном", "важная", "важной", "важное", "важные", "важных", "важным", "важными",
	"важнее",
	"возможный", "возможного", "возможному", "возможным", "возможном", "возможная", "возможной", "возможное", "возможные", "возможных", "возможным", "возможными",
	"высокий", "высокого", "высокому", "высоким", "высоком", "высокая", "высокой", "высокое", "высокие", "высоких", "высоким", "высокими",
	"выше",
	"главный", "главного", "главному", "главным", "главном", "главная", "главной", "главное", "главные", "главных", "главным", "главными",
	"далекий", "далекого", "далекому", "далеким", "далеком", "далекая", "далекой", "далекое", "далекие", "далеких", "далеким", "далекими",
	"далёкий", "далёкого", "далёкому", "далёким", "далёком", "далёкая", "далёкой", "далёкое", "далёкие", "далёких", "далёким", "далёкими",
	"длиннее",
	"длинный", "длинного", "длинному", "длинным", "длинном", "длинная", "длинной", "длинное", "длинные", "длинных", "длинным", "длинными",
	"доступный", "доступного", "доступному", "доступным", "доступном", "доступная", "доступной", "доступное", "доступные", "доступных", "доступным", "доступными",
	"жуткий", "жуткого", "жуткому", "жутким", "жутком", "жуткая", "жуткой", "жуткое", "жуткие", "жутких", "жутким", "жуткими",
	"законченный", "законченного", "законченному", "законченным", "законченном", "законченная", "законченной", "законченное", "законченные", "законченных", "законченным", "законченными",
	"занят", "занята", "заняты",
	"занятой", "занятого", "занятому", "занятым", "занятом", "занятая", "занятое", "занятые", "занятых", "занятым", "занятыми",
	"короткий", "короткого", "короткому", "коротким", "коротком", "короткая", "короткой", "короткое", "короткие", "коротких", "коротким", "короткими",
	"короче",
	"кошмарный", "кошмарного", "кошмарному", "кошмарным", "кошмарном", "кошмарная", "кошмарной", "кошмарное", "кошмарные", "кошмарных", "кошмарным", "кошмарными",
	"красивый", "красивого", "красивому", "красивым", "красивом", "красивая", "красивой", "красивое", "красивые", "красивых", "красивым", "красивыми",
	"лёгкий", "лёгкого", "лёгкому", "лёгким", "лёгком", "лёгкая", "лёгкой", "лёгкое", "лёгкие", "лёгких", "лёгким", "лёгкими",
	"легкий", "легкого", "легкому", "легким", "легком", "легкая", "легкой", "легкое", "легкие", "легких", "легким", "легкими",
	"легко",
	"легче",
	"лучше",
	"лучший", "лучшего", "лучшему", "лучшим", "лучшем", "лучшая", "лучшей", "лучшее", "лучшие", "лучших", "лучшим", "лучшими",
	"маленький", "маленького", "маленькому", "маленьким", "маленьком", "маленькая", "маленькой", "маленькое", "маленькие", "маленьких", "маленьким", "маленькими",
	"малюсенький", "малюсенького", "малюсенькому", "малюсеньким", "малюсеньком", "малюсенькая", "малюсенькой", "малюсенькое", "малюсенькие", "малюсеньких", "малюсеньким", "малюсенькими",
	"меньший", "меньшего", "меньшему", "меньшим", "меньшем", "меньшая", "меньшей", "меньшее", "меньшие", "меньших", "меньшим", "меньшими",
	"многочисленный", "многочисленного", "многочисленному", "многочисленным", "многочисленном", "многочисленная", "многочисленной", "многочисленное", "многочисленные", "многочисленных", "многочисленным", "многочисленными",
	"молодой", "молодого", "молодому", "молодым", "молодом", "молодая", "молодое",
	"называемый", "называемого", "называемому", "называемым", "называемом", "называемая", "называемой", "называемое", "называемые", "называемых", "называемым", "называемыми",
	"больший", "большего", "большему", "большим", "большем", "большая", "большей", "большее", "большие", "больших", "большим", "большими",
	"наибольший", "наибольшего", "наибольшему", "наибольшим", "наибольшем", "наибольшая", "наибольшей", "наибольшее", "наибольшие", "наибольших", "наибольшим", "наибольшими",
	"меньший", "меньшего", "меньшему", "меньшим", "меньшем", "меньшая", "меньшей", "меньшее", "меньшие", "меньших", "меньшим", "меньшими",
	"наименьший", "наименьшего", "наименьшему", "наименьшим", "наименьшем", "наименьшая", "наименьшей", "наименьшее", "наименьшие", "наименьших", "наименьшим", "наименьшими",
	"наихудший", "наихудшего", "наихудшему", "наихудшим", "наихудшем", "наихудшая", "наихудшей", "наихудшее", "наихудшие", "наихудших", "наихудшим", "наихудшими",
	"напрямую",
	"настоящий", "настоящего", "настоящему", "настоящим", "настоящем", "настоящая", "настоящей", "настоящее", "настоящие", "настоящих", "настоящим", "настоящими",
	"недавний", "недавнего", "недавнему", "недавним", "недавнем", "недавняя", "недавней", "недавнее", "недавние", "недавних", "недавним", "недавними",
	"необходимый", "необходимого", "необходимому", "необходимым", "необходимом", "необходимая", "необходимой", "необходимое", "необходимые", "необходимых", "необходимым", "необходимыми",
	"ниже",
	"низкий", "низкого", "низкому", "низким", "низком", "низкая", "низкой", "низкое", "низкие", "низких", "низким", "низкими",
	"новейший", "новейшего", "новейшему", "новейшим", "новейшем", "новейшая", "новейшей", "новейшее", "новейшие", "новейших", "новейшим", "новейшими",
	"новый", "нового", "новому", "новым", "новом", "новая", "новое", "новые", "новых", "новым", "новыми",
	"нормальный", "нормального", "нормальному", "нормальным", "нормальном", "нормальная", "нормальное", "нормальные", "нормальных", "нормальным", "нормальными",
	"обыкновенный", "обыкновенного", "обыкновенному", "обыкновенным", "обыкновенном", "обыкновенная", "обыкновенное", "обыкновенные", "обыкновенных", "обыкновенным", "обыкновенными",
	"обычный", "обычного", "обычному", "обычным", "обычном", "обычная", "обычное", "обычные", "обычных", "обычным", "обычными",
	"основной", "основного", "основному", "основным", "основном", "основная", "основное", "основные", "основных", "основным", "основными",
	"особенный", "особенного", "особенному", "особенным", "особенном", "особенная", "особенное", "особенные", "особенных", "особенным", "особенными",
	"отличный", "отличного", "отличному", "отличным", "отличном", "отличная", "отличное", "отличные", "отличных", "отличным", "отличными",
	"очевидный", "очевидного", "очевидному", "очевидным", "очевидном", "очевидная", "очевидное", "очевидные", "очевидных", "очевидным", "очевидными",
	"плохой", "плохого", "плохому", "плохим", "плохом", "плохая", "плохое", "плохие", "плохих", "плохим", "плохими",
	"последний", "последнего", "последнему", "последним", "последнем", "последняя", "последней", "последнее", "последние", "последних", "последним", "последними",
	"постоянно",
	"постоянный", "постоянного", "постоянному", "постоянным", "постоянном", "постоянная", "постоянное", "постоянные", "постоянных", "постоянным", "постоянными",
	"похожий", "похожего", "похожему", "похожим", "похожем", "похожая", "похожей", "похожее", "похожие", "похожих", "похожим", "похожими",
	"почти",
	"предыдущий", "предыдущего", "предыдущему", "предыдущим", "предыдущем", "предыдущая", "предыдущей", "предыдущее", "предыдущие", "предыдущих", "предыдущим", "предыдущими",
	"простейший", "простейшая", "простейшей",
	"простой", "простого", "простому", "простым", "простом", "простая", "простое", "простые", "простых", "простым", "простыми",
	"проще",
	"ранний", "раннего", "раннему", "ранним", "раннем", "ранняя", "ранней", "раннее", "ранние", "ранних", "ранним", "ранними",
	"самый", "самого", "самому", "самым", "самом", "самая", "самой", "самое", "самые", "самых", "самым", "самыми",
	"собственный", "собственного", "собственному", "собственным", "собственном", "собственная", "собственное", "собственные", "собственных", "собственным", "собственными",
	"специальный", "специального", "специальному", "специальным", "специальном", "специальная", "специальное", "специальные", "специальных", "специальным", "специальными",
	"специфичный", "специфичного", "специфичному", "специфичным", "специфичном", "специфичная", "специфичное", "специфичные", "специфичных", "специфичным", "специфичными",
	"средний", "среднего", "среднему", "средним", "среднем", "средняя", "средней", "среднее", "средние", "средних", "средним", "средними",
	"старейший", "старейшего", "старейшему", "старейшим", "старейшем", "старейшая", "старейшей", "старейшее", "старейшие", "старейших", "старейшим", "старейшими",
	"старый", "старого", "старому", "старым", "старом", "старая", "старой", "старое", "старые", "старых", "старым", "старыми",
	"текущий", "текущего", "текущему", "текущим", "текущем", "текущая", "текущей", "текущее", "текущие", "текущих", "текущим", "текущими",
	"тяжелее",
	"тяжёлый", "тяжёлого", "тяжёлому", "тяжёлым", "тяжёлом", "тяжёлая", "тяжёлое", "тяжёлые", "тяжёлых", "тяжёлым", "тяжёлыми",
	"тяжелый", "тяжелого", "тяжелому", "тяжелым", "тяжелом", "тяжелая", "тяжелое", "тяжелые", "тяжелых", "тяжелым", "тяжелыми",
	"хороший", "хорошего", "хорошему", "хорошим", "хорошем", "хорошая", "хорошей", "хорошее", "хорошие", "хороших", "хорошим", "хорошими",
	"хорошо",
	"худший", "худшего", "худшему", "худшим", "худшем", "худшая", "худшей", "худшее", "худшие", "худших", "худшим", "худшими",
	"хуже",
	"целый", "целого", "целому", "целым", "целом", "целая", "целой", "целое", "целые", "целых", "целым", "целыми",
];

// Prepositions, taken from https://github.com/sshra/database-russian-morphology/blob/master/words-russian-prepositions-morf.sql.gz
const prepositions = [ "а-ля", "без", "безо", "без ведома", "благодаря", "близ", "в", "во", "в адрес", "в аспекте",
	"в виде", "в глазах", "в глубь", "в деле", "в дополнение к", "в духе", "в завершение", "в зависимости от",
	"в заключение", "в знак", "в интересах", "в качестве", "в лице", "в меру", "в направлении", "в направлении к",
	"в направлении ко", "в нарушение", "в области", "в обмен на", "в обстановке", "в обход", "в ответ на",
	"в отдалении от", "в отличие от", "в отношении", "в память", "в плане", "в пользу", "в порядке", "в предвидении",
	"в предвкушении", "в преддверии", "в присутствии", "в продолжение", "в противность", "в противовес",
	"в противоположность", "в процессе", "в разрезе", "в районе", "в рамках", "в рассуждении", "в расчете на",
	"в результате", "в роли", "в ряду", "в свете", "в связи с", "в связи со", "в силу", "в случае", "в смысле",
	"в согласии с", "в сообществе с", "в соответствии с", "в соответствии со", "в сопоставлении с", "в сопровождении",
	"в составе", "в сравнении с", "в сравнении со", "в стороне от", "в сторону", "в сфере", "в счет", "в течение",
	"в угоду", "в унисон с", "в условиях", "в ущерб", "в форме", "в ходе", "в целях", "в честь", "в числе", "в число",
	"вблизи", "вблизи от", "вверху", "ввиду", "вглубь", "вдалеке от", "вдали", "вдали от", "вдобавок к", "вдобавок ко",
	"вдогон", "вдогонку", "вдоль", "вдоль по", "взамен", "включая", "вкось", "вкруг", "вместе с", "вместе со", "вместо",
	"вне", "вне зависимости от", "внизу", "внутри", "внутрь", "вовнутрь", "во время", "во главе", "во главе с",
	"во главе со", "во избежание", "во изменение", "во имя", "во исполнение", "во славу", "возле", "вокруг", "волею",
	"вопреки", "вперед", "впереди", "вплоть до", "впредь до", "вразрез", "времен", "вроде", "вслед", "вослед", "вслед за",
	"вследствие", "выше", "для", "до", "за", "за исключением", "за счет", "заботами", "из", "изо", "из числа", "из-за",
	"из-под", "из-подо", "изнутри", "именем", "имени", "исключая", "исходя из", "к", "ко", "к числу", "касаемо",
	"касательно", "кончая", "кроме", "кругом", "между", "меж", "промеж", "промежду",
	"мимо", "минуя", "на", "на базе", "на благо", "на глазах у", "на грани", "на имя", "на манер", "на основании",
	"на основе", "на почве", "на правах", "на предмет", "на протяжении", "на пути", "на пути к", "на пути ко", "на путях",
	"на путях к", "на путях ко", "на радость", "на случай", "на смену", "на стороне", "на сторону", "на уровне", "на фоне",
	"наверху", "навстречу", "над", "надо", "назади", "накануне", "наперекор", "наперерез", "наперехват", "наподобие",
	"напротив", "наравне с", "наравне со", "наряду с", "наряду со", "насупротив", "насчет", "начиная", "начиная от",
	"начиная с", "начиная со", "не без", "не в пример", "не говоря о", "не говоря об", "не говоря обо", "не до", "не считая",
	"невдалеке от", "невзирая на", "недалеко", "недалеко от", "независимо", "независимо от", "неподалеку от", "несмотря на",
	"ниже", "о", "об", "обо", "около", "окрест", "от", "ото", "от имени", "от лица", "относительно", "памяти", "перед",
	"передо", "пред", "предо", "перед", "передо", "пред", "предо", "перед лицом", "плюс к", "плюс ко", "по", "по адресу",
	"по аналогии с", "по аналогии со", "по вине", "по истечении", "по линии", "по мере", "по направлению", "по направлению к",
	"по направлению ко", "по отношению к", "по отношению ко", "по поводу", "по праву", "по примеру", "по причине",
	"по прошествии", "по пути", "по случаю", "по сравнению с", "по сравнению со", "по стопам", "по части", "по-за",
	"по-над", "по-под", "поблизости", "поблизости от", "поверх", "погодя", "под", "подо", "под видом", "под знаком",
	"под предлогом", "под председательством", "под эгидой", "подле", "подобно", "позади", "позднее", "поздней", "позже",
	"помимо", "поодаль от", "поперед", "поперек", "порядка", "посереди", "посередине", "посередке", "посередь", "после",
	"посреди", "посредине", "посредством", "превыше", "прежде", "при", "при всей", "при всем", "при всех", "при помощи",
	"при посредстве", "при условии", "применительно к", "применительно ко", "про", "против", "противно", "путем", "ради",
	"раньше", "рядом с", "рядом со", "с", "со", "с ведома", "с помощью", "с учетом", "с целью", "сбоку", "сбоку от", "сверх",
	"сверху", "свыше", "сзади", "силами", "сквозь", "следом за", "смотря по", "снаружи", "снизу", "со стороны",
	"совместно с", "совместно со", "совокупно с", "согласно", "согласно с", "согласно со", "сообразно", "сообразно с",
	"сообразно со", "сообща с", "сообща со", "соответственно", "соответственно с", "соответственно со", "соразмерно",
	"соразмерно с", "соразмерно со", "спереди", "спустя", "сравнительно с", "сравнительно со", "среди", "средь", "сродни",
	"судя по", "супротив", "считая", "типа", "у", "ценой", "ценою", "через", "что до",
];

// Conjunctions (also covered by transition words
const coordinatingConjunctions = [ "и", "или", "и/или", "еще" ];

const subordinatingConjunctions = [ "если", "даже" ];

const interjections = [ "ох", "вау", "тю-тю", "ох-ох-ох", "эх", "фуф", "ага", "угу", "упс", "ой", "бее" ];

// These words and abbreviations are frequently used in recipes in lists of ingredients.
const recipeWords = [ "ст", "ч", "л", "кг", "полкило", "г", "гр", "мл", "дл", "пол-литра", "мг"];

const timeWords = [ "секунд", "секунда", "минут", "минута", "час", "часа", "часов", "день", "дня", "дней", "неделя", "недели", "недель",
	"месяц", "месяца", "месяцев", "год", "года", "лет", "сегодня", "завтра", "послезавтра", "вчера", "позавчера" ];

// 'People' should only be removed in combination with 'some', 'many' and 'few' (and is therefore not yet included in the list below).
const vagueNouns = [
	"вещь", "вещи", "вещью", "вещей", "вещам", "вещами", "вещах",
	"метод", "метода", "методом", "методу", "методе", "методы", "методам", "методами", "методах",
	"способ", "способа", "способом", "способу", "способе", "способы", "способам", "способами", "способах",
	"свойство", "свойства", "свойстве", "свойств", "свойствам", "свойствах", "свойствами",
	"случай", "случая", "случаем", "случаю", "случае", "случаи", "случаям", "случаями", "случаях",
	"дело", "дела", "делом", "делу", "деле", "делам", "делами", "делах",
	"сходство", "сходства", "сходстве", "сходств", "сходствам", "сходствах", "сходствами",
	"часть", "части", "частью", "частей", "частям", "частями", "частях",
	"штука", "штуки", "штуке", "штуку", "штук", "штукам", "штуками", "штуках",
	"раз", "раза", "разом", "разу", "разе", "разы", "разам", "разами", "разах",
	"процент", "процента", "процентом", "проценту", "проценте", "проценты", "процентам", "процентами", "процентах",
	"аспект", "аспекта", "аспектом", "аспекту", "аспекте", "аспекты", "аспектам", "аспектами", "аспектах",
	"пункт", "пункта", "пунктом", "пункту", "пункте", "пункты", "пунктам", "пунктами", "пунктах",
	"идея", "идеи", "идее", "идеей", "идеям", "идеями", "идеях",
	"тема", "темы", "теме", "темой", "темам", "темами", "темах",
	"человек", "человека", "человеком", "человеку", "человеке",
	"деталь", "детали", "деталью", "деталей", "деталям", "деталями", "деталях",
	"подробность", "подробности", "подробностью", "подробностей", "подробностям", "подробностями", "подробностях",
	"фактор", "фактора", "фактором", "фактору", "факторе", "факторы", "факторам", "факторами", "факторах",
	"разница", "разницы", "разнице", "разницу", "разницей",
	"различие", "различия", "различию", "различий", "различиям", "различиями", "различиях",
];

// 'No' is already included in the quantifier list.
const miscellaneous = [ "нет", "да", "конечно", "отлично", "верх", "низ", "ок", "окей", "аминь", "и т д", "и т. д.",
	"и так далее", "и тому подобное", "прости", "простите", "пожалуйста" ];

const titlesPreceding = [ "г-н", "г-жа", "тов", "гр-н", "гр-а", "гр", "проф" ];

// "ст" is already included in recipe words
const titlesFollowing = [ "мл" ];

module.exports = function() {
	return {
		// These word categories are filtered at the ending of word combinations.
		filteredAtEnding: [].concat( ordinalNumerals, generalAdjectivesAdverbs ),

		// These word categories are filtered at the beginning and ending of word combinations.
		filteredAtBeginningAndEnding: [].concat( prepositions, coordinatingConjunctions, demonstrativePronouns, intensifiers,
			quantifiers, possessivePronouns ),

		// These word categories are filtered everywhere within word combinations.
		filteredAnywhere: [].concat( transitionWords, adverbialGenitives, personalPronouns,
			reflexivePronouns, interjections, cardinalNumerals, filteredPassiveAuxiliaries, otherAuxiliaries, copula, interviewVerbs,
			delexicalizedVerbs, indefinitePronouns, subordinatingConjunctions, interrogativeDeterminers,
			interrogativePronouns, interrogativeProAdverbs, locativeAdverbs, miscellaneous, recipeWords, timeWords, vagueNouns ),

		// This export contains all of the above words.
		all: [].concat( cardinalNumerals, ordinalNumerals, demonstrativePronouns, possessivePronouns, reflexivePronouns,
			personalPronouns, quantifiers, indefinitePronouns, indefinitePronounsPossessive, interrogativeDeterminers,
			interrogativePronouns, interrogativeProAdverbs,
			locativeAdverbs, adverbialGenitives, filteredPassiveAuxiliaries,
			otherAuxiliaries, copula, prepositions, coordinatingConjunctions, subordinatingConjunctions, interviewVerbs,
			transitionWords, intensifiers, delexicalizedVerbs, interjections, generalAdjectivesAdverbs,
			recipeWords, vagueNouns, miscellaneous, titlesPreceding, titlesFollowing ),
	};
};
