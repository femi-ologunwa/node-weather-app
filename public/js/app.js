console.log('Client side javascript file is loaded...');

/*
How to make http request for weather data from client-side javascript in the browser.
====================================================================================
This will be done by creatig a form i index.html, submitting the form, fetching the data through this js file that is attached to the index.html file (by script tag) and render on-the-fly the page to show the weather info. 
We will use Fetch API to make our http request from the client-side javascript. Fetch is not part of javascript. It is a browser based api and not accessible in node.js. Therefore the code here will not work in node.js
*/

/*Illustrating fetch api

//fetch data from the given url and 'then' run the callback function that parse the response, 'then' run the callback when the json data has arrived and has been parsed
fetch('http://puzzle.mead.io/puzzle').then((response) => {
	response.json().then((data) => {
		console.log(data);
	});
});

//We will illustrate how the api that we created in web-server for fetching data works by fetching forecast info from it from the client side; just like fetching data from other api
fetch('http://localhost:5000/weather?address=Lagos').then((response) => {
	response.json().then((data) => {
		if (data.error) {
			console.log(data.error);
		} else {
			console.log(data.location);
			console.log(data.forecast);
		}
	});
});

*/

//processing the form submission
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#msgOne');
const msgTwo = document.querySelector('#msgTwo');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	//console.log('form submitted');
	const location = search.value;
	//console.log(location);

	msgOne.textContent = 'Loading...';
	msgTwo.textContent = '';

	//passing the location to our created api on the localhost or herokuapp url
	fetch('weather?address=' + location).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				//console.log(data.error);
				msgOne.textContent = data.error;
			} else {
				//console.log(data.location);
				//console.log(data.forecast);
				msgOne.textContent = data.location;
				msgTwo.textContent = data.forecast;
			}
		});
	});
});
