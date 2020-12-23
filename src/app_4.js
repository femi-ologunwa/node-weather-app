//core node modules
const path = require('path');

//third-party node modules
const express = require('express');

//SERVING THE STATIC ASSETS OF AN ENTIRE DIRECTORY
//=============================================================
//We will configure express to serve-up an entire directory of assets that contains html files, css files, client-side javascript files, images, videos etc.

//We will create the folder in the web-server directory and call it 'public'. Anything in this directory will be served by the express server. Let us add a file called index.html to this directory. It will be served-up by default(based on the name) as the root route of the website.

//To make express serve the content of the public directory, we need the absolute path to the public folder from the root of the machine. This can be achived with 2 variables provided by node. These are '__dirname' and '__fileame'. The two are illustrated below

console.log(__dirname); //This is the abs path of the directory the current working script is - C:\Users\FEMI\Desktop\Andrew Node Course\web-server\src
console.log(__filename); //This is the abs path of the current script(app.js) - C:\Users\FEMI\Desktop\Andrew Node Course\web-server\src\app.js

//we can use the __dirname variable to get the abs path to the public directory through some path maniplation. A good way to this path manipulations is to use a core node module called 'path'. We will require this core module at the top of this script

console.log(__dirname); // - C:\Users\FEMI\Desktop\Andrew Node Course\web-server\src
console.log(path.join(__dirname, '..')); // going up one directory - C:\Users\FEMI\Desktop\Andrew Node Course\web-server
console.log(path.join(__dirname, '../..')); // going up two directories - C:\Users\FEMI\Desktop\Andrew Node Course
console.log(path.join(__dirname, '../public')); // going up one directory and into the public directory - C:\Users\FEMI\Desktop\Andrew Node Course\web-server\public

const publicDirectoryPath = path.join(__dirname, '../public');

const app = express();

//we can now configure express to serve the public directory path above as the root of the website. This is done with app.use() as done below(more explaations o this later). localhose:4000 now loads index.html,
app.use(express.static(publicDirectoryPath));

/*
   Exercise
   Goal: Create 2 more html files
      1. Create an html page for about in the public folder with "About" content
      2. Create an html page for help in the public folder with "Help" content
      3. Remove the old route handlers for both
*/

//localhost:4000/about.html loads the about page; localhost:4000/help.html loads the help page;

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
