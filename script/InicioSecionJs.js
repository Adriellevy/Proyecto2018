
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
newMessageRef.set({
  'objeto': 'LohicePerro',
  'text': 'Lanada'
});
var path = newMessageRef.toString();
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



