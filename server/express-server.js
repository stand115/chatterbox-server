// launch http://127.0.0.1:8000/ in the browser to view client (after running npm start/nodemon express-server.js)
//import requirements
var http = require('http');
var requests = require('./request-handler');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var ip = '127.0.0.1';
var port = 8000;
var responseObject;

//dummy data to get us started
fs.readFile(process.cwd() + '/server/data/messages.json', 'utf-8', function(err, data) {
  if (err) {
    throw err;
  }
  responseObject = JSON.parse(data);
});


//helper ID function to generate a random object ID
var id = function () {
  return '_' + Math.random().toString(36).substr(2, 10);
};


//create our express server
var app = express();

// middleware for body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// set static resources path
app.use(express.static(path.join(__dirname, 'client')));


//handle OPTIONS requests
app.options('/*', function(request, response, next) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  response.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  response.send(200);
});


//handle GET requests
app.get('/classes/messages', function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  response.send(responseObject);
});


//handle POST requests
app.post('/classes/messages', function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  let body = request.body;
  body.createdAt = new Date();
  body.objectId = id();
  responseObject.results.push(body);

  //write data to persisting file
  fs.writeFile(process.cwd() + '/server/data/messages.json', JSON.stringify(responseObject), 'utf-8', function(err) {
    if (err) {
      throw err;
    }
    console.log('Done!');    
  });

  response.send(JSON.stringify(responseObject));
  response.end();
});



// turn it on
app.listen(port, ip);
console.log('Listening on http://' + ip + ':' + port);

