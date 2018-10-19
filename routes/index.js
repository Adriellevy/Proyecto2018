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
    var dni = req.body.DniUsuario; 
    var nombre = req.body.NombreUsuario;
    var apellido = req.body.ApellidoUsuario;
    var password = req.body.ContraseñaUsuario;
    AgregarUsuario(dni, nombre, apellido, password, 'teacher');
}); 


router.get('/VentanaAdmin', function (req, res){
    res.sendFile(path.join(__dirname, '../views/ventanaAdmin.html'));
});

module.exports = router;

function AgregarUsuario(dni, nombre, apellido, password, rol){
    var sql = "SELECT * FROM users WHERE dni = "+dni;
    connection.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length > 0){
            console.log('Usuario ya existe');
            console.log(result);
        }else{
            sql = "INSERT INTO users (dni, name, lastName, password, role) VALUES ("+dni+", '"+nombre+"', '"+apellido+"', '"+password+"', '"+rol+"')";
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        }
    });
}


function ValidarUsuario(dni, password, response){
    var sql = "SELECT name, lastName, role FROM users WHERE dni = "+dni+" AND password = '"+password+"'";
    connection.query(sql, function(error, result){
        var role = result[0].role;
        if (error) throw error;
        if (result.length === 0){
            console.log('No existe el usuario');
            return false;
        }else{
            if(role === "teacher"){
                response.redirect('/seleccion-dias');
                return true;
            }else{
                response.redirect('/VentanaAdmin');
            }
        }
    });
} 
