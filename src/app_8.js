//core node modules
const path = require('path');

//third-party node modules
const express = require('express');
const hbs = require('hbs');

//SETTING UP 404 PAGE FOR THE EXPRESS SERVER
//==========================================
/* WHen things go well, we show the user the contents they were looking for, but if a user provides a url that is non-existent on the website routes, we will show the user a 404 page. That is it is a page that shows up for routes that we don't have support for.
We do this by setting up another route handler with app.get(). The string provided as the first arg in app.get() is made to match everything else outside the routes listed up above. It is done with a wild card (asterik *). This special route means everything is a match so it has to be the last route set up within the code so that express would have searched through all the routes provided. 
We then create 404.hbs template
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

//setting up the route that serves the weather data
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

//setting the route that serves the 404 page - the string provided as the first arg in app.get() is made to match everything else outside the routes listed up above. It is done with a wild card (asterik *)

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
