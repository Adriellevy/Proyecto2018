var bloques = document.getElementById("Listabloques").value;
var dias = document.getElementById("Listadias").value;
var tiempo = document.getElementById("ListaTiempo").value;
var aulas = document.getElementById("ListaAulas").value;
var id = 2;
var mat = 1;
alert("concha");
console.log (bloques, dias, tiempo, id, mat)

function enviar(accion){
	alert('asd2');
	$.post('http://localhost:8000/solicitudesProf',{
	Listabloques: bloques ,
	Listadias: dias ,
	ListaTiempo: tiempo ,
	ListaAulas: aulas ,
	idsub: mat ,
	idprof: id 
	}, function(data) {
		alert('Datos enviados!');
	});
}