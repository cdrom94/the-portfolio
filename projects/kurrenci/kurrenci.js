const showLabel = (selection, field) => {
	document.querySelector(field).value !== ''
		? (document.querySelector(selection).style.visibility = 'visible')
		: (document.querySelector(selection).style.visibility = 'hidden');
};

const dropdownObj = obj => {
	for (let currency in obj) {
		let newOption = document.createElement('option');
		newOption.innerHTML = currency + ': ' + obj[currency].name;
		newOption.value = currency;
		document.querySelector('#currency').appendChild(newOption);
	}
};

let currencyObj = {
	AED: { name: 'UAE Dirham', region: 'United Arab Emirates' },
	AFN: { name: 'Afghan Afghani', region: 'Afghanistan' },
	ALL: { name: 'Albanian Lek', region: 'Albania' },
	AMD: { name: 'Armenian Dram', region: 'Armenia' },
	ANG: { name: 'Netherlands Antillian Guilder', region: 'Netherlands Antilles' },
	AOA: { name: 'Angolan Kwanza', region: 'Angola' },
	ARS: { name: 'Argentine Peso', region: 'Argentina' },
	AUD: { name: 'Australian Dollar', region: 'Australia' },
	AWG: { name: 'Aruban Florin', region: 'Aruba' },
	AZN: { name: 'Azerbaijani Manat', region: 'Azerbaijan' },
	BAM: { name: 'Bosnia and Herzegovina Mark', region: 'Bosnia and Herzegovina' },
	BBD: { name: 'Barbados Dollar', region: 'Barbados' },
	BDT: { name: 'Bangladeshi Taka', region: 'Bangladesh' },
	BGN: { name: 'Bulgarian Lev', region: 'Bulgaria' },
	BHD: { name: 'Bahraini Dinar', region: 'Bahrain' },
	BIF: { name: 'Burundian Franc', region: 'Burundi' },
	BMD: { name: 'Bermudian Dollar', region: 'Bermuda' },
	BND: { name: 'Brunei Dollar', region: 'Brunei' },
	BOB: { name: 'Bolivian Boliviano', region: 'Bolivia' },
	BRL: { name: 'Brazilian Real', region: 'Brazil' },
	BSD: { name: 'Bahamian Dollar', region: 'Bahamas' },
	BTN: { name: 'Bhutanese Ngultrum', region: 'Bhutan' },
	BWP: { name: 'Botswana Pula', region: 'Botswana' },
	BYN: { name: 'Belarusian Ruble', region: 'Belarus' },
	BZD: { name: 'Belize Dollar', region: 'Belize' },
	CAD: { name: 'Canadian Dollar', region: 'Canada' },
	CDF: { name: 'Congolese Franc', region: 'Democratic Republic of the Congo' },
	CHF: { name: 'Swiss Franc', region: 'Switzerland' },
	CLP: { name: 'Chilean Peso', region: 'Chile' },
	CNY: { name: 'Chinese Renminbi', region: 'China' },
	COP: { name: 'Colombian Peso', region: 'Colombia' },
	CRC: { name: 'Costa Rican Colon', region: 'Costa Rica' },
	CUC: { name: 'Cuban Convertible Peso', region: 'Cuba' },
	CUP: { name: 'Cuban Peso', region: 'Cuba' },
	CVE: { name: 'Cape Verdean Escudo', region: 'Cape Verde' },
	CZK: { name: 'Czech Koruna', region: 'Czech Republic' },
	DJF: { name: 'Djiboutian Franc', region: 'Djibouti' },
	DKK: { name: 'Danish Krone', region: 'Denmark' },
	DOP: { name: 'Dominican Peso', region: 'Dominican Republic' },
	DZD: { name: 'Algerian Dinar', region: 'Algeria' },
	EGP: { name: 'Egyptian Pound', region: 'Egypt' },
	ERN: { name: 'Eritrean Nakfa', region: 'Eritrea' },
	ETB: { name: 'Ethiopian Birr', region: 'Ethiopia' },
	EUR: { name: 'Euro', region: 'European Union' },
	FJD: { name: 'Fiji Dollar', region: 'Fiji' },
	FKP: { name: 'Falkland Islands Pound', region: 'Falkland Islands' },
	FOK: { name: 'Faroese Króna', region: 'Faroe Islands' },
	GBP: { name: 'Pound Sterling', region: 'United Kingdom' },
	GEL: { name: 'Georgian Lari', region: 'Georgia' },
	GGP: { name: 'Guernsey Pound', region: 'Guernsey' },
	GHS: { name: 'Ghanaian Cedi', region: 'Ghana' },
	GIP: { name: 'Gibraltar Pound', region: 'Gibraltar' },
	GMD: { name: 'Gambian Dalasi', region: 'The Gambia' },
	GNF: { name: 'Guinean Franc', region: 'Guinea' },
	GTQ: { name: 'Guatemalan Quetzal', region: 'Guatemala' },
	GYD: { name: 'Guyanese Dollar', region: 'Guyana' },
	HKD: { name: 'Hong Kong Dollar', region: 'Hong Kong' },
	HNL: { name: 'Honduran Lempira', region: 'Honduras' },
	HRK: { name: 'Croatian Kuna', region: 'Croatia' },
	HTG: { name: 'Haitian Gourde', region: 'Haiti' },
	HUF: { name: 'Hungarian Forint', region: 'Hungary' },
	IDR: { name: 'Indonesian Rupiah', region: 'Indonesia' },
	ILS: { name: 'Israeli New Shekel', region: 'Israel' },
	IMP: { name: 'Manx Pound', region: 'Isle of Man' },
	INR: { name: 'Indian Rupee', region: 'India' },
	IQD: { name: 'Iraqi Dinar', region: 'Iraq' },
	IRR: { name: 'Iranian Rial', region: 'Iran' },
	ISK: { name: 'Icelandic Króna', region: 'Iceland' },
	JEP: { name: 'Jersey Pound', regoin: 'Jersey' },
	JMD: { name: 'Jamaican Dollar', region: 'Jamaica' },
	JOD: { name: 'Jordanian Dinar', region: 'Jordan' },
	JPY: { name: 'Japanese Yen', region: 'Japan' },
	KES: { name: 'Kenyan Shilling', region: 'Kenya' },
	KGS: { name: 'Kyrgyzstani Som', region: 'Kyrgyzstan' },
	KHR: { name: 'Cambodian Riel', region: 'Cambodia' },
	KID: { name: 'Kiribati Dollar', region: 'Kiribati' },
	KMF: { name: 'Comorian Franc', region: 'Comoros' },
	KRW: { name: 'South Korean Won', region: 'South Korea' },
	KWD: { name: 'Kuwaiti Dinar', region: 'Kuwait' },
	KYD: { name: 'Cayman Islands Dollar', region: 'Cayman Islands' },
	KZT: { name: 'Kazakhstani Tenge', region: 'Kazakhstan' },
	LAK: { name: 'Lao Kip', region: 'Laos' },
	LBP: { name: 'Lebanese Pound', region: 'Lebanon' },
	LKR: { name: 'Sri Lanka Rupee', region: 'Sri Lanka' },
	LRD: { name: 'Liberian Dollar', region: 'Liberia' },
	LSL: { name: 'Lesotho Loti', region: 'Lesotho' },
	LYD: { name: 'Libyan Dinar', region: 'Libya' },
	MAD: { name: 'Moroccan Dirham', region: 'Morocco' },
	MDL: { name: 'Moldovan Leu', region: 'Moldova' },
	MGA: { name: 'Malagasy Ariary', region: 'Madagascar' },
	MKD: { name: 'Macedonian Denar', region: 'North Macedonia' },
	MMK: { name: 'Burmese Kyat', region: 'Myanmar' },
	MNT: { name: 'Mongolian Tögrög', region: 'Mongolia' },
	MOP: { name: 'Macanese Pataca', region: 'Macau' },
	MRU: { name: 'Mauritanian Ouguiya', region: 'Mauritania' },
	MUR: { name: 'Mauritian Rupee', region: 'Mauritius' },
	MVR: { name: 'Maldivian Rufiyaa', region: 'Maldives' },
	MWK: { name: 'Malawian Kwacha', region: 'Malawi' },
	MXN: { name: 'Mexican Peso', region: 'Mexico' },
	MYR: { name: 'Malaysian Ringgit', region: 'Malaysia' },
	MZN: { name: 'Mozambican Metical', region: 'Mozambique' },
	NAD: { name: 'Namibian Dollar', region: 'Namibia' },
	NGN: { name: 'Nigerian Naira', region: 'Nigeria' },
	NIO: { name: 'Nicaraguan Córdoba', region: 'Nicaragua' },
	NOK: { name: 'Norwegian Krone', region: 'Norway' },
	NPR: { name: 'Nepalese Rupee', region: 'Nepal' },
	NZD: { name: 'New Zealand Dollar', region: 'New Zealand' },
	OMR: { name: 'Omani Rial', region: 'Oman' },
	PAB: { name: 'Panamanian Balboa', region: 'Panama' },
	PEN: { name: 'Peruvian Sol', region: 'Peru' },
	PGK: { name: 'Papua New Guinean Kina', region: 'Papua New Guinea' },
	PHP: { name: 'Philippine Peso', region: 'Philippines' },
	PKR: { name: 'Pakistani Rupee', region: 'Pakistan' },
	PLN: { name: 'Polish Złoty', region: 'Poland' },
	PYG: { name: 'Paraguayan Guaraní', region: 'Paraguay' },
	QAR: { name: 'Qatari Riyal', region: 'Qatar' },
	RON: { name: 'Romanian Leu', region: 'Romania' },
	RSD: { name: 'Serbian Dinar', region: 'Serbia' },
	RUB: { name: 'Russian Ruble', region: 'Russia' },
	RWF: { name: 'Rwandan Franc', region: 'Rwanda' },
	SAR: { name: 'Saudi Riyal', region: 'Saudi Arabia' },
	SBD: { name: 'Solomon Islands Dollar', region: 'Solomon Islands' },
	SCR: { name: 'Seychellois Rupee', region: 'Seychelles' },
	SDG: { name: 'Sudanese Pound', region: 'Sudan' },
	SEK: { name: 'Swedish Krona', region: 'Sweden' },
	SGD: { name: 'Singapore Dollar', region: 'Singapore' },
	SHP: { name: 'Saint Helena Pound', region: 'Saint Helena' },
	SLE: { name: 'Sierra Leonean Leone', region: 'Sierra Leone' },
	SLL: { name: 'Sierra Leonean Leone', region: 'Sierra Leone' },
	SOS: { name: 'Somali Shilling', region: 'Somalia' },
	SRD: { name: 'Surinamese Dollar', region: 'Suriname' },
	SSP: { name: 'South Sudanese Pound', region: 'South Sudan' },
	STN: { name: 'São Tomé and Príncipe Dobra', region: 'São Tomé and Príncipe' },
	SYP: { name: 'Syrian Pound', region: 'Syria' },
	SZL: { name: 'Eswatini Lilangeni', region: 'Eswatini' },
	THB: { name: 'Thai Baht', region: 'Thailand' },
	TJS: { name: 'Tajikistani Somoni', region: 'Tajikistan' },
	TMT: { name: 'Turkmenistan Manat', region: 'Turkmenistan' },
	TND: { name: 'Tunisian Dinar', region: 'Tunisia' },
	TOP: { name: 'Tongan Paʻanga', region: 'Tonga' },
	TRY: { name: 'Turkish Lira', region: 'Türkiye' },
	TTD: { name: 'Trinidad and Tobago Dollar', region: 'Trinidad and Tobago' },
	TVD: { name: 'Tuvaluan Dollar', region: 'Tuvalu' },
	TWD: { name: 'New Taiwan Dollar', region: 'Taiwan' },
	TZS: { name: 'Tanzanian Shilling', region: 'Tanzania' },
	UAH: { name: 'Ukrainian Hryvnia', region: 'Ukraine' },
	UGX: { name: 'Ugandan Shilling', region: 'Uganda' },
	USD: { name: 'United States Dollar', region: 'United States' },
	UYU: { name: 'Uruguayan Peso', region: 'Uruguay' },
	UZS: { name: "Uzbekistani So'm", region: 'Uzbekistan' },
	VES: { name: 'Venezuelan Bolívar Soberano', region: 'Venezuela' },
	VND: { name: 'Vietnamese Đồng', region: 'Vietnam' },
	VUV: { name: 'Vanuatu Vatu', region: 'Vanuatu' },
	WST: { name: 'Samoan Tālā', region: 'Samoa' },
	XAF: { name: 'Central African CFA Franc', region: 'CEMAC' },
	XCD: { name: 'East Caribbean Dollar', region: 'Organisation of Eastern Caribbean States' },
	XDR: { name: 'Special Drawing Rights', region: 'International Monetary Fund' },
	XOF: { name: 'West African CFA franc', region: 'CFA' },
	XPF: { name: 'CFP Franc', region: "Collectivités d'Outre-Mer" },
	YER: { name: 'Yemeni Rial', region: 'Yemen' },
	ZAR: { name: 'South African Rand', region: 'South Africa' },
	ZMW: { name: 'Zambian Kwacha', region: 'Zambia' },
	ZWL: { name: 'Zimbabwean Dollar', region: 'Zimbabwe' },
};

dropdownObj(currencyObj);

async function conversion() {
	document.querySelector('#loader').style.display = 'block';
	let amount = document.querySelector('#amount').value;
	let currency = document.querySelector('#currency').value;

	await fetch(`/.netlify/functions/token-hider?currency=${currency}`)
		.then(response => {
			return response.json();
		})
		.then(data => {
			if (data.result === 'success') return updateDOM(amount, data);
			throw new Error();
		})
		.catch(() => {
			document.querySelector('#results').innerHTML = 'Sorry. There was an error, please try again later.';
			document.querySelector('#loader').style.display = 'none';
		});
}

const updateDOM = (amount, data) => {
	let lastUpdate = new Date(data.time_last_update_unix * 1000);
	let options = { hour: 'numeric', minute: '2-digit', day: '2-digit', month: 'long', year: 'numeric', timeZoneName: 'short' };
	let conversions = data.conversion_rates;

	document.querySelector('#results').innerHTML = '';
	document.querySelector('#results').style.backgroundColor = 'rgba(255, 255, 255, 0.521)';
	document.querySelector('#update-date').innerHTML = 'As of ' + lastUpdate.toLocaleDateString('en-US', options);

	for (let conv in conversions) {
		let newConversion = document.createElement('div');
		let newCurrency = document.createElement('p');
		let newExchange = document.createElement('p');
		let currencyOptions = { style: 'currency', currency: conv, currencyDisplay: 'symbol' };
		let conversion;

		if (conv === 'DKK' || conv === 'NOK' || conv === 'SEK') {
			conversion = (conversions[conv] * amount).toFixed(2) + ' kr';
		} else {
			conversion = new Intl.NumberFormat('en-US', currencyOptions).format(conversions[conv] * amount);
		}

		newCurrency.innerHTML = currencyObj[conv].name + ' (' + conv + ')';
		newExchange.innerHTML = conversion;
		newConversion.id = conv;
		newConversion.className = 'currency-conversion';
		newCurrency.className = 'currency-symbol';
		newExchange.className = 'currency-exchange';
		newConversion.appendChild(newCurrency);
		newConversion.appendChild(newExchange);
		document.querySelector('#results').appendChild(newConversion);
		document.querySelector('#filter').style.display = 'block';
	}
	document.querySelector('#loader').style.display = 'none';
};

const filterResults = () => {
	let filter = document.querySelector('#filter').value.toLowerCase();
	let symbols = document.querySelectorAll('.currency-conversion');

	for (i = 0; i < symbols.length; i++) {
		if (document.querySelectorAll('.currency-symbol')[i].textContent.toLowerCase().indexOf(filter) > -1) {
			symbols[i].style.display = '';
		} else {
			symbols[i].style.display = 'none';
		}
	}
};
