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

router.get('/solicitudesProf', function(req, res){
    res.sendFile(path.join(__dirname, '../views/seleccionDias.html'));
});

router.get('/solicitudes',function(req,res){
    res.sendFile(path.join(__dirname, '../views/solicitudes.html'));
    cargaSolisitudes();
})

router.get('/agregarUsuarios', function (req, res){
    res.sendFile(path.join(__dirname, '../views/agregarUsuarios.html'));
});

router.post('/agregarUsuarios', function (req, res) {
    var dni = req.body.DniUsuario; 
    var nombre = req.body.NombreUsuario;
    var apellido = req.body.ApellidoUsuario;
    var password = req.body.ContraseñaUsuario;
    AgregarUsuario(dni, nombre, apellido, password, 'teacher', res);
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

router.post('/solicitudesProf',function(req,res){
    var Día = req.body.Listadias || "null" ; 
    var Bloque = req.body.Listabloques || "null" ;
    console.log(">> Día solicitado: "+Día);
    console.log(">> Bloque solicitado: "+Bloque);
    BuscarAula(Día,Bloque,res);
});

router.post('/solicitudesAdm',function(req,res){
    SolicitudesAdm();
    
});
router.get('/VentanaAdmin', function (req, res){
    res.sendFile(path.join(__dirname, '../views/ventanaAdmin.html'));
    console.log("una computadora se ha conectado a la pagina /ventanaAdmin ")
    
});

module.exports = router;


router.get('/VentanaAdmin', function (req, res){
res.sendFile(path.join(__dirname, '../views/ventanaAdmin.html'));
});

module.exports = router;

function AgregarUsuario(dni, nombre, apellido, password, rol, response){
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
                response.redirect('/VentanaAdmin');
            });
        }
    });
}


function ValidarUsuario(dni, password, response){
    var sql = "SELECT name, lastName, role FROM users WHERE dni = "+dni+" AND password = '"+password+"'";
    connection.query(sql, function(error, result){
        if (error) throw error;
        if (result.length === 0){
            console.log('No existe el usuario');
            // PASAR LOS ERRORES ACA (NO SE COMO)
            response.redirect('/login');
        }else{
            var role = result[0].role;
            if(role === "teacher"){
                response.redirect('/solicitudesProf');
                return true;
            }else{
                response.redirect('/VentanaAdmin');
            }
        }
    });
} 

function BuscarAula(Día,Bloque,response){
    var bloquefinal; 
    var IDPROf; 
    var IDSUb; 
    var nombreAula; 
    
    IDPROf = /*require('./seleccionDias.js') ||*/ "1" ;
    IDSUb = /*require('./seleccionDias.js') ||*/ "1";
    nombreAula = /*require('./seleccionDias.js') ||*/ "1";
    
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
try{ 
    nombreAula = 209; 
    connection.query(`SELECT * FROM `+ "rooms" + ` WHERE ` + "name" + `=` + nombreAula +``, function (error, result, fields){
    if(error){
        throw error;
    }
    else if (result != undefined){
        var IdAula;
        var string1 = JSON.stringify(result);
        var json1 =  JSON.parse(string1); 
        IdAula = json1[0].id; 
        console.log(">> room.name: " + IdAula);
        console.log(">> Shoudle.block: "+ IdAula);
        
            connection.query(`INSERT INTO `+"schedule"+`(`+"idteacher"+`, `+"idsubject"+`, `+"idroom"+`, `+"block"+`, `+"repeat"+`, `+"status"+`) VALUES (`+IDPROf+`,`+IDSUb+`,`+ nombreAula+`,`+bloquefinal+`,3,`+1+`)`,function (error, results, fields) {
                if(error){
                    throw error;  
                }else{

                    
                }
              });
            }
         });
}catch(err){
    
    }
}
    
        function cargaSolisitudes(){
            connection.query(`SELECT * FROM `+"schedule" +` WHERE `+"status"+` = 1`, function (error, results, fields) {
                if(error){
                   console.log("no hay horario disponible");
                   throw error;  
                }
                else{
                            var string = JSON.stringify(results);
                            var json =  JSON.parse(string); 
                            for (let i = 0; i  < results.length; i++) {
                                const element = results[i].idroom;    
                                    if(json != [] || json != null || json != "null" || json != ""){
                                    connection.query(`SELECT * FROM `+ "rooms" + ` WHERE ` + "id" + `=` + results[i].idroom +``, function (error, result, fields){
                                        if(error){
                                            throw err;
                                        }else{
                                            var string1 = JSON.stringify(result);
                                            var json1 =  JSON.parse(string1); 
                                            nombreaulaAdM = json1[0].name;
                                            ListaNombredeaulas.push(nombreaulaAdM);
                                            console.log(nombreaulaAdM);
                                            exports.nombre = nombreaulaAdM;
                                    }
                            });
                        }
                    }
                }
            });
        }