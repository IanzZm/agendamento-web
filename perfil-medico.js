document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const medicoParam = urlParams.get('medico');

  const medicos = {
    "joao-silva": {
      nome: "Dr. João Silva",
      especialidade: "Cardiologista",
      descricao: "Atende há mais de 15 anos com foco em saúde preventiva.",
      imagem: "img/medicos/dr-joao-silva.png"
    },
    "ana-costa": {
      nome: "Dra. Ana Costa",
      especialidade: "Dermatologista",
      descricao: "Especialista em dermatologia clínica e estética.",
      imagem: "img/medicos/dra-ana-costa.png"
    },
    "pedro-lima": {
      nome: "Dr. Pedro Lima",
      especialidade: "Ortopedista",
      descricao: "Focado em reabilitação e ortopedia esportiva.",
      imagem: "img/medicos/dr-pedro-lima.png"
    }
  };

  const medico = medicos[medicoParam];

  if (medico) {
    document.getElementById('nome-medico').textContent = medico.nome;
    document.getElementById('especialidade').textContent = medico.especialidade;
    document.getElementById('descricao').textContent = medico.descricao;
    document.getElementById('imagem-medico').src = medico.imagem;
    document.getElementById('imagem-medico').alt = `Foto de ${medico.nome}`;
  } else {
    document.querySelector('.perfil-medico').innerHTML = "<p>Médico não encontrado.</p>";
  }
});
