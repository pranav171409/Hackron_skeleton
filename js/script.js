const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-menu");

toggle.onclick = () => {
  nav.classList.toggle("open");
};

document.getElementById("login-btn").onclick =
document.getElementById("hero-login").onclick = () => {
  window.location.href = "auth.html"; // change accordingly
};
