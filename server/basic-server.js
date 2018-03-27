/* Import node's http module: */
var http = require('http');
var port = 3000;

var ip = '127.0.0.1';

var server = http.createServer(requests.requestHandler).listen(port, ip);
console.log('Listening on http://' + ip + ':' + port);






