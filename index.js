 document.addEventListener('DOMContentLoaded', function () {
  const nomes = document.querySelectorAll('#medicos .card h3');
  const menu = document.getElementById('menuMedicos');

  nomes.forEach(medico => {
    const li = document.createElement('li');
    li.textContent = medico.textContent;
    menu.appendChild(li);
  });
});