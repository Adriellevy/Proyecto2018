var express = require('express');
var router = express.Router();
var dbConnection = require('./config/database');

router.get('/login', function (req, res) {
	res.sendFile(__dirname + '/views/inicioSesion.html');
});

router.post('/login', function (req, res){
  console.log('post');
  var dni = req.body.dni;
  var password = req.body.password;
  console.log(dni);
});

router.get('/solicitudes', function(req, res){

});

router.post('localhost:8080/mysql', function (req, res) {
    console.log("info recibida")
     if (req.body.name && req.body.age) {
    var query = connection.query("SELECT * FROM `users` WHERE DNI ='" + id + "'" ,function(error,result){
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
    res.status(403).send({error: 'You must specify the name and age values.'})
    }
})

router.post('/prueba', function (req, res) {
    res.send(req.body)
})

function ValidarUsuario(dni, password){
    var sql = "SELECT name, lastName FROM users WHERE dni = "+dni+" AND password = '"+password+"'";
    dbConnection.query(sql, function(error, result){
        if (error) throw error;
        if (result.length === 0){

        console.log('No existe el usuario');
        return false;
        }else{

        console.log(result);
        return true;
        }
    });
} 


module.exports = router;