alert('asd');
var miSelect=document.getElementById("ListaAulas");
// Creamos un objeto option
var miOption=document.createElement("option");
// Añadimos las propiedades value y label
miOption.setAttribute("value","1");
miOption.setAttribute("label","casa");
// Añadimos el option al select
miSelect.appendChild(miOption);
var listaAulas = $('#ListaAulas');
function enviar(accion){
	alert('asd2');
	$.post('http://localhost:8080/solicitudesAdm',{
		accion: "aprobar", /*cambiar aprobar hardcoreado*/
		aula: listaAulas.val()	
	}, function(data) {
		alert('Datos enviados!');
	});
}
$.get('/solicitud',function(result){
	alert("hiso el get");
	alert(result);
	for(var i = 0; i<result.length; i++){
	 $('#ListaAulas').append('<option id=”opcion1″ value='+result[i]+'>'+result[i]+'</option>');
	}
	
});



