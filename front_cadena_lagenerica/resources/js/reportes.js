
// Reporte usuarios

$(document).on("click", "#btn_reportes_usuarios", function() {
    $("#reporte_actual").html(
       "<h2>Listado de usuarios</h2>\
       <table>\
        <thead>\
            <tr>\
                <td>Cédula</td>\
                <td>Nombre</td>\
                <td>Correo electrónico</td>\
                <td>Usuario</td>\
                <td>Password</td>\
            </tr>\
        </thead>\
        <tbody>\
        </tbody>\
    </table>"
    );
    $.ajax({
        contentType: "application/json",
        dataType: "json",
        url: ENDPOINT + "usuarios/listar",
        success: function(result){
            l = result._embedded.userList
            $.each(l, function(){
                $("tbody").append( 
                    "<tr>\
                            <td>"+ $(this)[0]["cedula_usuario"] +"</td>\
                            <td>"+  $(this)[0]["nombre_usuario"] +"</td>\
                            <td>"+ $(this)[0]["email_usuario"] +"</td>\
                            <td>"+ $(this)[0]["usuario"] +"</td>\
                            <td>"+ $(this)[0]["password"] +"</td>\
                        </tr>"
                )
            });}
        })
});


// Reporte clientes

$(document).on("click", "#btn_reportes_clientes", function() {
    $("#reporte_actual").html(
        "<h2>Listado de clientes</h2>\
        <table>\
            <thead>\
                <tr>\
                    <td>Cédula</td>\
                    <td>Nombre</td>\
                    <td>Correo electrónico</td>\
                    <td>Dirección</td>\
                    <td>Teléfono</td>\
                </tr>\
            </thead>\
            <tbody>\
            </tbody>\
        </table>"
     );
     $.ajax({
         contentType: "application/json",
         dataType: "json",
         url: ENDPOINT + "clientes/listar",
         success: function(result){
             l = result._embedded.customerList
             $.each(l, function(){
                 $("tbody").append( 
                     "<tr>\
                             <td>"+ $(this)[0]["cedula_cliente"] +"</td>\
                             <td>"+  $(this)[0]["nombre_cliente"] +"</td>\
                             <td>"+ $(this)[0]["email_cliente"] +"</td>\
                             <td>"+ $(this)[0]["direccion_cliente"] +"</td>\
                             <td>"+ $(this)[0]["telefono_cliente"] +"</td>\
                         </tr>"
                 )
             });}
         })
});


// Reporte ventas por cliente

$(document).on("click", "#btn_reportes_ventas_cliente", function() {
    $("#reporte_actual").html(
        "<h2>Total de ventas por cliente</h2>\
        <table>\
            <thead>\
                <tr>\
                    <td>Cédula</td>\
                    <td>Nombre</td>\
                    <td>Valor total ventas</td>\
                </tr>\
            </thead>\
            <tbody>\
            </tbody>\
            <tfoot>\
                <tr>\
                    <td colspan='2'>Total ventas</td>\
                    <td>0000</td>\
                </tr>\
            </tfoot>\
        </table>"
     );
     $.ajax({
         contentType: "application/json",
         dataType: "json",
         url: ENDPOINT + "ventas/listar",
         success: function(result){
             myList = result._embedded.saleList;
             mydict = {};
             $.each(myList, function(){
                 var key = $(this)[0]["cedula_cliente"];
                 if(key in mydict){
                     mydict[key][1] = mydict[key][1] + $(this)[0]["total_venta"]
                 } else {
                     mydict[key] = [$(this)[0]["nombre_cliente"], $(this)[0]["total_venta"]]
                 }              
             });
             for (const [key, value] of Object.entries(mydict)) {
             $("tbody").append( 
                "<tr>\
                        <td>"+ key +"</td>\
                        <td>"+  value[0] +"</td>\
                        <td>"+ value[1] +"</td>\
                    </tr>"
            )}
            ;}
        })
    });