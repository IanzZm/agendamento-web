document.addEventListener('DOMContentLoaded', function () {
  fetch("http://localhost:3000/agendamentos") // ou use 127.0.0.1 se preferir
    .then(res => {
      if (!res.ok) {
        throw new Error("Erro ao buscar agendamentos");
      }
      return res.json();
    })
    .then(dados => {
      // 🔽 Ordena os dados por data e horário (mais antigos primeiro)
      dados.sort((a, b) => {
        const dataA = new Date(`${a.data}T${a.horario}`);
        const dataB = new Date(`${b.data}T${b.horario}`);
        return dataA - dataB;
      });
      const corpoTabela = document.querySelector('.tabela-reservas tbody');
      corpoTabela.innerHTML = ''; // limpa qualquer conteúdo anterior

      if (dados.length === 0) {
        const linha = document.createElement('tr');
        linha.innerHTML = `<td colspan="5">Nenhum agendamento encontrado.</td>`;
        corpoTabela.appendChild(linha);
        return;
      }

      dados.forEach(item => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
          <td>${item.nome}</td>
          <td>${item.medico || "—"}</td>
          <td>${item.data}</td>
          <td>${item.horario}</td>
          <td>${item.convenio}</td>
        `;
        corpoTabela.appendChild(linha);
      });
    })
    .catch(err => {
      console.error("Erro ao carregar agendamentos:", err);
      alert("Erro ao buscar agendamentos. Verifique se o servidor está rodando.");
    });
});
