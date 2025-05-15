document.addEventListener('DOMContentLoaded', function () {
  // Gerar o menu suspenso com os médicos
  const nomes = document.querySelectorAll('#medicos .card h3');
  const menu = document.getElementById('menuMedicos');

  nomes.forEach(medico => {
    const li = document.createElement('li');
    li.textContent = medico.textContent;
    menu.appendChild(li);
  });

  // Ativar o menu hambúrguer
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  }
});
