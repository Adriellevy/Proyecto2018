
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

function leerdatos(){ 
  var ref = firebase.database().ref();
    ref.on("value", function(snapshot) {
       var profesores = [];
           profesores = snapshot.val().profesores;
       var count = Object.keys(profesores).length;
       console.log(profesores ['profesor_'+ 1].Contraseña);
          for (var i = 0; i<count; i++){
              console.log(profesores['profesor_'+(i+1)].Contraseña);
              var profesores = profesores['profesor_'+(i+1)].Contraseña;
              if(profesores === ('#contraseña').text)
              {
                console.log(vamo);
              }
             }
     }); 
  }
  leerdatos();

