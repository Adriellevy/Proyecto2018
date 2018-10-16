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

router.get('/solicitudesProf', function(req, res){
    res.sendFile(path.join(__dirname, '../views/seleccionDias.html'));
});

router.post('/solicitudesProf',function(req,res){
    console.log("funciona el posteo de solisitudes");
    var Día = req.body.Listadias || "null" ; 
    var Bloque = req.body.Listabloques || "null" ;
    console.log(Día);
    console.log(Bloque);
    BuscarAula(Día,Bloque);
});

router.get('/agregarUsuarios', function (req, res){
    res.sendFile(path.join(__dirname, '../views/agregarUsuarios.html'));
});
router.post('/agregarUsuarios', function (req, res) {
    console.log("info recibida del posteo");
    var id = req.body.DniUsuario || "" ; 
    var Nombre = req.body.NombreUsuario || "" ;
    var apellido = req.body.ApellidoUsuario || "" ;
    var contraseña = req.body.ContraseñaUsuario || "" ;
    console.log("Los datos ingresados son: ",id,Nombre,apellido,contraseña)
    agregarUsuario(id,Nombre,apellido,contraseña,res);
}); 


router.get('/VentanaAdmin', function (req, res){
    res.sendFile(path.join(__dirname, '../views/ventanaAdmin.html'));
    console.log("una computadora se ha conectado a la pagina /ventanaAdmin ")
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
          })
        } else {
        response.status(403).send({error: 'Completar campos faltantes.'})
        }
    }


router.get('/VentanaAdmin', function (req, res){
    res.sendFile(path.join(__dirname, '../views/ventanaAdmin.html'));
});





module.exports = router;






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


    function SolicitudesAula(){
    
    }

    function BuscarAula(Día,Bloque){
        var bloquefinal; 
        if (Bloque === "1 Bloque" && Día === "Lunes" ){
            bloquefinal = 1;
        }
        else if (Bloque === "2 Bloque" && Día === "Lunes" ){
            bloquefinal = 2;
        }
        else if (Bloque === "3 Bloque" && Día === "Lunes" ){
            bloquefinal = 3;
        }
        else if (Bloque === "1 Bloque" && Día === "Martes" ){
            bloquefinal = 4;
        }
        else if (Bloque === "2 Bloque" && Día === "Martes" ){
            bloquefinal = 5;
        }
        else if (Bloque === "3 Bloque" && Día === "Martes" ){
            bloquefinal = 6;
        }
        else if (Bloque === "1 Bloque" && Día === "Miercoles" ){
            bloquefinal = 7;
        } 
        else if (Bloque === "2 Bloque" && Día === "Miercoles" ){
            bloquefinal = 8;
        }
        else if (Bloque === "3 Bloque" && Día === "Miercoles" ){
            bloquefinal = 9;
        }
        else if (Bloque === "1 Bloque" && Día === "Jueves" ){
            bloquefinal = 10;
        }
        else if (Bloque === "2 Bloque" && Día === "Jueves" ){
            bloquefinal = 11;
        }
        else if (Bloque === "3 Bloque" && Día === "Jueves" ){
            bloquefinal = 12;
        }
        else if (Bloque === "1 Bloque" && Día === "Viernes" ){
            bloquefinal = 13;
        }
        else if (Bloque === "2 Bloque" && Día === "Viernes" ){
            bloquefinal = 14;
        }
        else if (Bloque === "3 Bloque" && Día === "Viernes" ){
            bloquefinal = 15;
        }
        console.log("El bloque final queda asi: " + bloquefinal);
        connection.query(`SELECT * FROM ` + "schedule" + ``+` WHERE `+"block"+` = `+ bloquefinal +``, function (error, results, fields) {
                if(error || results === 0 || results === null || results === []){
                   throw error;  
                }
                else if (results != "undefined"){
                        try{ 
                                if (results === 0){
                                    console.log("No exsiste un aula en el horario que se pida");
                                }
                                else if (results >= 1){
                                    console.log("Existe un aula en el horario solisitado");
                                    var IDroom;
                                    var string = JSON.stringify(results);
                                    var json =  JSON.parse(string);
                                    console.log('>> json: ', json);
                                    console.log('>> schedule.idroom: ', json[0].idroom);
                                    IDroom = json[0].idroom;
                            }
                        } catch(err) {
                        console.log(error)
                        }
                    }             
                });
            }
