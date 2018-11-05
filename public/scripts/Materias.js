$.get( "/profes", function(result) {
    var profes = [];
    for(var i = 0; i<result.length; i++){
        var nombre = result[i].name;
        var apellido = result[i].lastName;
        var id = result[i].id;
        profes.push({nombre:nombre, apellido:apellido, id:id});
    }
    profes.sort(compareProfes);
    for (let i = 0; i < profes.length; i++) {
        const element = profes[i];
        var li = $('<li></li>');
        li.html(element.nombre + ' ' + element.apellido);
        $('ul#profes').append(li);
        var option = document.createElement('option');
        option.value = element.id
        option.innerHTML = element.nombre + ' ' + element.apellido
        $('select#prof').append(option);    
    }
});

$.get( "/listadomaterias", function(result) {
    var materias = [];
    for(var i = 0; i<result.length; i++){
        var subject = result[i].name;               
        materias.push({id:result[i].id, name:result[i].name});
    }
    materias.sort(compareMaterias);
    for (let i = 0; i < materias.length; i++) {
        const element = materias[i];
        var li = $('<li></li>');
        li.html(element.name);
        $('ul#materias').append(li);
        var option = document.createElement('option');
        option.value = element.id;
        option.innerHTML = element.name;
        $('select#mater').append(option);
    }
});


$('form#asignarMateria').submit(function(event){
    event.preventDefault();
    console.log($('select#prof').value);
    $.ajax({
        url: "/asignarMateria",
        type: "POST",
        dataType: "json",
        data: {
            profesor: $('#prof').val(),
            materia: $('#mater').val()
        },
        complete: function() {
          //called when complete
          console.log('process complete');
        },
        success: function(data) {
          console.log(data);
          console.log('process sucess');
        },
        error: function() {
          console.log('process error');
        },
    });
});

function compareProfes(a,b) {
    if (a.apellido < b.apellido)
        return -1;
    if (a.apellido > b.apellido)
        return 1;
    return 0;
}

function compareMaterias(a,b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}