var today = new Date();
var current_date_id = parseInt("" + today.getFullYear() + today.getMonth() + today.getDate());

// envia actualización al consolidado de la sede principal
function updateConsolidate(nueva_venta) {
    data = {
        "ciudad": SEDE_REF,
        "id": current_date_id,
        "total_ventas": Number(nueva_venta)
    }
    $.ajax({
        method: "PUT",
        contentType: "application/json",
        dataType: "json",
        url: ENDPOINT_PRINCIPAL + "consolidado/actualizar",
        data: JSON.stringify(data),
        success: function () {
        }
    }).fail(function (jqXHR, textStatus) {
        failure_handler(jqXHR, textStatus);
    });
}

// Reporte ventas por cliente

$(document).on("click", "#btn_reportes_consolidado", function () {
    $("#reporte_actual").html(
        "<h2>Consolidado</h2>\
            <table>\
                <thead>\
                    <tr>\
                        <td>Sucursal</td>\
                        <td>Código de consolidado</td>\
                        <td>Total ventas</td>\
                    </tr>\
                </thead>\
                <tbody>\
                </tbody>\
            </table>"
    );
    $.ajax({
        contentType: "application/json",
        dataType: "json",
        url: ENDPOINT_PRINCIPAL + "consolidado/listar",
        success: function (result) {
            myList = result._embedded.consolidatedList;
            mydict = {};
            $.each(myList, function () {
                $("tbody").append(
                    "<tr>\
                                <td>"+ $(this)[0]["ciudad"] + "</td>\
                                <td>"+ $(this)[0]["id"] + "</td>\
                                <td>"+ $(this)[0]["total_ventas"] + "</td>\
                            </tr>"
                )
            });
            ;
        }
    })
});