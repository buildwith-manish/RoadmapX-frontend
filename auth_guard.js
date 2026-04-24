(async function () {
  const token = localStorage.getItem("rx_token");
  const user  = localStorage.getItem("rx_user");

  if (!token || !user) {
    window.location.replace("login.html");
  }
  // No server check — localStorage is the source of truth
  // since cross-domain cookies are blocked by the browser
})();
