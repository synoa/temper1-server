'use strict';


/*
 *
 * Imports
 * 
 */
var temperServer = require('./server.js'),
    restify = require('restify')
;



// Connect to sensor and save the value
temperServer.connect();





// Send output to some requests
function respond(req, res, next) {
  var result = {
    temperature : temperServer.temperature
  };

  var json = JSON.stringify(result); 

  res.writeHead(200, { 
    'Content-Type': 'application/json', 
    'Content-Encoding': 'UTF-8', 
    'Content-Length': Buffer.byteLength(json,'utf-8')
  });

  res.write(json);
  res.end();
}





// Create the server
var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);


var port = 8080;

server.listen(port, function() {
  console.log('%s listening at %s', server.name, server.url);
});