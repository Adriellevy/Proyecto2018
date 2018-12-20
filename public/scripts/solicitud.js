document.getElementById('Name').innerHTML = getCookie("name"); 
var DNi = getCookie("DNI");

var miSelect=document.getElementById("ListaAulas");
    var miOption=document.createElement("option");
    
    miOption.setAttribute("value","1");
    miOption.setAttribute("label","casa");
    var listaAulas = $('#ListaAulas');
    var Profes =[];
    var bloquefinal =[];
    var Día 
    var Bloque


if(DNi){
$.post('/permisos',{
	DNI:DNi
	},function(response){ 
		console.log(response);
		if(response!=2){
			if(response == 1){
				window.location.href = "/login";
			}else if(reponse == 3){ 
				window.redirect("/solicitudesAdm")
			}
		}
	})
}else{
window.location.href = "/login";
}
    function enviar(action){
        var valor = $("#ListaAulas option:selected").html();
        $.post('/solicitudesAdm',{
            accion: action, 
            aula: valor 
        });
        alert("solcitud enviada");
        console.log("a");
        refresh();
    }
        
	function refresh()
	{
        location.reload();
        console.log('se recargo?')
    }

    $('#ListaAulas').on('change', function() {
        Bloque = "";
        Día = "";
        var i = $(ListaAulas).val();
        console.log(i)
        console.log(bloquefinal)
        LosSelectQueCambian.textContent=Profes[i];
        if (bloquefinal[i] == 1){
        Bloque = "1 Bloque";
        Día = "Lunes";
    }
    else if (bloquefinal[i] == 2 ){
        Bloque = "2 Bloque";
        Día = "Lunes";
    }
    else if (bloquefinal[i] == 3){
        Bloque = "3 Bloque";
        Día = "Lunes"; 
    }
    else if ( bloquefinal[i] == 4){
        Bloque = "1 Bloque"; 
        Día = "Martes"
    }
    else if (bloquefinal[i] == 5){
        Bloque = "2 Bloque";
        Día = "Martes";        
    }
    else if (bloquefinal[i] == 6){
        Bloque = "3 Bloque";
        Día ="Martes";
    }
    else if (bloquefinal[i] == 7 ){
        Bloque = "1 Bloque"; 
        Día = "Miercoles";
    } 
    else if (bloquefinal[i] == 8){
        Bloque = "2 Bloque"; 
        Día ="Miercoles";
    }
    else if (bloquefinal[i] == 9){
        Bloque = "3 Bloque"; 
        Día = "Miercoles";
    }
    else if ( bloquefinal[i] == 10){
        Bloque = "1 Bloque"; 
        Día = "Jueves";
    }
    else if (bloquefinal[i] == 11){
        Bloque = "2 Bloque";
        Día = "Jueves";
    }
    else if (bloquefinal[i] == 12){
        Bloque = "3 Bloque"; 
        Día = "Jueves";
    }
    else if ( bloquefinal[i] == 13){
        Bloque = "1 Bloque"; 
        Día = "Viernes";
    }
    else if (bloquefinal[i] == 14){
        Bloque = "2 Bloque";
        Día = "Viernes";
    }
    else if ( bloquefinal[i] = 15){
        Bloque = "3 Bloque";
        Día = "Viernes";
    }
    if(Profes[i]!= ""){
    LosSelectQueCambian1.textContent ='Se solicita el aula en el dia '+ Día +' En el bloque '+Bloque;
    }else{
        LosSelectQueCambian1.textContent = '';
    }
    })

    $.get('/solicitudaula',function(result){
            if(result == ""){
                alert("No hay ninguna solcisitud pendiente, espere y lugo recarge la pagina"); 
            }else{ 
            for(var i = 0; i<result.length; i++){
             $('#ListaAulas').append('<option id=”opcion1″ value='+i+'>'+result[i]+'</option>');
            }
        }
    });
    $.get('/solicitudprof',function(result){
        if(result == ""){
                alert("No hay ninguna solcisitud pendiente, espere y lugo recarge la pagina"); 
            }else{ 
            console.log(result);
            Profes = result;
            /*for(var i = 0; i<result.length; i++){
             $('#LosSelectQueCambian').append('<option id=”opcion1″ value='+result[i]+'>'+result[i]+'</option>');
            }*/
    }
});
$.get('/solicitudhorario',function(result){
    if(result){
        bloquefinal = result;
        console.log(result);
    }else{
        conosole.log("no hay nada");
    }
})

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