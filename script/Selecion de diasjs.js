
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
var path = newMessageRef.toString();
}

function BorarInfo(){
var adaRef = firebase.database().ref('ParaProbar');
adaRef.remove()
  .then(function() {
    console.log("Ya fue eliminado.")
  })
  .catch(function(error) {
    console.log("Error al eliminar: " + error.message)
  });
  }
function leerdatos(){ 
  var ref = firebase.database().ref();
  ref.on("value", function(snapshot) {
     console.log(snapshot.val().aulas.Aula_1.Nombre);// aca dsp de snapshop.val se ve lo que queres buscar dentro de proyecto-2018
  }, function (error) {
     console.log("Error: " + error.code);
  });
}

leerdatos();