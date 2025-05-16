document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form');
  const checkbox = document.getElementById('semConvenio');
  const inputConvenio = document.getElementById('convenio');

  checkbox.addEventListener('change', function () {
    inputConvenio.disabled = this.checked;
    if (this.checked) inputConvenio.value = '';
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const dados = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      convenio: inputConvenio.disabled ? "Não possui" : inputConvenio.value,
      data: document.getElementById('data').value,
      horario: document.getElementById('horario').value
    };

    fetch("http://localhost:3000/agendamentos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dados)
    })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao salvar");
      return res.json();
    })
    .then(() => {
      window.location.href = "confirmado.html";
    })
    .catch(err => {
      alert("Erro ao agendar. Verifique sua conexão com o servidor.");
      console.error(err);
    });
  });
});
