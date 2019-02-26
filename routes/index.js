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
var idaulaglobal;
var Estadoaulaglobal;
var Díaglobal  
var Bloqueglobal 
var NAulaglobal 
var tiempoglobal 
var idsubglobal 
var idprofglobal 
var fechaglobal
var ok;
var NombreDeAulasOcupadas
var Numerodelconflicto = 0;
var ListaDeConfictos = [];
var script = document.createElement('script');
script.src = '//code.jquery.com/jquery-1.11.0.min.js';

router.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, '../views/inicioSesion.html'));
});

router.get('/solicitudesProf', function(req, res){
    res.sendFile(path.join(__dirname, '../views/seleccionDias.html'));
});

router.get('/conflictos', function(req, res){
    res.sendFile(path.join(__dirname, '../views/conflictos.html'));
});

router.get('/materias', function(req, res){
    res.sendFile(path.join(__dirname, '../views/Materias.html'));
});

router.get('/solicitudesAdm',function(req,res){
    res.sendFile(path.join(__dirname, '../views/solicitudes.html'));
    cargaSolicitudes(res);
});

router.get('/VentanaAdmin', function (req, res){
    res.sendFile(path.join(__dirname, '../views/ventanaAdmin.html'));
    console.log(">> UN ADMIN SE A CONECTADO ") 
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

router.post('/agregarMateria',function (req, res){
    var materia = req.body.materia;
    console.log(materia);
    agregarMateria(materia, res);
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
    var tiempo = req.body.ListaTiempo
    var idsub = req.body.idsub; 
    var idprof = req.body.idprof;
    var fecha = req.body.fecha;
    console.log(">> Día solicitado: " + Día);
    console.log(">> Bloque solicitado: " + Bloque);
    console.log(">> Aula solicitada: "+ NAula);
    console.log(">> tiempo solicitado: "+ tiempo);
    console.log(">> ")
    Solicitaraula(Día,Bloque,res,NAula,tiempo,idsub,idprof,fecha);
});


router.post('/RespuestaAula',function(req,res){
     Díaglobal = req.body.Listadias  
     Bloqueglobal = req.body.Listabloques 
     NAulaglobal = req.body.ListaAulas;
     tiempoglobal = req.body.ListaTiempo
     idsubglobal = req.body.idsub; 
     idprofglobal = req.body.idprof;
     fechaglobal = req.body.fecha;
     Estadoaula(Díaglobal,Bloqueglobal,res,NAulaglobal,tiempoglobal,idsubglobal,idprofglobal,fechaglobal);
     console.log(Estadoaulaglobal)
     //res.send(Estadoaulaglobal);
     res.status(200).send(Estadoaulaglobal.toString());
     
}); 

router.post('/solicitudesAdm',function(req,res){
    //cargaSolicitudes(res);
    //res.send(ListaNombredeaulas);
    rta = req.body.accion;
    console.log(">> " + rta);
    RtaAdm(req);
});


router.post('/permisos',function(req,res){
    DNI = req.body.DNI;
    permisos(DNI,res); 
});

router.post('/asignarMateria', function(req, res, next){
    var profesor = req.body.profesor;
    var materia = req.body.materia;
    console.log(req.body);
    asignarMateria(profesor, materia, res);
});

router.get('/profes', function(req, res){
    var sql = "SELECT * FROM users WHERE role = 'teacher'";
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

router.get('/solicitudaula',function(req,res){
    res.send(ListaNombredeaulas);
});
router.get('/solicitudprof',function(req,res){
    res.send(ListaNombredeProfesores);
});
router.get('/solicitudhorario',function(req,res){
    res.send(ListaHoriarios);
});
router.get('/VentanaAdmin', function (req, res){
    res.sendFile(path.join(__dirname, '../views/ventanaAdmin.html'));
    console.log("una computadora se ha conectado a la pagina /ventanaAdmin ")
    
});

router.post('/cargamapa',function(req,res){
    Díaglobal = req.body.Listadias  
    Bloqueglobal = req.body.Listabloques 
    buscadaimagenes(Bloqueglobal,Díaglobal,res);
})

router.get('/pedirmapa',function(req,res){
        res.send(NombreDeAulasOcupadas);
})
router.post('/conflictos',function(req,res){
    CargaDeConflictos();  
    res.send(ListaDeConfictos);  
}); 

module.exports = router;

function permisos(DNI,res){
    if(DNI){
   var sql1 = "SELECT * FROM users WHERE dni="+ DNI;
    connection.query(sql1, function(error, result){
        if (error) {throw error;
        }else{
            if(result){
            rola = result[0].role; 
            if(rola == "teacher"){
                rola = 2;
                res.status(200).send(rola.toString());
            }else if(rola == "admin"){
                rola = 3
                res.status(200).send(rola.toString());
            }else{
                rola = 1;
                res.status(200).send(rola.toString());
            }
        }else{
            rola = 1
            res.status(200).send(rola.toString());
            }
        }
    });
    
}else{
    rola = 1
    res.status(200).send(rola.toString());
}
}

function CargaDeConflictos(){
    connection.query('SELECT * FROM `schedule` WHERE `status` = 2',function (error, result, fields){
        if(error){
            throw error;  
        }else{
            ListaDeConfictos=[];
             if(result){
                    for(var numc = 0; numc<result.length; numc++){
                        var string1 = JSON.stringify(result);
                        var json1 =  JSON.parse(string1);
                    for(let j = 0; j < result.length; j++){
                        console.log(">> j: "+j);
                        console.log(">> Numerodelconflicto: "+numc);
                            if(json1[numc].date == json1[j].date){
                                if(json1[numc].idroom == json1[j].idroom){
                                    if(json1[numc].id == json1[j].id){
                                    console.log(">> numeros iguales");
                                        }else{
                                            
                                                ListaDeConfictos.push(json1[numc]);
                                                ListaDeConfictos.push(json1[j]);   
                                        }
                                    }
                        }else{
                                console.log(">> No hay conflictos");
                                ListaDeConfictos.push(0);
                            }
                        }
                    }   console.log(">>lista de conflictos positivos:"+ListaDeConfictos.length);
                        console.log(ListaDeConfictos)
                        
               }else{
                    console.log(">> No hay conflictos");
                } 
            } 
                
        })
        
    }


    /*async.each(ListA, function (itemA, callback) { //loop through array
                    //process itemA
                  async.each(itemA.Children, function (itemAChild, callback1) { //loop through array
                    //process itemAChild
                    callback1(); 
                    }, function(err) {
                      console.log("InnerLoopFinished");
                      callback();
                    });
                  }, function(err) {
                    console.log("OuterLoopFinished");
                    console.log('Process Finished');
                });
                 /*
                 console.log("a");
                 var Numerodelconflicto = 0;
                 let j = 0
        async.each(result,function (result, callback){
            if(Numerodelconflicto<result.length){
                console.log("aa");
                var string1 = JSON.stringify(result);
                var json1 =  JSON.parse(string1);
            }
            async.each(result.Children,function(resultChild,callback1){
                if(j < result.length){
                    console.log(">> j: "+j);
                    console.log(">> Numerodelconflicto: "+Numerodelconflicto);
                    if(json1[Numerodelconflicto].date == json1[j].date){
                        if(json1[Numerodelconflicto].idroom == json1[j].idroom){
                            if(json1[Numerodelconflicto].id == json1[j].id){
                            console.log(">> numeros iguales");
                            Numerodelconflicto++
                            j++
                                }else{
                                Numerodelconflicto++
                                j++
                                ListaDeConfictos.push(json1[Numerodelconflicto]);
                                ListaDeConfictos.push(json1[i]);
                                console.log(">>lista de conflictos positivos:")
                                console.log(ListaDeConfictos)
                                }
                            }
                    }else{
                        console.log(">> No hay conflictos");
                        ListaDeConfictos.push(0);
                    }
                }
                callback1();
           
        },function(err) {
                console.log("InnerLoopFinished");
                callback();
              });
            },function(err) {
              console.log("OuterLoopFinished");
              console.log('Process Finished');
          }); 
        
         }
        }
        })
        }
       /* if(error){
            throw error;  
        }else{
             if(result){
                 console.log("a");
            for(var Numerodelconflicto;Numerodelconflicto>result;Numerodelconflicto++){
                console.log("a");

                var string1 = JSON.stringify(result);
                var json1 =  JSON.parse(string1);
            for(let j = 0; j < result.length; j++){
                console.log(">> j: "+j);
                console.log(">> Numerodelconflicto: "+Numerodelconflicto);
                    if(json1[Numerodelconflicto].date == json1[j].date){
                        if(json1[Numerodelconflicto].idroom == json1[j].idroom){
                            if(json1[Numerodelconflicto].id == json1[j].id){
                            console.log(">> numeros iguales");
                                }else{
                                ListaDeConfictos.push(json1[Numerodelconflicto]);
                                ListaDeConfictos.push(json1[i]);
                                console.log(">>lista de conflictos positivos:")
                                console.log(ListaDeConfictos)
                                }
                    }
                }else{
                        console.log(">> No hay conflictos");
                        ListaDeConfictos.push(0);
                    }
                }
            }
       }else{
            console.log(">> No hay conflictos");
        } 
    } 
        
})
} */

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
                response.redirect('/Materias');
            });
        }
    });
}


function agregarMateria(materia, response){
    var sql = "SELECT * FROM subjects WHERE name = '"+materia+"'";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length > 0){
            console.log('Materia ya existe');
            console.log(result);
            
        }else{
            sql = "INSERT INTO subjects (name) VALUES ('"+materia+"')";
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                response.redirect('/Materias');
            });
        }
    });


}

function asignarMateria (profesor, materia, response){
    var sql = "INSERT INTO users_subject (idusers, idsubject) VALUES ("+profesor+", "+materia+")";
    connection.query(sql, function(error, result){
        response.send('Se asigno la materia.');
        
    });
}

function ValidarUsuario(dni, password, response){
    var sql = "SELECT * FROM users WHERE dni = "+dni+" AND password = '"+password+"'";
    connection.query(sql, function(error, profesores, request){
        if (error) throw error;
        if (profesores.length === 0){
            console.log('No existe el usuario');
            // PASAR LOS ERRORES ACA (NO SE COMO)
            response.redirect('/login');
        }else{
            response.cookie('name',profesores[0].name,{ expires: new Date(Date.now() + (60*1000))});
            response.cookie('lastName',profesores[0].lastName,{ expires: new Date(Date.now() + (60*1000))});
            response.cookie('idp',profesores[0].id,{ expires: new Date(Date.now() + (60*1000)) })
            response.cookie('ids',profesores[0].idsubject,{ expires: new Date(Date.now() + (60*1000))})
            response.cookie('DNI',profesores[0].dni,{expires: new Date(Date.now() + (60*1000))});
            sql = "SELECT * FROM users_subject WHERE idusers ="+profesores[0].id;
            connection.query(sql, function(error, result, request){
                if (result){
                    sql = "SELECT name FROM subjects WHERE";
                    for (let i = 0; i < result.length; i++) {
                        var id = result[i].idsubject;
                        if (i !== 0)
                            sql+=" OR";
                        sql+=" id = "+id;
                    }
                    connection.query(sql, function(error, materias, request){
                        if (materias){
                            var role = profesores[0].role;
                            var materiasProf = [];
                            for (let i = 0; i < materias.length; i++) {
                                materiasProf.push(materias[i].name);
                            }
                            if(role === "teacher"){
                                request.teacher = {
                                    nombre: profesores[0].name,
                                    apellido: profesores[0].lastName,
                                    materias: materiasProf
                                }
                                console.log("aqui");
                                console.log(request.teacher);
                                response.redirect('/solicitudesProf');
                                return true;
                            }else{
                                response.redirect('/VentanaAdmin');
                            }
                        }else{
                            console.log('El profesor no tiene materias.');
                            response.redirect('/VentanaAdmin');
                        }
                    });
                }else{
                    console.log('El profesor no tiene materias.');
                    response.redirect('/VentanaAdmin');
                }
            });
        }
    });
} 

function Solicitaraula(Día,Bloque,response,AULA,repeticion,idsub,idprof,fecha){
    Estadoaulaglobal = 1;
    var bloquefinal; 
    var IDPROf = idprof; 
    var IDSUb = idsub; 
    var nombreAula = AULA;  
    var repeticionaula = repeticion; 
    bloquefinal = BUSCADAdeboque(Bloque,Día);
    if(repeticion == "semanal"){
        repeticionaula = 3;
    }else if (repeticion == "mensual"){
        repeticionaula = 2;
    }else if(repeticionaula == "anual"){
        repeticionaula = 1;
    }
    console.log(">> bloque final: " + bloquefinal);
    console.log(">> Repeticion: " + repeticionaula);
    console.log(">> IDSUb: " + IDSUb);
    console.log(">> IDPROF: " + IDPROf);
    console.log(">> AULA: " + nombreAula);
    connection.query(`SELECT * FROM `+ "rooms" + ` WHERE ` + "name" + `= "` + nombreAula +`"`, function (error, result, fields){
    if(error){
        throw error;
    }
    else if (result.length != undefined){
        var IdAula;
        var string1 = JSON.stringify(result);
        var json1 =  JSON.parse(string1); 
        if(json1 != ""){
        IdAula = json1[0].id; 
        idaulaglobal = IdAula;
        console.log(">> room.id: " + IdAula);
        console.log(">> Shoudle.block: "+ bloquefinal);
        connection.query('SELECT * FROM `schedule` WHERE `idroom` = '+idaulaglobal+' AND `block` = '+bloquefinal+' AND `status` = 2',function (error, result, fields){
            if(error){
                throw error;  
            }else{
                 if(result.length != undefined){
            connection.query('INSERT INTO `schedule`(`idusers`, `idsubject`, `idroom`, `block`, `repeat`, `status`,`date`) VALUES ('+IDPROf+','+IDSUb+','+IdAula+',' +bloquefinal+','+repeticionaula+',1,'+fecha+')',function (error, result, fields) {
                    if(error){
                        throw error;  
                    }else{
                        console.log(">> solicitud confirmada")
                    }
                });   
            }else{
                console.log(">>>>>>>>>>>>>>>>>");
            } 
        } 
    }); 
}
}
});
};

        
function cargaSolicitudes(response){

ListaNombredeaulas = [];
ListaNombredeProfesores = [];
ListaHoriarios=[];
connection.query(`SELECT * FROM `+"schedule" +` WHERE `+"status"+` = 1 ORDER BY id`, function (error, result, fields) {
if(error){
    console.log(">> There is not a request for a schedule");
    throw error;  
}
else{
            var string = JSON.stringify(result);
            var json =  JSON.parse(string); 
            console.log(">> The json is saved the next step: search in rooms");
        if (json === [] || json === null || json === "null" || json === ""){
                console.log(">> The Json is empty")
                exports.json = json;
        }else{                            
            for (let i = 0; i<result.length; i++){
                console.log(result[i])
                const element = result[i].idroom;   
                ListaHoriarios.push(result[i].block);
                    if(json != [] || json != null || json != "null" || json != ""){
                    connection.query(`SELECT * FROM `+ "rooms" + ` WHERE ` + "id" + `=` + result[i].idroom +``, function (error, result, fields){
                        if(error){
                            throw err;
                        }else{
                            if(result){
                            var string1 = JSON.stringify(result);
                            var json1 =  JSON.parse(string1); 
                            nombreAula = json1[0].name;
                            ListaNombredeaulas.push(nombreAula);
                            }
                        }
                    });
            connection.query(`SELECT * FROM `+ "users" + ` WHERE ` + "id" + `=` + result[i].idusers +``, function (error, results, fields){
                if(error){
                    throw err;
                }else{
                    if(result){
                    var string = JSON.stringify(results);
                    var json =  JSON.parse(string); 
                    var nombreProfe = json[0].name;
                    ListaNombredeProfesores.push(nombreProfe);
                    console.log(ListaNombredeProfesores);
                    }
                }
            })
        }
        
    }
} 
}    
});
}

function RtaAdm(req){
    var rsta = req.body.accion
    console.log(">> rsta: "+rsta)
    if(rsta =='aceptar'){
        msg = req.body.aula;
        console.log('>> msg: ' + msg)
        connection.query(`SELECT * FROM `+ "rooms" + ` WHERE ` + "name" + `= "`+msg+`"`, function (error, resulta, fields){
            if(error){
                throw err;
            }else{
                var stringa = JSON.stringify(resulta);
                var jsona =  JSON.parse(stringa); 
                var idaula = jsona[0].id;
                console.log(">> id aula: " + idaula);
        connection.query(`UPDATE `+"schedule"+` SET `+"status"+`= 2 WHERE `+"status"+` = 1 AND `+"idroom"+` =`+ idaula+``, function (error, result, fields) {
            if(error){
            }
            else{
                console.log(">> Una solicitud ha sido aprobada: " + msg); 
                
            }
        });
    
    }
        
});
}else{
console.log(">> rsta != aprobar")
}
if(rsta == 'rechazar'){
msg = req.body.aula;
console.log(msg);
connection.query(`SELECT * FROM `+ "rooms" + ` WHERE ` + "name" + `="`+msg+`"`, function (error, result, fields){
    if(error){
        throw err;
    }else{
        var string1 = JSON.stringify(result);
        var json1 =  JSON.parse(string1); 
        var idaula = json1[0].id;
        console.log(">> id aula: " + idaula);
connection.query(`UPDATE `+"schedule"+` SET `+"status"+`= 0 WHERE `+"status"+` = 1 AND `+"idroom"+` =`+ idaula+``, function (error, result, fields) {
    if(error){
    }
    else{
        console.log(">> Una solicitud ha sido rechasada: " + msg);

            }
        });
    }
});
}else{
console.log(">> rsta != rechazar");
}
}

function Estadoaula(Día,Bloque,response,AULA,repeticion,idsub,idprof,fecha){
    ok = false;
    var bloquefinal; 
    var IDPROf = idprof; 
    var IDSUb = idsub; 
    var nombreAula = AULA;  
    var repeticionaula = repeticion; 
    bloquefinal = BUSCADAdeboque(Bloque,Día);
    if(repeticion == "semanal"){
        repeticionaula = 3;
    }else if (repeticion == "mensual"){
        repeticionaula = 2;
    }else if(repeticionaula == "anual"){
        repeticionaula = 1;
    }
    console.log(">> antes del query")
    connection.query("SELECT * FROM `schedule` WHERE `idusers` = "+IDPROf+" AND `idsubject` = "+IDSUb+" AND `idroom` = "+idaulaglobal+" AND `block` = "+bloquefinal+" AND `repeat`= "+repeticionaula+"AND `date`= "+fechaglobal+"", function (error, result, fields){
        if(error){
            throw err;
        }else{
            if(result){
            var string1 = JSON.stringify(result);
            var json1 =  JSON.parse(string1); 
            var a = String(json1[0].status);
            console.log(">> Reslut: " + a);
            Estadoaulaglobal = a; 
            console.log(">> estado: "+ Estadoaulaglobal);
}
    } 
        }); 
        	}
function buscadaimagenes(Bloque,Día,respuesta){
    NombreDeAulasOcupadas = [];
    var bloquefinal;   
    bloquefinal = BUSCADAdeboque(Bloque,Día);
    
    console.log(">> bloquefinal: "+bloquefinal); 
    var sql = "SELECT * FROM  schedule WHERE block = "+bloquefinal+" AND status = 2 ORDER BY idroom"
   
    var nombre
    var Nombreviejo;
    connection.query(sql, function(error, results){
        if(results){
        for(var i = 0; i<results.length; i++){ 
            var string = JSON.stringify(results);
            var json =  JSON.parse(string); 
            nombre = json[i].idroom;
            console.log(i);
            console.log(nombre);  
            var max = results.length;
            var cnt = 0;
            if(++cnt === max){
                 console.log(">> Resuts =''")
            }else{
                    var sql = "SELECT * FROM rooms WHERE id = "+nombre+" ORDER BY name"
                    connection.query(sql, function(error, result){
                if(result){
                    console.log(result);
                    var string1 = JSON.stringify(result); 
                    var json1 =  JSON.parse(string1); 
                    var nombre1 = json1[0].name;
                    if(Nombreviejo == nombre1){
                    Nombreviejo = nombre1;
                    }else{
                    Nombreviejo = nombre1;
                    NombreDeAulasOcupadas.push(nombre1); 
                    console.log(">> aulas ocupadas: "+NombreDeAulasOcupadas); 
                    }
                }else{
                    console.log(">> no exsiste el aula solicitda, es imposible")
                    console.log(result);
                    NombreDeAulasOcupadas = results;
                }
        })
    }
}
     console.log(NombreDeAulasOcupadas)
}else{
        console.log("Todas las aulas estan libres : "+results); 
        NombreDeAulasOcupadas = results;
    }
});
    
}

function BUSCADAdeboque(Bloque,Día){
    if (Bloque === "1 Bloque" && Día === "Lunes"){
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
    return(bloquefinal)
}