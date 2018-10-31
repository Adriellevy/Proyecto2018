var miSelect=document.getElementById("ListaAulas");
// Creamos un objeto option
var miOption=document.createElement("option");
// Añadimos las propiedades value y label
miOption.setAttribute("value","1");
miOption.setAttribute("label","casa");
// Añadimos el option al select
miSelect.appendChild(miOption);

var listaAulas = $('#ListaAulas');
function enviar (accion) {
	$.post('http://localhost:8000/solicitudesAdm', {
		accion: accion,
		aula: listaAulas.val()
	}, function(data) {
		alert('Datos enviados!');
	});
}

