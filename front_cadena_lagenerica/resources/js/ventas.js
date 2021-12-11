
//sessionStorage.setItem("sesion_id", response["cedula_usuario"])

/**<button id="ventas_init_facturacion"> debe consultar el cliente, actualizar nombre, crear ventas y recuperar el id */
VENTAS_ENDPOINT
DETALLES_ENDPOINT

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

$(document).on("click", "#btn_cliente_consultar", function() {
    $.ajax({
        contentType: "application/json",
        dataType: "json",
        url: USERS_ENDPOINT + document.getElementById("cedula_cliente").value,
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



/*
 * <div id="item-detalle-venta-01" class="sales-form"> Contiene el detalle venta
 * label id="codigo_producto-01"  se ingresa el codigo de producto
 * button id="consultar_item-01" actualiza el resto de campos nombre
 * label id="nombre_producto-01" 
 * label id="cantidad_producto-01"
 * label id="valor_total-01"
 * button id="agregar_item-01" 1. hace el post del detalle, agrega suma a:
 *                  label id="total_venta"
 *                  label id="ivaventa"
 *                  label id="valor_venta"
 * button id="confirmar_venta" realiza el post
*/

