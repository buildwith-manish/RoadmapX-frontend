(async function () {
  try {
    const res = await fetch("https://roadmapx-backend-3qmc.onrender.com/me", {
      credentials: "include"
    });
    const data = await res.json();
    if (!data.success) {
      window.location.replace("login.html");
    }
  } catch (e) {
    window.location.replace("login.html");
  }
})();
