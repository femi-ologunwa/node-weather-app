//core node modules
const path = require('path');

//third-party node modules
const express = require('express');
const hbs = require('hbs');

//CREATING PARTIALS WITH HANDLEBARS
//==================================
/*Partials is about creating small templates that are part of a webpage. Parts of a webpage that we may reuse across other webpages in the website, such as headers, footers, sidebars, navigation etc can be made into partials and reused. To use partials, we load in hbs into the script and configure it. We will create a partials directory in the templates directory to contain all the partals. 
Nodemon restarts automtically only when the js files change. We will configure it to  restarts when our hbs files also change. This is done by adding an e(extensions) flag followed by a list of file extensions that nodemon will also watch. This is illustrated below 
		- nodemon src/app.js -e js,hbs
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

//============= Accessing Contents Served By Express Server =====================

//starting up the server at port 5000
app.listen(5000, () => {
	console.log('Server is up on port 5000...');
});
