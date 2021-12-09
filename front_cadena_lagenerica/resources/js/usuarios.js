const USERS_ENDPOINT = ENDPOINT + "usuarios/"

var users_dict = { "cedula_usuario": null,
    "email_usuario": null,
    "nombre_usuario": null,
    "password": null,
    "usuario" : null };


// consultar

$(document).on("click", "#btn_usuario_consultar", function() {
    $.ajax({
        contentType: "application/json",
        dataType: "json",
        url: USERS_ENDPOINT + document.getElementById("cedula_usuario").value,
        success: function(result){
            $.each(result, function(key, value){
                if(Object.keys(users_dict).includes(key)){
                 document.getElementById(key).value = value;
                }
                 });}
        }).fail(function(jqXHR, textStatus) {
            $("input").val("");
            failure_handler(jqXHR, textStatus);
      })
});

// crear

$(document).on("click", "#btn_usuario_crear", function(){
    let data = users_dict;
    for(key in data){
        data[key] = $("#"+ key).val();
    };
    $.ajax({
        method: "POST",
        contentType: "application/json",
        dataType: "json",
        url: USERS_ENDPOINT + "guardar",
        data: JSON.stringify(data),
        success: function(data, textStatus, jqXHR){
            $("input").val("");
            if(jqXHR.status == 200){
                alert("El usuario ya existe");
             } else if(jqXHR.status == 201){
                 alert("Usuario creado exitosamente");
                } else {
                    alert(jqXHR.status + ": " + jqXHR.textStatus)
                }}
    }).fail(function(jqXHR, textStatus) {
        failure_handler(jqXHR, textStatus);
  })
});

// actualizar

$(document).on("click", "#btn_usuario_actualizar", function(){
    let data = users_dict;
    for(key in data){
        data[key] = $("#"+ key).val();
    };
    $.ajax({
        method: "PUT",
        contentType: "application/json",
        dataType: "json",
        url: USERS_ENDPOINT + "actualizar",
        data: JSON.stringify(data),
        success: function(){
            $("input").val("");
            alert("Usuario actualizado")
        }
    }).fail(function(jqXHR, textStatus) {
        failure_handler(jqXHR, textStatus);
  })
});

// borrar

$(document).on("click", "#btn_usuario_borrar", function(){
    $.ajax({
        method: "DELETE",
        contentType: "application/json",
        dataType: "json",
        url: USERS_ENDPOINT + "eliminar/" + document.getElementById("cedula_usuario").value,
        success: function(){
            $("input").val("");
            alert("El usuario ha sido eliminado")
        }
    }).fail(function(jqXHR, textStatus) {
        failure_handler(jqXHR, textStatus);
  })
});