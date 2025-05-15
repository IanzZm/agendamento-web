document.addEventListener("DOMContentLoaded", function () {
  // Ativar o menu hambúrguer
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }
});
