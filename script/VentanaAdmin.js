
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


  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('profesores').push().key;
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {}; 

  updates['/profesores/Profesor_' + newPostKey ] = postData;

  return firebase.database().ref().update(updates);
} 
function ActualizardataAula(){
var postData = {

  };
  var newPostKey = firebase.database().ref().child('aulas').push().key;
  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {}; 

  updates['/aulas/Aula_' + newPostKey ] = postData;

  return firebase.database().ref().update(updates);
}

function BorarInfo(){
   for (var i = 0; i < 310; i++){
var adaRef = firebase.database().ref('Profesor_' + i);
adaRef.remove()
  .then(function() {
    console.log("Remove succeeded.")
  })
  .catch(function(error) {
    console.log("Remove failed: " + error.message)
  });
  }
}

ActualizardataUsu("Nombre","apellido","Materia","contraseña");
