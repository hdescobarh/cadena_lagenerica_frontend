const PRODUCT_ENDPOINT = ENDPOINT + "productos/"

var listaItems = null;

function updatePreview(tableList){
  $("#preview").empty();
  for(campos of tableList){
    $("#preview").append(
      "<tr>\
          <td>" + campos[0] + "</td>\
          <td>" + campos[1] + "</td>\
          <td>" + campos[2] + "</td>\
          <td>" + campos[3] + "</td>\
          <td>" + campos[4] + "</td>\
          <td>" + campos[5] + "</td>\
          <td>" + campos[6] + "</td>\
      </tr>" )
    }
}

$(document).on("change", "#archivo_csv", function (data) {
  if (data.target.files != undefined) {
    let fr = new FileReader();
    let uploadList = new Array();
    fr.onload = function (data) {
      for (linea of data.target.result.split("\r\n")) {
        linea = linea + ",pendiente";
        campos = linea.split(",");
        uploadList.push(campos);
      }
    };
    fr.onloadend = function () {
      listaItems = uploadList;
      updatePreview(listaItems);
    };
    fr.readAsText(data.target.files.item(0));
  }
});

$(document).on("click", "#btn_cargar_csv", function () {

  for (let i = 0; i < listaItems.length; i++) {
    entrada = listaItems[i]
    let data = {
      "codigo_producto": parseInt(entrada[0]),
      "nombre_producto": entrada[1],
      "proveedor": {
      "nitproveedor": parseInt(entrada[2])
    },
      "precio_compra": parseInt(entrada[3]),
      "ivacompra": parseInt(entrada[4]),
      "precio_venta": parseInt(entrada[5]),
    };

    $.ajax({
      method: "PUT",
      contentType: "application/json",
      dataType: "json",
      url: PRODUCT_ENDPOINT + "actualizar",
      data: JSON.stringify(data),
      success: function () {
        listaItems[i][6] = "Cargado con exito";
      },
    })
    .fail(function (jqXHR, textStatus) {
      if(jqXHR.status == 400){
        listaItems[i][6] = jqXHR.responseText;
      } else {
        listaItems[i][6] = "Ha ocurrido un error";
      }  
    })
    .always( function(){
      updatePreview(listaItems);
    })
    ;}
    
});