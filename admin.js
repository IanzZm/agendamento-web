function formatarData(isoString) {
  const [ano, mes, dia] = isoString.split("-");
  return `${dia}/${mes}/${ano}`;
}

document.addEventListener('DOMContentLoaded', function () {
  fetch("http://localhost:3000/agendamentos")
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
        linha.innerHTML = `<td colspan="6">Nenhum agendamento encontrado.</td>`;
        corpoTabela.appendChild(linha);
        return;
      }

      dados.forEach(item => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
          <td>${item.nome}</td>
          <td>${item.medico || "—"}</td>
          <td>${formatarData(item.data)}</td>
          <td>${item.horario}</td>
          <td>${item.convenio}</td>
          <td>
            <button class="btn-excluir" 
                    data-medico="${item.medico}" 
                    data-data="${item.data}" 
                    data-horario="${item.horario}">
              Excluir
            </button>
          </td>
        `;
        corpoTabela.appendChild(linha);
      });

      // 🔁 Event listener para exclusão
      document.querySelectorAll('.btn-excluir').forEach(botao => {
        botao.addEventListener('click', () => {
          const medico = botao.dataset.medico;
          const data = botao.dataset.data;
          const horario = botao.dataset.horario;

          if (!confirm(`Deseja excluir o agendamento de ${medico} em ${data} às ${horario}?`)) return;

          fetch("http://localhost:3000/agendamentos", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ medico, data, horario })
          })
          .then(res => res.json())
          .then(res => {
            alert(res.mensagem);
            location.reload(); // recarrega a tabela após exclusão
          })
          .catch(err => {
            alert("Erro ao excluir agendamento.");
            console.error(err);
          });
        });
      });
    })
    .catch(err => {
      console.error("Erro ao carregar agendamentos:", err);
      alert("Erro ao buscar agendamentos. Verifique se o servidor está rodando.");
    });
});
