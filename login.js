document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const erro = document.getElementById('erro');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: usuario, senha }) // aqui email = campo "usuario"
    })
      .then(res => {
        if (res.status === 401) {
          erro.style.display = 'block';
          return;
        }
        if (!res.ok) {
          throw new Error("Erro ao fazer login.");
        }
        return res.json();
      })
      .then(data => {
        if (!data) return;

        localStorage.setItem("usuarioLogado", JSON.stringify(data.usuario));
        window.location.href = "agendar.html"; // redireciona se login for válido
      })
      .catch(err => {
        alert("Erro ao fazer login.");
        console.error(err);
      });
  });
});
