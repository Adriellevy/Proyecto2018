var http = require('http');
var express = require('express');
var port = 8080;
var app = express();
var server = http.createServer(app);

app.set('port', port);
server.listen(port);
console.log('Server on port '+port+'...');

app.get('/login', function (req, res) {
	res.sendFile(__dirname + '/views/inicioSesion.html');
});