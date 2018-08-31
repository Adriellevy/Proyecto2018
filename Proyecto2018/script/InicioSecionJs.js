function a(){
var config = {
	apiKey: "AIzaSyBJ07lQll4dzXwtIv45WSsSd4_lzdCeT8I",
	authDomain: "proyectotic-2018.firebaseapp.com",
	databaseURL: "https://proyectotic-2018.firebaseio.com",
	projectId: "proyectotic-2018",
	storageBucket: "proyectotic-2018.appspot.com",
	messagingSenderId: "248044014160"
};
firebase.initializeApp(config);
//var database = firebase.database();
const preobject = document.getElementById('object');
alert("se cargo uno");


const dbRefObject = firebase.database().ref().child('object');
console.log(preobject);
dbRefObject.on('value', snap => {preobject.innerText = JSON.stringfy(snap.val(),null,3)})

};

a();



