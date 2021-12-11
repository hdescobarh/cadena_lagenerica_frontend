
var customer_dict = {"cedula_cliente": null,
    "direccion_cliente": null,
    "email_cliente": null,
    "nombre_cliente": null,
    "telefono_cliente": null}

// consultar

$(document).on("click", "#btn_cliente_consultar", function() {
    $.ajax({
        contentType: "application/json",
        dataType: "json",
        url: CUSTOMERS_ENDPOINT + document.getElementById("cedula_cliente").value,
        success: function(result){
            $.each(result, function(key, value){
                if(Object.keys(customer_dict).includes(key)){
                 document.getElementById(key).value = value;
                }
                 });}
        }).fail(function(jqXHR, textStatus) {
            $("input").val("");
            failure_handler(jqXHR, textStatus);
      })
});


// crear

$(document).on("click", "#btn_cliente_crear", function(){
    let data = customer_dict;
    for(key in data){
        data[key] = $("#"+ key).val();
    };
    $.ajax({
        method: "POST",
        contentType: "application/json",
        dataType: "json",
        url: CUSTOMERS_ENDPOINT + "guardar",
        data: JSON.stringify(data),
        success: function(data, textStatus, jqXHR){
            $("input").val("");
            if(jqXHR.status == 200){
                alert("El cliente ya existe");
             } else if(jqXHR.status == 201){
                 alert("Cliente creado exitosamente");
                } else {
                    alert(jqXHR.status + ": " + jqXHR.textStatus)
                }}
    }).fail(function(jqXHR, textStatus) {
        failure_handler(jqXHR, textStatus);
  })
});


// actualizar

$(document).on("click", "#btn_cliente_actualizar", function(){
    let data = customer_dict;
    for(key in data){
        data[key] = $("#"+ key).val();
    };
    $.ajax({
        method: "PUT",
        contentType: "application/json",
        dataType: "json",
        url: CUSTOMERS_ENDPOINT + "actualizar",
        data: JSON.stringify(data),
        success: function(){
            $("input").val("");
            alert("Cliente actualizado")
        }
    }).fail(function(jqXHR, textStatus) {
        failure_handler(jqXHR, textStatus);
  })
});

// borrar

$(document).on("click", "#btn_cliente_borrar", function(){
    $.ajax({
        method: "DELETE",
        contentType: "application/json",
        dataType: "json",
        url: CUSTOMERS_ENDPOINT + "eliminar/" + document.getElementById("cedula_cliente").value,
        success: function(){
            $("input").val("");
            alert("El cliente ha sido eliminado")
        }
    }).fail(function(jqXHR, textStatus) {
        failure_handler(jqXHR, textStatus);
  })
});