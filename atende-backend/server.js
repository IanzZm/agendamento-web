const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Caminhos dos "bancos" simulados
const caminhoMedicos = path.join(__dirname, 'data', 'medicos.json');
const caminhoAgendamentos = path.join(__dirname, 'data', 'agendamentos.json');

// Rota: listar médicos
app.get('/medicos', (req, res) => {
  fs.readFile(caminhoMedicos, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erro ao ler médicos.');
    res.json(JSON.parse(data));
  });
});
// Rota: listar agendamentos
app.get('/agendamentos', (req, res) => {
  fs.readFile(caminhoAgendamentos, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erro ao ler agendamentos.');
    res.json(JSON.parse(data));
  });
});

// Rota: salvar novo agendamento
app.post('/agendamentos', (req, res) => {
  const novoAgendamento = req.body;

  fs.readFile(caminhoAgendamentos, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erro ao ler agendamentos.');

    const agendamentos = JSON.parse(data);
    agendamentos.push(novoAgendamento);

    fs.writeFile(caminhoAgendamentos, JSON.stringify(agendamentos, null, 2), (err) => {
      if (err) return res.status(500).send('Erro ao salvar agendamento.');
      res.status(201).json({ mensagem: 'Agendamento salvo com sucesso!' });
    });
  });
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
