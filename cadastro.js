document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('cadastroForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const dados = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      usuario: document.getElementById("novoUsuario").value,
      senha: document.getElementById("novaSenha").value
    };

    fetch("http://localhost:3000/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    })
      .then(res => {
        if (res.status === 409) {
          alert("E-mail já cadastrado.");
          return;
        }
        if (!res.ok) {
          throw new Error("Erro ao cadastrar.");
        }
        return res.json();
      })
      .then(data => {
        alert(data.mensagem);
        window.location.href = "login.html"; // ajuste se for outro nome
      })
      .catch(err => {
        alert("Erro ao cadastrar.");
        console.error(err);
      });
  });
});
