var express = require('express');
var router = express.Router();
var connection = require('../config/database');
var path = require('path');
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var ListaNombredeaulas = [];
var idaula;

router.get('/login', function (req, res) {
    //res.sendFile(__dirname + '../views/inicioSesion.html');
    //res.render('inicioSesion');
    res.sendFile(path.join(__dirname, '../views/inicioSesion.html'));
});

router.get('/solicitudesProf', function(req, res){
    res.sendFile(path.join(__dirname, '../views/seleccionDias.html'));
});

router.get('/materias', function(req, res){
    res.sendFile(path.join(__dirname, '../views/Materias.html'));
});

router.get('/solicitudesAdm',function(req,res){
    res.sendFile(path.join(__dirname, '../views/solicitudes.html'));
    cargaSolisitudes();
});
router.get('/VentanaAdmin', function (req, res){
    res.sendFile(path.join(__dirname, '../views/ventanaAdmin.html'));
    console.log("una computadora se ha conectado a la pagina /ventanaAdmin ")
    
});

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
    var NAula = req.body.ListaAulas;
    console.log(">> Día solicitado: " + Día);
    console.log(">> Bloque solicitado: " + Bloque);
    console.log(">> Aula solicitada: "+ NAula);
    Solicitaraula(Día,Bloque,res,NAula);
});

router.post('/solicitudesAdm',function(req,res){
  //cargaSolicitudes(res);
    //res.send(ListaNombredeaulas);

    rta = req.body.action;
    console.log(rta);
    RtaAdm(req);
});

router.post('/cierreSesion',function(response){
    response.redirect('/login');
});

router.get('/profes', function(req, res){
    var sql = "SELECT name, lastName FROM users WHERE role = 'teacher'";
    connection.query(sql, function(error, result){
        if (error) throw error;
        res.send(result);
    });
});

router.get('/listadomaterias', function(req, res){
    var sql = "SELECT * FROM subjects";
    connection.query(sql, function(error, result){
        if (error) throw error;
        res.send(result);
    });
});

router.get('/VentanaAdmin', function (req, res){
    res.sendFile(path.join(__dirname, '../views/ventanaAdmin.html'));
    console.log("una computadora se ha conectado a la pagina /ventanaAdmin ")
    
});

module.exports = router;
  


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
unction Solicitaraula(Día,Bloque,response,AULA,repeticion){
    ok = false;
    var bloquefinal; 
    var IDPROf; 
    var IDSUb; 
    var nombreAula =AULA;  
    var repeticionaula= repeticion; 
        
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
    if(repeticion === "semanalmene"){
        repeticionaula = 3;
    }else if (repeticion === "mensualmente"){
        repeticionaula = 2;
    }else if(repeticionaula === "anualmente"){
        repeticion = 1;
    }
    console.log(">> bloque final: " + bloquefinal);
try{ 
    
    connection.query(`SELECT * FROM `+ "rooms" + ` WHERE ` + "name" + `= "` + nombreAula +`"`, function (error, result, fields){
    if(error){
        throw error;
    }
    else if (result != undefined){
        var IdAula;
        var string1 = JSON.stringify(result);
        var json1 =  JSON.parse(string1); 
        IdAula = json1[0].id; 
        console.log(">> room.id: " + IdAula);
        console.log(">> Shoudle.block: "+ bloquefinal);
            connection.query('INSERT INTO `schedule`(`idusers`, `idsubject`, `idroom`, `block`, `repeat`, `status`) VALUES (2,1,'+IdAula+',' +bloquefinal+','+repeticionaula+',1)',function (error, results, fields) {
                    if(error){
                        throw error;  
                    }else{
                         ok = true;
                    }
                });
                }
            });
    }catch(err){
        
        }
    }
        
        function cargaSolicitudes(response){
            ListaNombredeaulas = [];
            connection.query(`SELECT * FROM `+"schedule" +` WHERE `+"status"+` = 1`, function (error, results, fields) {
                if(error){
                   console.log(">> There is not a request for a schedule");
                   throw error;  
                }
                else{
                            var string = JSON.stringify(results);
                            var json =  JSON.parse(string); 
                            console.log(">> The json is saved the next step: search in rooms");
                        if (json === [] || json === null || json === "null" || json === ""){
                                console.log(">> The Json is empty")
                                exports.json = json;
                        }else{                            
                            for (let i = 0; i  < results.length; i++) {
                                const element = results[i].idroom;   
                                console.log(">> A `for` request to the table `rooms` is running out");
                                    if(json != [] || json != null || json != "null" || json != ""){
                                        
                                    connection.query(`SELECT * FROM `+ "rooms" + ` WHERE ` + "id" + `=` + results[i].idroom +``, function (error, result, fields){
                                        if(error){
                                            throw err;
                                        }else{
                                            var string1 = JSON.stringify(result);
                                            var json1 =  JSON.parse(string1); 
                                            nombreAula = json1[0].name;
                                            console.log(nombreAula);
                                            ListaNombredeaulas.push(nombreAula);
                                    }
                            });
                        }
                        
                    }
                } 
             }    
        });
    }









         function RtaAdm(req){
            var rsta = req.body.action
            if(rsta === 'aprobar'){
                msg = req.body.aula;
             connection.query(`SELECT * FROM `+ "rooms" + ` WHERE ` + "id" + `=` + msg +``, function (error, result, fields){
                    if(error){
                        throw err;
                    }else{
                        var string1 = JSON.stringify(result);
                        var json1 =  JSON.parse(string1); 
                        var idaula = json1[0].id;
                        console.log(">> id aula: " + idaula);
                connection.query(`UPDATE `+"schedule"+` SET `+"status"+`= 2 WHERE `+"status"+` = 1 AND `+"idroom"+` =`+ idaula+``, function (error, results, fields) {
                    if(error){
                    }
                    else{
                        console.log(">> Una solicitud ha sido aprobada: " + msg); 
                    }
                });
            
            }
               
        });
    }else if(rsta === 'rechazar'){
        msg = req.body.aula;
        connection.query(`SELECT * FROM `+ "rooms" + ` WHERE ` + "id" + `=` + msg +``, function (error, result, fields){
            if(error){
                throw err;
            }else{
                var string1 = JSON.stringify(result);
                var json1 =  JSON.parse(string1); 
                var idaula = json1[0].id;
        connection.query(`UPDATE `+"schedule"+` SET `+"status"+`= 0 WHERE `+"status"+` = 1 AND `+"idroom"+` =`+ idaula+``, function (error, results, fields) {
            if(error){
            }
            else{
                console.log(">> Una solicitud ha sido rechasada: " + msg); 
                    }
                });
            }
        });
    }else{
    console.log("El posteo que se envio es indefinido")
} 
}
