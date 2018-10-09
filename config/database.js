const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'porjo',
    password: '47cromosomas',
    database:'proyecto_final',
    port: 3306
 });
 
 connection.connect(function(error){
    if(error)
       throw error;
    else
       console.log('Conexion correcta.');
 });

 module.exports = connection;