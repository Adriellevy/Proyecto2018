alert("se cargo uno");


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

function writeUserData(userId, name, email,) {
  firebase.database().ref('users/' + userId).set({
    username: adri,
    email: provando
  });
}

