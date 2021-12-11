const SEDE = "Bogotá"
const ENDPOINT = "http://localhost:8888/";
const CUSTOMERS_ENDPOINT = ENDPOINT + "clientes/"
const VENTAS_ENDPOINT = ENDPOINT + "ventas/"
const DETALLES_ENDPOINT = ENDPOINT + "detalleventas/"
const LOGIN_ENDPOINT = ENDPOINT + "usuarios/login"
const PRODUCT_ENDPOINT = ENDPOINT + "productos/"
const SUPPLIER_ENDPOINT = ENDPOINT + "proveedores/"
var current_user = sessionStorage.getItem("sesion_user")

$.get("navigation.html", function(data){
    $("#nav-placeholder").replaceWith(data);
});

$.get("footer.html", function(data){
    $("#footer-placeholder").replaceWith(data);
});

$(document).on("click", "#btn_cerrar_sesion", function(){
    closeSession()  
});

function closeSession(){
    sessionStorage.setItem("active_sesion", false);
    sessionStorage.setItem("sesion_user", null);
    sessionStorage.setItem("sesion_token", null);
    window.location.href = "/login.html"
}

function failure_handler(jqXHR, textStatus){
    if(jqXHR.status == 404){
        alert("No se encontró registros" + "\n" + textStatus + ": " + jqXHR.status);
    } else if(jqXHR.status == 400){
        alert(jqXHR.responseText + "\n" + textStatus + ": " + jqXHR.status);
    } else if(jqXHR.status == 500){
        alert("Revise los campos" + "\n" + textStatus + ": " + jqXHR.status);
    } else if(jqXHR.status == 403){
        closeSession()
    }
}

