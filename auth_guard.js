(async function () {
  const token = localStorage.getItem("rx_token");
  const user  = localStorage.getItem("rx_user");

  if (!token || !user) {
    window.location.replace("login.html");
    return;
  }

  try {
    const res  = await fetch("https://roadmapx-backend-3qmc.onrender.com/me", {
      credentials: "include"
    });
    const data = await res.json();

    if (data.success) {
      localStorage.setItem("rx_token", "true");
      localStorage.setItem("rx_user",  data.username);
    } else {
      localStorage.removeItem("rx_token");
      localStorage.removeItem("rx_user");
      window.location.replace("login.html");
    }
  } catch (e) {
    if (!localStorage.getItem("rx_token")) {
      window.location.replace("login.html");
    }
  }
})();
