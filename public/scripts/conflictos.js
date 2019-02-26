var a = 2000
var borrado = false;
var RTA;
var RTA2;
    $.post('/conflictos',{

            },function(response){
            if(response){
                console.log(response)
                RTA = response;
                for(var i = 0; i<response.length; i++){
                    var b = i;                    
        }
        RTA2=eliminarObjetosDuplicados(RTA,"id");
    }
});

$('#ListaAulas').on('change', function() {
    Bloque = "";
    Día = "";
    var combo = document.getElementById("ListaAulas");
    var selected = combo.options[combo.selectedIndex].text;
    console.log(selected)
    LosSelectQueCambian.textContent='profesor:'+RTA2[selected].idProf;
    LosSelectQueCambian1.textContent='materia:'+RTA2[selected].date;
})
            function eliminarObjetosDuplicados(arr,prop){
                    var nuevoArray = [];
                    var lookup  = {};
                
                    for (var i in arr) {
                        lookup[arr[i][prop]] = arr[i];
                    }
                
                    for (i in lookup) {
                        nuevoArray.push(lookup[i]);
                    }
                    
                    console.log(nuevoArray);
                    for(var j = 0; j < nuevoArray.length; j++){
                        $('#ListaAulas').append('<option id="'+j+'"value="'+nuevoArray[j].id+'">'+j+'</option>');
                    }
                    return nuevoArray;
            }
            /*
a esto se llama bucles anidados 
for (i=0; i<10; i++){ 
    for (j=0; j<10; j++) { 
        console.log(i + "-" + j) 
    } 
}*/