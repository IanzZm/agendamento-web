document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cadastroForm');
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Usuário cadastrado com sucesso!');
      window.location.href = 'login.html';
    });
  });
  