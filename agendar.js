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

    const selectMedico = document.getElementById("medico");

    const dados = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      convenio: inputConvenio.disabled ? "Não possui" : inputConvenio.value,
      data: document.getElementById('data').value,
      horario: document.getElementById('horario').value,
      medico: document.getElementById('medico').value,
      idMedico: selectMedico.selectedOptions[0].dataset.id
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

    // Lógica para atualizar horários disponíveis
  const horariosPadrao = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  document.getElementById('medico').addEventListener('change', atualizarHorariosDisponiveis);
  document.getElementById('data').addEventListener('change', atualizarHorariosDisponiveis);

  function atualizarHorariosDisponiveis() {
    const medico = document.getElementById('medico').value;
    const data = document.getElementById('data').value;
    const selectHorario = document.getElementById('horario');

    if (!medico || !data) return;

    fetch('http://localhost:3000/agendamentos')
      .then(res => res.json())
      .then(agendamentos => {
        const horariosIndisponiveis = agendamentos
          .filter(a => a.medico === medico && a.data === data)
          .map(a => a.horario);

        selectHorario.innerHTML = "";

        horariosPadrao.forEach(horario => {
          if (!horariosIndisponiveis.includes(horario)) {
            const option = document.createElement('option');
            option.value = horario;
            option.textContent = horario;
            selectHorario.appendChild(option);
          }
        });

        if (selectHorario.options.length === 0) {
          const option = document.createElement('option');
          option.textContent = "Nenhum horário disponível";
          option.disabled = true;
          selectHorario.appendChild(option);
        }
      });
  }

});
