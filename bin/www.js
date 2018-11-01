var app = require('../app');
var http = require('http');
var port = 8080;
var server = http.createServer(app);

app.set('port', port);

server.listen(port);
console.log('Server on port '+port+'...');