/*$('form').submit(function(event){
    //event.preventDefault();
    $.ajax({
        type: 'POST',
        url:'/agregarUsuarios',
        dataType:'json',
        data:{
            DniUsuario: $('input#DniUsuario').val(),
            NombreUsuario: $('input#NombreUsuario').val(),
            ApellidoUsuario: $('input#ApellidoUsuario').val(),
            ContraseñaUsuario: $('input#ContraseñaUsuario').val(),
        }
    }).done(function(data){
        console.log(data);
    }).error(function(error){
        console.error(error);
    });
});*/