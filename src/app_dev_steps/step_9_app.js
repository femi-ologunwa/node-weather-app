//core node modules
const path = require('path');

//third-party node modules
const express = require('express');
const hbs = require('hbs');

//LEARNING HOW TO CREATE HTTP JSON ENDPOINTS WITH EXPRESS SERVER
//================================================================
/* From this moment hence, we will be looking at how to allow users to fetch a forcast for a location from this weather website. Previously, we ran commands from the terminal to get the forecasts, now users should be able to pull up a url in the browser and fill in a form on a webpage to get the forecast. This provides a better interface for interacting with the node app. 
Most of the work here will be done in the - app.get('/weather', (req, res)=>{}). We will use the geocode and forecast functions in this route.
The browser sends the location/address to the route by the use of query string which is added to the end of a url preceeded by a question mark.
The query string will be in form of a key-value pairs - For example - 
	localhost:5000/products?search=games&rating=5 
From the above, 2 pieces of info were passed to the server - search=games; rating=5

 */

//generating a new instance of the server application
const app = express();

//==================== Configuring paths =======================

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setting up static directory to serve
app.use(express.static(publicDirectoryPath));

//============= Configuring the routes for the contents to be served =============

//setting the route that serves the homepage
app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Femi Samosquare',
	});
});

//setting the route that serves the about page
app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Femi Samosquare',
	});
});

//setting the route that serves the help page
app.get('/help', (req, res) => {
	res.render('help', {
		helpMsg:
			'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores temporibus vero dicta, itaque repellat aperiam!',
		title: 'Help',
		name: 'Femax Connect',
	});
});

//illustrating how to use a query string
app.get('/products', (req, res) => {
	console.log(req.query);
	console.log(req.query.search);

	//run the code below when there is no search term - make seach term required
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term',
		});
	}
	res.send({
		products: [],
	});
});

/*setting up the route that serves the weather data
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

*/

//Re-creating the weather JSON endpoint to accept address
/*1. No address? Send back an error msg.
2. Address? Send bac the static JSON - Add address property oto JSON which returns the provided address 
*/
app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address',
		});
	}
	res.send({
		forecast: 'It is snowing',
		location: 'Abuja',
		address: req.query.address,
	});
});

//setting the route that serves the 404 page

//help 404s
app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Femax Connect',
		errorMsg: 'Help Article not found ',
	});
});

//general/global 404
app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Femax Connect',
		errorMsg: 'Page not found',
	});
});

//============= Accessing Contents Served By Express Server =====================

//starting up the server at port 5000
app.listen(5000, () => {
	console.log('Server is up on port 5000...');
});
