

$(document).on("click", "#login_button", function(){
    $.ajax({
        method: "POST",
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "text",
        url: LOGIN_ENDPOINT,
        data: jQuery.param({ user: $("#username").val(), password: $("#password").val()}),
        success: function(result){
            let response = $.parseJSON(result);
            sessionStorage.setItem("active_sesion", true);
            sessionStorage.setItem("sesion_user", response["usuario"]);
            sessionStorage.setItem("sesion_token", response["token"]);
            sessionStorage.setItem("sesion_id", response["cedula_usuario"]);
            window.location.href = "/index.html";
            }
    }).fail(function(jqXHR, textStatus) {
        failure_handler(jqXHR, textStatus);
  })
});