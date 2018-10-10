var express = require('express');
var router = express.Router();
var connection = require('../config/database');
var path = require('path');
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

router.get('/login', function (req, res) {
    //res.sendFile(__dirname + '../views/inicioSesion.html');
    //res.render('inicioSesion');
    res.sendFile(path.join(__dirname, '../views/inicioSesion.html'));
});

router.post('/login', function (req, res){
  console.log('post');
  var dni = req.body.dni;
  var password = req.body.password;
  console.log(dni);
  console.log(password);
  //res.redirect('/seleccion-dias');
  ValidarUsuario(dni, password, res);
});

router.get('/seleccion-dias', function(req, res){
    res.sendFile(path.join(__dirname, '../views/seleccionDias.html'));
});

router.get('/solicitudes', function(req, res){
    res.sendFile(path.join(__dirname, '../views/solicitudes.html'));
    var query = connection.query(" SELECT * FROM `schedule` WHERE = '" +  /*algo*/ + "'" ,function(error,result){
        if(error){
        throw error;
    }else{
        console.log(result);
    }
});
})

router.get('/agregarUsuarios', function (req, res){
    res.sendFile(path.join(__dirname, '../views/agregarUsuarios.html'));
});

router.post('/agregarUsuarios', function (req, res) {
    console.log("info recibida del posteo");
    var id = req.body.DniUsuario; 
    var Nombre = req.body.NombreUsuario;
    var apellido = req.body.ApellidoUsuario;
    var contraseña = req.body.ContraseñaUsuario;
    console.log("datos guardados");
    if ( 1===1 /*Nombre != "" && apellido != "" && id !="" && contraseña != ""*/) { 
        console.log("info recibida del posteo y se agrego el usuario")
    var query = connection.query(" SELECT * FROM `users` WHERE DNI ='" + id + "'" ,function(error,result){
        if(error){
        throw error;
    }else{
        cantidad = result;
        if(cantidad >= 1){
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
                // agregar apellido 
                connection.query(`INSERT INTO \``+ "users" +`\` (\``+ "DNI" +`\`, \`` + "username" +`\`, \``+"password"+`\`, \``+"role"+`\` ) VALUES ('`+Nombre+`', '`+id+`','`+contraseña+`','Teacher')`, function (error, results, fields) {
                console.log("se a guardado el usuario");
            })     
            }
            }
        }
        }
        }
    )
    } else {
    res.status(403).send({error: 'Completar campos faltantes.'})
    }
}); 


router.get('/VentanaAdmin', function (req, res){
    res.sendFile(path.join(__dirname, '../views/ventanaAdmin.html'));
});





module.exports = router;




/*

function ValidarUsuario(dni, password, response){
    var sql = "SELECT name, lastName FROM users WHERE dni = "+dni+" AND password = '"+password+"'";
    connection.query(sql, function(error, result){
        if (error) throw error;
        if (result.length === 0){
            console.log('No existe el usuario');
            return false;
        }else{
            console.log(result);
            response.redirect('/seleccion-dias');
            return true;
        }
    });
} 
*/