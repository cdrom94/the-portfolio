const axios = require('axios');

exports.handler = (event, context, callback) => {
	const { currency } = event.queryStringParameters;
	const { API_URL, API_TOKEN } = process.env;
	const URL = `${API_URL}/${API_TOKEN}/latest/${currency}`;

	const pass = body => {
		callback(null, {
			statusCode: 200,
			body: JSON.stringify(body),
		});
	};

	const get = () => {
		axios
			.get(URL)
			.then(response => pass(response.data))
			.catch(err => console.log(err));
	};

	if (event.httpMethod == 'GET') get();
};
