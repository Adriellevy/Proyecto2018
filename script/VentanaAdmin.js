
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

function AgregarInfo(){
var messageListRef = firebase.database().ref('ParaProbar');
var newMessageRef = messageListRef.push();
messageListRef.set({
'objeto': 'LohicePerro',
  'text': 'Lanada'
});
newMessageRef.set({
  //aca creas un hijo adentro de un objeto sin nombre(o un nombre aleatorio) con las caracteristicas que quieras
});
}

function ActualizardataUsu(Nombre,apellido,Materia,contraseña){

  var data ={
  "Apellido": apellido,
  "Contraseña": contraseña,
  "EsAdmin": "false",
  "Materia": Materia,
  "Nombre": Nombre
  }
  
      var newPostKey = firebase.database().ref().child('profesores').push().key;
      var profesores = {};
      var count = Object.keys(profesores).length;
      profesores['/profesores/' + ("Profesor_" + (count-1))] = data;
      return firebase.database().ref().update(profesores);
      
     }

function BorarInfo(){
var adaRef = firebase.database().ref('ParaProbar');
adaRef.remove()
  .then(function() {
    console.log("Remove succeeded.")
  })
  .catch(function(error) {
    console.log("Remove failed: " + error.message)
  });
  }

ActualizardataUsu("adri","adri","fisica","123");






