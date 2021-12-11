var listaDetalles = [];

/*debe consultar el cliente, actualizar nombre, crear ventas y recuperar el id */
$(document).on("click", "#ventas_init_facturacion", function () {
  // consulta que el cliente exista y actualiza formulario
  $.ajax({
    contentType: "application/json",
    dataType: "json",
    url: CUSTOMERS_ENDPOINT + document.getElementById("cedula_cliente").value,
    success: function (result) {
      document.getElementById("nombre_cliente").value =
        result["nombre_cliente"];
    },
  }).fail(function (jqXHR, textStatus) {
    failure_handler(jqXHR, textStatus);
  });
  // crea la nueva venta y actualiza formulario
  let data = {
    cliente: {
      cedula_cliente: document.getElementById("cedula_cliente").value,
    },
    usuario: {
      cedula_usuario: sessionStorage.getItem("sesion_id"),
    },
    ivaventa: 0,
    total_venta: 0,
    valor_venta: 0,
  };
  $.ajax({
    method: "POST",
    contentType: "application/json",
    dataType: "json",
    url: VENTAS_ENDPOINT + "guardar",
    data: JSON.stringify(data),
    success: function (data, textStatus, jqXHR) {
      document.getElementById("codigo_venta").value = data["codigo_venta"];
      document.getElementById("total_venta").value = 0.0;
      document.getElementById("ivaventa").value = 0.0;
      document.getElementById("valor_venta").value = 0.0;
    },
  }).fail(function (jqXHR, textStatus) {
    failure_handler(jqXHR, textStatus);
  });
});

$(document).on("click", "#consultar_item-01", function () {
  // consulta que el producto exista, actualiza el formulario
  let data_detallesventa = {
    cantidad_producto: null,
    producto: { codigo_producto: null },
    venta: { codigo_venta: null },
    valor_total: null,
    valor_venta: null,
    valoriva: null,
  };

  $.ajax({
    contentType: "application/json",
    dataType: "json",
    url: PRODUCT_ENDPOINT + document.getElementById("codigo_producto-01").value,
    success: function (result) {
      //actualiza vista
      document.getElementById("nombre_producto-01").value =
        result["nombre_producto"];
      // calculos y preparacion de datos para el post
      data_detallesventa["cantidad_producto"] = parseInt(
        document.getElementById("cantidad_producto-01").value
      );

      data_detallesventa["producto"]["codigo_producto"] =
        result["codigo_producto"];

      data_detallesventa["venta"]["codigo_venta"] = parseInt(
        document.getElementById("codigo_venta").value
      );

      data_detallesventa["valor_venta"] =
        result["precio_venta"] * data_detallesventa["cantidad_producto"];

      data_detallesventa["valoriva"] =
        data_detallesventa["valor_venta"] * IVA_VENTAS;

      data_detallesventa["valor_total"] =
        data_detallesventa["valor_venta"] + data_detallesventa["valoriva"];

      document.getElementById("valor_total-01").value =
        data_detallesventa["valor_total"];

      listaDetalles[1] = data_detallesventa;
    },
  }).fail(function (jqXHR, textStatus) {
    failure_handler(jqXHR, textStatus);
  });
});

// con el valor de cantidad hace post a venta detalles, una vez retornado actualiza el formulario y suma al total de la factura

$(document).on("click", "#agregar_item-01", function () {
  data = listaDetalles[1];
  $.ajax({
    method: "POST",
    contentType: "application/json",
    dataType: "json",
    url: DETALLES_ENDPOINT + "guardar",
    data: JSON.stringify(data),
    success: function (data, textStatus, jqXHR) {
      document.getElementById("total_venta").value = Number(
        document.getElementById("total_venta").value + data["valor_total"]
      );
      document.getElementById("ivaventa").value = Number(
        document.getElementById("ivaventa").value + data["valoriva"]
      );
      document.getElementById("valor_venta").value = Number(
        document.getElementById("valor_venta").value + data["valor_venta"]
      );
    },
  }).fail(function (jqXHR, textStatus) {
    failure_handler(jqXHR, textStatus);
  });
});

$(document).on("click", "#confirmar_venta", function () {
  let data_venta = {
    codigo_venta: parseInt(document.getElementById("codigo_venta").value),
    cliente: {
      cedula_cliente: parseInt(document.getElementById("cedula_cliente").value),
    },
    usuario: {
      cedula_usuario: parseInt(sessionStorage.getItem("sesion_id")),
    },
    ivaventa: Number(document.getElementById("ivaventa").value),
    total_venta: Number(document.getElementById("total_venta").value),
    valor_venta: Number(document.getElementById("valor_venta").value),
  };

  $.ajax({
    method: "PUT",
    contentType: "application/json",
    dataType: "json",
    url: VENTAS_ENDPOINT + "actualizar",
    data: JSON.stringify(data_venta),
    success: function (data, textStatus, jqXHR) {
        alert("Facturación realizada con exito")
        $("input").val("");
        updateConsolidate(data_venta["valor_venta"])   
    },
  }).fail(function (jqXHR, textStatus) {
    failure_handler(jqXHR, textStatus);
  });
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
