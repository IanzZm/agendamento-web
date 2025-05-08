document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginAdminForm');
  const erro = document.getElementById('adminErro');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const usuario = document.getElementById('adminUsuario').value;
    const senha = document.getElementById('adminSenha').value;

    if (usuario === 'admin' && senha === 'consultorio123') {
      window.location.href = 'admin.html';
    } else {
      erro.style.display = 'block';
    }
  });
});
