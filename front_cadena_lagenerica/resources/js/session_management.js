
if (!sessionStorage.getItem("active_sesion")) {
   window.location.href = "/login.html"
}

$.ajaxSetup({
   beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization',
      sessionStorage.getItem("sesion_token")
      );
   }
});