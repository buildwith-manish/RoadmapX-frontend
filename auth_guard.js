(function () {
  if (!localStorage.getItem("rx_token")) {
    window.location.replace("login.html");
  }
})();
