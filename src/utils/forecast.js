const request = require('request');

const forecast = (lat, long, callback) => {
	const url =
		'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' +
		lat +
		',' +
		long;

	request({ url: url, json: true }, (error, response) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (response.body.error) {
			callback('Unable to find location!', undefined);
		} else {
			callback(
				undefined,
				'It is currently ' +
					response.body.currently.temperature +
					' degrees out. There is a ' +
					response.body.currently.precipProbability +
					' chance of rain.'
			);
		}
	});
};

module.exports = forecast;
