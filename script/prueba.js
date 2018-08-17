alert("Hola");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBJ07lQll4dzXwtIv45WSsSd4_lzdCeT8I",
  authDomain: "proyectotic-2018.firebaseapp.com",
  databaseURL: "https://proyectotic-2018.firebaseio.com",
  projectId: "proyectotic-2018",
  storageBucket: "proyectotic-2018.appspot.com",
  messagingSenderId: "248044014160"
};
var database = firebase.database();
firebase.initializeApp(config);
console.log(firebase);

//lo Que hace esta parte del codio es buscar la lista Usuario en fire base dsp crea una
// especie de variable con el usuario y la conraseña 
//var userId = firebase.auth().currentUser.uid; // esta linea de codigo no sirve, no se pq.
//return firebase.database().ref('/Usuarios/' + userId).once('value').then(function(snapshot) {
//var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  

//GetElementByID('Mama').value = username;


//snapshot = []
//snapshot = ['username':"pepe",'password':"hola"]
//snapshot.val() = ['username', 'password']
//snapshot.val().username = "pepe"