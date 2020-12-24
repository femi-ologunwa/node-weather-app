//core node modules
const path = require('path');

//third-party node modules
const express = require('express');
const hbs = require('hbs');

//self-made node modules
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//WIRING UP THE CREATED WEATHER HTTP JSON ENDPOINTS TO
// USE THE GEOCODE AND FORECAST FUNCTIONS
//==================================================
/* Here we will conect the already created geocode and forecast functions with the weather JSON endpoint created in the last episode. 
To do this we will move/copy the utils folder (which contains both the geocode and forecast functions needed here) from the weather-app project to the src folder of the web-server project
Since the forecast and geocode functions made use of an npm package called request, we will have to install this package into our webserver project.
We can now use geocode and forecast in the callbacks of the weather JSON endpoint
We will:
	- require geocode/forecast into app.js
	- use the entered address to geocode
	- use the coordinates to get forecase
	- send back the real forecast and location
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

//illustrating how to use a query string with a product example
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

//The weather JSON endpoint (based on the illustrated products endpoint above)
app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address',
		});
	}

	//{longitude, latitude, location}={} => this implies setting a default object value to avoid an undefined scenario in the destructuring process. This prevents the code from breaking
	geocode(
		req.query.address,
		(error, { longitude, latitude, location } = {}) => {
			if (error) {
				return res.send({ error });
			}

			forecast(longitude, latitude, (error, forecastData) => {
				if (error) {
					return res.send({ error });
				}

				res.send({
					forecast: forecastData,
					location: location,
					address: req.query.address,
				});
			});
		}
	);
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
