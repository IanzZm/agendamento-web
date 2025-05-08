document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    const erro = document.getElementById('erro');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const usuario = document.getElementById('usuario').value;
      const senha = document.getElementById('senha').value;
  
      if (usuario === 'usuario' && senha === 'senha') {
        window.location.href = 'agendar.html';
      } else {
        erro.style.display = 'block';
      }
    });
  });
  