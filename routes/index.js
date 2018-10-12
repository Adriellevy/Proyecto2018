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
}

);



router.post('/agregarUsuarios', function (req, res) {
    console.log("asd");
    console.log("info recibida del posteo");
    var id = req.body.DniUsuario || "" ; 
    var Nombre = req.body.NombreUsuario || "" ;
    var apellido = req.body.ApellidoUsuario || "" ;
    var contraseña = req.body.ContraseñaUsuario || "" ;
    console.log(id,Nombre,apellido,contraseña,"juampi es un capo")
    agregarUsuario(id,Nombre,apellido,contraseña,res);
}); 


router.get('/VentanaAdmin', function (req, res){
    res.sendFile(path.join(__dirname, '../views/ventanaAdmin.html'));
});



module.exports = router;
 
function agregarUsuario(id, Nombre, apellido, contraseña, response){
    
        console.log("Datos guardados y especificados");
        if (Nombre != "" && apellido != "" && id !="" && contraseña != "") { 
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
                    connection.query(`INSERT INTO \``+ "users" +`\` (\``+ "DNI" +`\`, \``+ "username" +`\`, \``+"password"+`\`, \``+"role"+`\` ) VALUES ('`+id+`', '`+Nombre+`','`+contraseña+`','Teacher')`, function (error, results, fields) {
                     console.log("se a guardado el usuario");
                }); 
                    connection.query(`INSERT INTO \``+ "teachers" +`\` (\``+ "id" +`\`, \``+ "firstname" +`\`, \``+"lastname"+`\`, \``+"DNIusers"+`\` ) VALUES ('`+ " " +`', '`+Nombre+`','`+"Udentifed:)"+`','`+id+`'`, function (error, results, fields) {
                    console.log("se a guardado el maestro");
                });   
                response.redirect('/VentanaAdmin');
            }
            
            
            }
            }
            }
        
        )
        } else {
        response.status(403).send({error: 'Completar campos faltantes.'})
        }
    }






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