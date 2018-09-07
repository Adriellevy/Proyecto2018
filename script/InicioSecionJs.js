
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
var texto = "123";
function leerdatos(contraseña,Profe){ 
  var ref = firebase.database().ref();
    ref.on("value", function(snapshot) {
       var profesores = [];
           profesores = snapshot.val().profesores;
       var count = Object.keys(profesores).length;
          for (var i = 0; i<count; i++){
              console.log(profesores['profesor_'+(i+1)].Contraseña);
              console.log(profesores['profesor_'+(i+1)].Nombre);

              var Contraseñaprofe = profesores['profesor_'+(i+1)].Contraseña;
              var UsuarioProfe = profesores['profesor_'+(i+1)].Nombre;

                if(Contraseñaprofe == contraseña && UsuarioProfe == Profe )
                {
                  var estatus  = profesores['profesor_'+(i+1)].EsAdmin;
                  console.log(estatus);
                  if (estatus == true){
                    //window.location.href = './AgregarUsuYAulas';
                    alert("es ADM");
                  }else{
                    //window.location.href = './Selecion de dias';
                    alert("es profe");
                  }
                }
             }
           })
          }

 
// no funciona el click funcition, no se porque 
$("#InicioSesion").click(function() {
  console.log("paso uno");
  var contraseña = $("#contraseña").val();
  var Usuario = $("#Usuario").val() 
  leerdatos(contraseña,Usuario);
});





