//core node modules
const path = require('path');

//third-party node modules
const express = require('express');
const hbs = require('hbs');

//self-made node modules
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//MODIFYING APP JS TO ACCOMODATE DEPLOYMENT FOR HEROKU
//====================================================

//generating a new instance of the server application
const app = express();

const port = process.env.PORT || 5000;

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
app.listen(port, () => {
	console.log('Server is up on port ' + port + '...');
});
