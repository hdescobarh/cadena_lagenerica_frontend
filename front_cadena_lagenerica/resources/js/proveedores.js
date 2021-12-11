

var supplier_dict = { "nitproveedor": null,
                "ciudad_proveedor": null,
                "direccion_proveedor": null,
                "nombre_proveedor": null,
                "telefono_proveedor": null};

// consultar

$(document).on("click", "#btn_proveedor_consultar", function() {
    $.ajax({
        contentType: "application/json",
        dataType: "json",
        url: SUPPLIER_ENDPOINT + document.getElementById("nitproveedor").value,
        success: function(result){
            $.each(result, function(key, value){
                if(Object.keys(supplier_dict).includes(key)){
                 document.getElementById(key).value = value;
                }
                 });}
        }).fail(function(jqXHR, textStatus) {
            $("input").val("");
            failure_handler(jqXHR, textStatus);
      })
});

// crear

$(document).on("click", "#btn_proveedor_crear", function(){
    let data = supplier_dict;
    for(key in data){
        data[key] = $("#"+ key).val();
    };
    $.ajax({
        method: "POST",
        contentType: "application/json",
        dataType: "json",
        url: SUPPLIER_ENDPOINT + "guardar",
        data: JSON.stringify(data),
        success: function(data, textStatus, jqXHR){
            $("input").val("");
            if(jqXHR.status == 200){
                alert("El proveedor ya existe");
             } else if(jqXHR.status == 201){
                 alert("Proveedor creado exitosamente");
                } else {
                    alert(jqXHR.status + ": " + jqXHR.textStatus)
                }}
    }).fail(function(jqXHR, textStatus) {
        failure_handler(jqXHR, textStatus);
  })
});

// actualizar

$(document).on("click", "#btn_proveedor_actualizar", function(){
    let data = supplier_dict;
    for(key in data){
        data[key] = $("#"+ key).val();
    };
    $.ajax({
        method: "PUT",
        contentType: "application/json",
        dataType: "json",
        url: SUPPLIER_ENDPOINT + "actualizar",
        data: JSON.stringify(data),
        success: function(){
            $("input").val("");
            alert("Proveedor actualizado")
        }
    }).fail(function(jqXHR, textStatus) {
        failure_handler(jqXHR, textStatus);
  })
});

// borrar

$(document).on("click", "#btn_proveedor_borrar", function(){
    $.ajax({
        method: "DELETE",
        contentType: "application/json",
        dataType: "json",
        url: SUPPLIER_ENDPOINT + "eliminar/" + document.getElementById("nitproveedor").value,
        success: function(){
            $("input").val("");
            alert("El proveedor ha sido eliminado")
        }
    }).fail(function(jqXHR, textStatus) {
        failure_handler(jqXHR, textStatus);
  })
});