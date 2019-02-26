document.getElementById('Name').innerHTML = getCookie("name"); 


var Profesor = getCookie("name");
var DNi = getCookie("DNI");
var apellido = getCookie("LastName");
var fecha = new Date();
console.log(fecha)
//chequeo si esta permitido
if(DNi){
$.post('/permisos',{
	DNI:DNi
	},function(response){//base de datos agregar tabla 
		console.log(response);
		if(response!=2){
			if(response != 1){
				window.redirect("/login");
			}else if(reponse == 3){ 
				window.redirect("/solicitudesAdm")
			}
		}
	})
}else{
window.location.href = "/login";
}

function enviar(accion){
	var bloques = document.getElementById("Listabloques").value;
	var dias = document.getElementById("Listadias").value;
	var tiempo = document.getElementById("ListaTiempo").value;
	var aulas = document.getElementById("ListaAulas").value;
	var id = getCookie("idp");
	var mat = getCookie("idps");
	console.log (bloques, dias, tiempo, id, mat)
	$.post('/solicitudesProf',{
	Listabloques: bloques ,
	Listadias: dias ,
	ListaTiempo: tiempo ,
	ListaAulas: aulas ,
	idsub: mat ,
	idprof: id,
	fecha:date
	}, function(data){
		alert('Datos enviados!');
	});
	alert("solcitud enviada");
	console.log("a");
}
function EnEspera(){
	var bloques = document.getElementById("Listabloques").value;
	var dias = document.getElementById("Listadias").value;
	var tiempo = document.getElementById("ListaTiempo").value;
	var aulas = document.getElementById("ListaAulas").value;
	var id = 3;
	var mat = 1;
	console.log (bloques, dias, tiempo, id, mat)
	
	$.post('/RespuestaAula',{
		Listabloques: bloques ,
		Listadias: dias ,
		ListaTiempo: tiempo ,
		ListaAulas: aulas ,
		idsub: mat ,
		idprof: id,
		fecha:date
		},function(response){
			console.log(response)
			if(response == 2){
				alert("se a haceptado la solicitud");
				window.location.replace('/solicitudesProf');
			}else if (response == 0){
				alert("Se a negado la solicitud");
				window.location.replace('/solicitudesProf');
			}else if( response == 1){
				alert("sigue pendiente su solicitud");
			}
		});
		}
	
	function cargarmapa(){
		var bloques = document.getElementById("Listabloques").value;
		var dias = document.getElementById("Listadias").value;
		if(bloques === "Vacio" || dias === "Vacio"){
			$("#img1").attr("src","images/Planos-Bloqueado.jpg");
		}else{
		$.post('/cargamapa',{
		Listabloques: bloques ,
		Listadias: dias
		},function(response){
		for(var i = 0; i<result.length; i++){
				console.log(response[i]);
		}
		})
		$.get('/pedirmapa',function(result){
			console.log(result);
			if(result == "L2,L3,L206,L208,L209"){
				$("#img1").attr("src","images/L1Disponible.jpg");
			}else if(result == "L1,L3,L206,L208,L209"){
				$("#img1").attr("src","images/L2 Disponible.jpg");
			}else if(result == "L3"){
				$("#img1").attr("src","images/L3 Disponible.jpg");
			}else if(result == "L1,L2,L206,L208,L209"){
				$("#img1").attr("src","images/L208 Disponible.jpg");
			}else if(result == "L1,L2,L3,L206,L209"){
				$("#img1").attr("src","images/L209 Disponible.jpg");
			}else if(result == "L2,L3,L206,L208,L209"){
				$("#img1").attr("src","images/L213 Disponible.jpg");
			}else if(result.length > 1){
				$("#img1").attr("src","/"+result+".jpg");
			}else{
				//$("#img1").attr("src","images/"+result+".jpg");
				$("#img1").attr("src","images/Todas Disponibles.jpg");  
			}
				}) 
					}     

	}  
	function getCookie(name){
var cname = name + "=";               
var dc = document.cookie;             
if (dc.length > 0) {              
	begin = dc.indexOf(cname);       
	if (begin != -1) {           
	begin += cname.length;       
	end = dc.indexOf(";", begin);
	if (end == -1) end = dc.length;
		return unescape(dc.substring(begin, end));
	} 
}
return null;
} 