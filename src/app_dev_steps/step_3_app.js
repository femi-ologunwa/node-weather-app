const express = require('express');

//HHOW TO:
//1. SEND HTML TO BE RENDERED IN THE BROWSER
//2. SEND JSON DESIGNED TO BE CONSUMED AND USED BY CODE
//=============================================================

const app = express();

//the homepage/root route
app.get('', (req, res) => {
	res.send('<h1>Weather</h1>');
});

//the help page/route
app.get('/help', (req, res) => {
	res.send('<h1>Help...</h1>');
});

//the about page/route
app.get('/about', (req, res) => {
	res.send('<h1>About</h1>');
});

//sending json data
//the weather info page/route
app.get('/weather', (req, res) => {
	res.send({
		temp: 27,
		minTemp: 24,
		maxTemp: 30,
		city: 'Abuja',
		country: 'Nigeria',
		forecast: 'It is snowing',
	});
});

/*sending json data - an array of objects
app.get('/datalist', (req, res) => {
	res.send([
		{
			name: 'Femi',
			surname: 'Ologunwa',
			age: 22,
			country: 'Nigeria',
			state: 'Ondo',
			lga: 'Akoko-South-West',
		},

		{
			name: 'Sola',
			surname: 'Adelaja',
			age: 24,
			country: 'Nigeria',
			state: 'Ogun',
			lga: 'Abeokuta',
		},

		{
			name: 'Princess',
			surname: 'Ehibor',
			age: 20,
			country: 'Nigeria',
			state: 'Edo',
			lga: 'Benin',
		},
	]);
});

*/

//starting up the server at port 4000
app.listen(4000, () => {
	console.log('Server is up on port 4000...');
});
