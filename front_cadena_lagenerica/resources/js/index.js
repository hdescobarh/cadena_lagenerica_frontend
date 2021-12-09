const ENDPOINT = "http://localhost:8888/";

$.get("navigation.html", function(data){
    $("#nav-placeholder").replaceWith(data);
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

