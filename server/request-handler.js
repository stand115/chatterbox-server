var fs = require('fs');
var path = require('path');

var responseObject = {
  results: [{objectId: 'Jbv7momBDt', username: 'Jono', roomname: 'lobby', text: 'Do my bidding!', createdAt: '2018-03-17T23:52:01.595Z', updatedAt: '2018-03-17T23:52:01.595Z'}]
};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var requestHandler = function(request, response) {

  fs.readFile(process.cwd() + '/server/client/index.html', 'utf8', function(err, data) {

    if (err) {
      response.statusCode = 500;
      console.log(err);
      response.end();
      
    } else {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(data);
    }
  });

  //response.end(JSON.stringify(responseObject));
  var id = function () {
    return '_' + Math.random().toString(36).substr(2, 10);
  };

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  if (!(request.url.startsWith('/classes/messages'))) {
    statusCode = 404;
  }

  // handle GET requests
  if (request.method === 'GET' && request.url.startsWith('/classes/messages')) {
    var statusCode = 200;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = 'text/plain';
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(responseObject));
  }
  


  //catch OPTIONS requests
  if (request.method === 'OPTIONS') {
    console.log('!OPTIONS');
    var headers = {};
    // IE8 does not allow domains to be specified, just the *
    // headers["Access-Control-Allow-Origin"] = req.headers.origin;
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
    headers['Access-Control-Allow-Credentials'] = false;
    headers['Access-Control-Max-Age'] = '86400'; // 24 hours
    headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';
    response.writeHead(200, headers);
    response.end();
  }


  //catch POST requests
  if (request.method === 'POST') {
    statusCode = 201;
    let body = [];
    request.on('data', function(chunk) {
      body.push(chunk);
    }).on('end', function() {
      body = Buffer.concat(body).toString();
      body = JSON.parse(body);
      body.createdAt = new Date();
      body.objectId = id();
      var headers = defaultCorsHeaders;
      headers['Content-Type'] = 'text/plain';
      response.writeHead(statusCode, headers);
      responseObject.results.push(body);
      response.end(JSON.stringify(responseObject));
    });
  } 
};

module.exports.requestHandler = requestHandler;
module.exports.defaultCorsHeaders = defaultCorsHeaders;

