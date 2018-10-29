
var config = {
	apiKey: "AIzaSyBJ07lQll4dzXwtIv45WSsSd4_lzdCeT8I",
	authDomain: "proyectotic-2018.firebaseapp.com",
	databaseURL: "https://proyectotic-2018.firebaseio.com",
	projectId: "proyectotic-2018",
	storageBucket: "proyectotic-2018.appspot.com",
	messagingSenderId: "248044014160"
};
firebase.initializeApp(config);

var database = firebase.database();

function AgregarInfo(Nombre,apellido,Materia,contraseña){
var messageListRef = firebase.database().ref('profesores');
var newMessageRef = messageListRef.push();
messageListRef.set({
 // no usar esta funcion
});

function cerrarSesion(){

  $.post('/cierreSesion', function(data){
    console.log(data);
  });

}


newMessageRef.set({
  //aca creas un hijo adentro de un objeto sin nombre(o un nombre aleatorio) con las caracteristicas que quieras
});
}

function ActualizardataUsu(Nombre,apellido,Materia,contraseña){
 var postData = {
  "Apellido": apellido,
  "Contraseña": contraseña,
  "EsAdmin": "true",
  "Materia": Materia,
  "Nombre": Nombre
  };
  var newPostKey = firebase.database().ref().child('profesores').push().key;

  var updates = {}; 
 
  i = 0;

     var profesoresRef = firebase.database().ref('profesores');
    profesoresRef.on('value', function(snapshot) {
      var cantidad1 = 0;
      var cantidad = [];
      cantidad = snapshot.val();
      console.log(cantidad)
      cantidad1 = (Object.keys(cantidad).length);
      cantidad1 = cantidad1 + 1;
      console.log(cantidad1);
      var cantidad2 = "" + cantidad1;
      i = i + 1;
      if(i == 1){
    updates['/profesores/Profesor_' + cantidad2] = postData;
    return firebase.database().ref().update(updates);
      }
    });     
} 

function ActualizardataAula(disponibilidad,edificio,nombre,lunesBloqueos,MartesBloqueos,MiercolesBloqueos,JuevesBloqueos,ViernesBloqueos){
var postData = {
    "Disponible":disponibilidad
    "Edificio":edificio
    "Nombre":nombre
    "bloqueos":{
    
    "lunes":{
    "1er bloque": lunesBloqueos
    "2do bloque": lunesBloqueos
    "3er bloque": lunesBloqueos
      } 
    "martes":{
    "1er bloque": MartesBloqueos
    "2do bloque": MartesBloqueos
    "3er bloque": MartesBloqueos
     }
     "miercoles":{
    "1er bloque": MiercolesBloqueos
    "2do bloque": MiercolesBloqueos
    "3er bloque": MiercolesBloqueos
     }
     "jueves":{
    "1er bloque": JuevesBloqueos
    "2do bloque": JuevesBloqueos
    "3er bloque": JuevesBloqueos
     }
     "viernes":{
    "1er bloque": ViernesBloqueos
    "2do bloque": ViernesBloqueos
    "3er bloque": ViernesBloqueos
     }
  }
  };
  var newPostKey = firebase.database().ref().child('aulas').push().key;
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {}; 
  var profesoresRef = firebase.database().ref('aulas');
    profesoresRef.on('value', function(snapshot) {
      var cantidad1 = 0;
      var cantidad = [];
      cantidad = snapshot.val();
      console.log(cantidad)
      cantidad1 = (Object.keys(cantidad).length);
      cantidad1 = cantidad1 + 1;
      console.log(cantidad1);
      var cantidad2 = "" + cantidad1;
      i = i + 1;
      if(i == 1){
  updates['/aulas/Aula_' + cantidad2 ] = postData;

  return firebase.database().ref().update(updates); 
    }
  });
}

function BorarInfo(){
   for (var i = 0; i < 310; i++){
var profesoresRef = firebase.database().ref('profesores');
profesoresRef.remove()
  .then(function() {
    console.log("Remove succeeded.")
  })
  .catch(function(error) {
    console.log("Remove failed: " + error.message)
  });
  }
}
/*funcion cuando se apreta boton1{
ActualizardataUsu(InputNombreUsuario ,InputApellidoUsuario , InputMateriaUsuario,InputContraseñaUsuario);
}
*/
/*funcion cuando se apreta boton1{
ActualizardataUsu(InputNombreUsuario ,InputApellidoUsuario , InputMateriaUsuario,InputContraseñaUsuario);
}
*/



 