//core node modules
const path = require('path');

//third-party node modules
const express = require('express');

//CUSTOMIZING THE LOCATION AND NAME OF THE DEFAULT VIEWS DIRECTORY
//================================================================
//You can change the default dircetory(views) the server looks at for handlebars template. We will first change the name of the folder from 'views' to 'templates'. We then define the path to this folder and configure express to look into this folder for the templates to render contents.

//generating a new instance of the server application
const app = express();

//==================== Configuring paths =======================

//telling express which template engine to use to render the contents
app.set('view engine', 'hbs');

//define and configure the folder for templates(views) in express
const viewsPath = path.join(__dirname, '../templates');
app.set('views', viewsPath);

//define and configure the folder for the static contents to be rendered
const publicDirectoryPath = path.join(__dirname, '../public');
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

//starting up the server at port 4000
app.listen(4000, () => {
	console.log('Server is up on port 4000...');
});
