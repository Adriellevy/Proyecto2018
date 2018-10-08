
const mysql = require('mysql');
const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);


var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'Nimba19092001',
   database: 'node_mysql',
   database:'proyecto_final',
   port: 3306
});
connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});
// para probar si funciona la coneccion con la BD
var query = connection.query('SELECT * FROM `users`', function(error, result){
  if(error){
     throw error;
  }else{
     console.log(result);
  }
}
);


function AgregarUsuariosFuncion(){
  
  var id =  $("DniUsuario").val();
  id = 4;

  var Nombre = $("NombreUsuario").val();
  nombre = "adri";
  
  var contraseña = $("Contraseña").val();
  contraseña = "adri";
  var cantidad;

  var query = connection.query("SELECT * FROM `users` WHERE DNI ='" + id + "'" ,function(error,result){
    if(error){
      throw error;
   }else{
      cantidad = result;
      if(cantidad > 0){
        console.log("Ya exsiste el usuario");
      } else {
        if(id === ""){
          alert("completar campo faltante");
          console.log("No se agrego el usuario");
        }else if (Nombre === "" ){
          alert("completar campo faltante");
          console.log("No se agrego el usuario");
        }else if (contraseña === ""){
          alert("completar campo faltante");
          console.log("No se agrego el usuario");
        }else{
          {
            connection.query(`INSERT INTO \``+ "users" +`\` (\``+ "DNI" +`\`, \`` + "username" +`\`, \``+"password"+`\`, \``+"role"+`\` ) VALUES ('`+Nombre+`', '`+id+`','`+contraseña+`','Teacher')`, function (error, results, fields) {
             console.log("se a guardado el usuario");
           })     
          }
        }
       }
      }
    }
   );
   }
 

function inicioSesion(){
  var query = connection.query('/*pedir poryecto adri*/', function(error,result){
  if(error){
    throw error;
 }else{
    console.log(result);
 }
}
);
}

AgregarUsuariosFuncion();

$("#submit").onclick = function(){AgregarUsuariosFuncion(get)};







/*
PARTE DE PORJO
var http = require('http');
var express = require('express');
var port = 8080;
var app = express();
var server = http.createServer(app);

app.set('port', port);
app.use(express.static(__dirname + '/public'));
server.listen(port);
console.log('Server on port '+port+'...');

app.get('/login', function (req, res) {
	res.sendFile(__dirname + '/views/inicioSesion.html');
});
*/

/* 
PARTE DE ADRI

PREGUTAR A ANDY ESTO
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// settings
app.set('port', process.env.PORT || 3000);
console.log(process.env.PORT);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../public'));
// middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../static')))
*/
/*
function SelecciónTotal(){
app.get('/mysql', function (req, res) {
  var sql = 'SELECT * FROM `users`'

  if (req.query.id) {
    sql = sql + ` WHERE \`id\`= ${req.query.id} LIMIT 1`
  }

  connection.query(sql, function (error, results, fields) {
    if (!error) {
      res.send(results)
    } else {
      console.error(error)
      res.status(500).send(error)
    }
  })
})
}

function agregar(tabla,columna1,columna2,columna3,columna4,columna5,columna6){
app.post('/mysql', function (req, res) {
  if (req.body.name && req.body.age) {
    connection.query(`INSERT INTO \``+tabla+`\` (\``+columna1+`\`, \``+columna2+`\`) VALUES ('${req.body.name}', '${req.body.age}')`, function (error, results, fields) {
      if (!error) {
        res.status(201).send(results)
      } else {
        console.error(error)
        res.status(500).send(error)
      }
    })
  } else {
    res.status(403).send({error: 'You must specify the name and age values.'})
  }
})
}
function actualizarSiertaParte(){
app.put('/mysql/:id', function (req, res) {
  if (req.body.name || req.body.age) {
    var sql = 'UPDATE `users` SET'
    if (req.body.name) {
      sql = sql + ` \`name\`="${req.body.name}"`
      if (req.body.age) {
        sql = sql + ','
      }
    }
    if (req.body.age) {
      sql = sql + ` \`age\`=${req.body.age}`
    }
    sql = sql + ` WHERE \`id\`=${req.params.id}`

    connection.query(sql, function (error, results, fields) {
      if (!error) {
        res.status(200).send(results)
      } else {
        console.error(error)
        res.status(500).send(error)
      }
    })
  } else {
    res.status(403).send({error: 'You must specify the name or age values.'})
  }
})
}

app.listen(3000, () => console.log('Example app listening on port 3000!'))



function AgregarUsuariosFuncion(){

}

function InicioSecionFuncion(){

}

function SeleccionDias(){

}

function SolisitudesProfeFuncion(){ 
  
}

function VentanaAdmin(){

}


connection.end();

*/
