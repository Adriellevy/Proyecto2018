$.get( "/profes", function(result) {
    for(var i = 0; i<result.length; i++){
        var nombre = result[i].name;
        var apellido = result[i].lastName;
        var li = $('<li></li>');
        li.html(nombre + ' ' + apellido);
        $('ul#profes').append(li);
        var option = document.createElement('option');
        option.value = result[i].id
        option.innerHTML = nombre + ' ' + apellido
        $('select#prof').append(option);
    }
});

$.get( "/listadomaterias", function(result) {
    for(var i = 0; i<result.length; i++){
        var subject = result[i].name;               
        var li = $('<li></li>');
        li.html(subject);
        $('ul#materias').append(li);
        var option = document.createElement('option');
        option.value = result[i].id
        option.innerHTML = subject
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