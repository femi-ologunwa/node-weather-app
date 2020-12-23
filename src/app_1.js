const express = require('express');
/*
All the apps created so far can only be accessible via the command line. This is not realistic for users most of whom want to access and interact with our apps through the browser. One of the npm libraries to achieve this is express. Express makes it easy to create web servers with node js.  This server alows us to serve all assets of our app in the form of a website which contains - html documents to render to the screen, css to style the app, client-side javascript to setup any kind of user interaction, images etc.  
The server could also be made to serve an http json-based api ( as used by some api sites where we get data from with say a fetch request) rather than a website.
We will explore both approaches
Now
-create a folder called web-server
-initialize npm in the folder - npm init
- install express version 4.16.4 - npm i express@4.16.4 
*/

//IN THIS FILE, WE WILL LOAD EXPRESS, CONFIGURE IT TO SERVE SOMETHING AND THEN START THE SERVER
//==================================================================================

const app = express();

/*Let us assume we have the domain app.com (root route), with 2 more routes
   - app.com/help
   - app.com/about

 app.get() lets us configure what the server should do when someone tries to get the resource at a specific route/url - whether to send back html or json. This method takes 2 args:
   - the route 
   - a function where we describe what we want to do when someone visits the route.

 The function takes 2 args:
   - object containing info about the incoming request to the server. This is commonly called req(for request)
   - response - This contains a bunch of methods that allow us to customize what we would send back to the requester. This is commonly called res(for response)
 */

app.get('', (req, res) => {
	// A very basic text response to the root route; to be displayed in the browser

	//res.send() allows us to send something back to the requester
	res.send('Hello Express...');
});

app.get('/help', (req, res) => {
	res.send('Help page');
});

//starting up the server to listen to a specific port - 4000; also a cllback fuction is provided which executes when the server is up and runing.
app.listen(4000, () => {
	console.log('Server is up on port 4000...');
});

//in the termial - node src/app.js <enter>.
//It will stay up and running. To stop it - Ctrl+C

//To access the server in the browser on our machine - localhost:4000

//For any saved changes made on this page, the sever must be restarted to effect the changes

//To avoid restarting the server every time we make change to the code, start runing the server with the command - nodemon src/app.js
