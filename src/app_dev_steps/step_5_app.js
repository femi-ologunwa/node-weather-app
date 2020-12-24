//core node modules
const path = require('path');

//third-party node modules
const express = require('express');

//HOW TO USE TEMPLATE ENGINES TO RENDER DYNAMIC WEB PAGES USING EXPRESS
//====================================================================
/*The template engine to be used to achieve this is called handlebars. It allows us to  do 2 main things:
   - To render dynamic documents
   - To create codes that we can reuse across pages such as header, footer etc
we will install it and load it in our application - npm install hbs

Then we tell express which templating engine we are using  with the code - app.set().
Express naturally looks for a 'views' directory in the root of the project(web-server)for all the views (the handlebars template in this case). You will create this directory to put all the handlebars template in it.  

We create a template for the homepage ad call it index.hbs. Since we now use this to serve the hmepage, we will delete the index.html page. (We do the same for about page and help page)

To serve this template in the server, we will setup routes with app.get as done below.
*/
console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

//tell express which template engine to use
app.set('view engine', 'hbs');

//setting routes with handlebars as template with res.render() and not res.send(). The render method takes 2 args - the template view to be used; content to be rendered which is in form of an object
app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Femi Samosquare',
	});
});
//We can then use the title and name variables in the index.hbs template. They are the dynamic content in this case

//serving the about page
app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'Femi Samosquare',
	});
});

//serving the help page
app.get('/help', (req, res) => {
	res.render('help', {
		helpMsg:
			'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores temporibus vero dicta, itaque repellat aperiam!',
	});
});

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

//starting up the server at port 4000
app.listen(4000, () => {
	console.log('Server is up on port 4000...');
});
