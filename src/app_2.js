const express = require('express');

const app = express();

//the homepage/root route
app.get('', (req, res) => {
	res.send('Hello Express...');
});

//the help page/route
app.get('/help', (req, res) => {
	res.send('Help...');
});

//the about page/route
app.get('/about', (req, res) => {
	res.send('About...');
});

//the weather info page/route
app.get('/weather', (req, res) => {
	res.send('Weather Info...');
});

//starting up the server at port 4000
app.listen(4000, () => {
	console.log('Server is up on port 4000...');
});
