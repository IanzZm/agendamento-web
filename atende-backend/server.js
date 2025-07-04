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
const caminhoUsuarios = path.join(__dirname, 'data', 'usuarios.json');

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

// Rota: salvar novo agendamento com verificação de conflito
app.post('/agendamentos', (req, res) => {
  const novoAgendamento = req.body;

  fs.readFile(caminhoAgendamentos, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erro ao ler agendamentos.');
    const agendamentos = JSON.parse(data);

    const conflito = agendamentos.find(a =>
      a.medico === novoAgendamento.medico &&
      a.data === novoAgendamento.data &&
      a.horario === novoAgendamento.horario
    );

    if (conflito) {
      return res.status(409).json({ mensagem: 'Este horário já está reservado para o médico selecionado.' });
    }

    agendamentos.push(novoAgendamento);
    fs.writeFile(caminhoAgendamentos, JSON.stringify(agendamentos, null, 2), (err) => {
      if (err) return res.status(500).send('Erro ao salvar agendamento.');
      res.status(201).json({ mensagem: 'Agendamento salvo com sucesso!' });
    });
  });
});

// Rota: excluir agendamento (baseado em médico, data e horário)
app.delete('/agendamentos', (req, res) => {
  const { medico, data, horario } = req.body;

  fs.readFile(caminhoAgendamentos, 'utf8', (err, dataJson) => {
    if (err) return res.status(500).send('Erro ao ler agendamentos.');

    let agendamentos = JSON.parse(dataJson);
    const antes = agendamentos.length;

    agendamentos = agendamentos.filter(a =>
      !(a.medico === medico && a.data === data && a.horario === horario)
    );

    if (agendamentos.length === antes) {
      return res.status(404).json({ mensagem: 'Agendamento não encontrado.' });
    }

    fs.writeFile(caminhoAgendamentos, JSON.stringify(agendamentos, null, 2), (err) => {
      if (err) return res.status(500).send('Erro ao salvar agendamentos.');
      res.status(200).json({ mensagem: 'Agendamento excluído com sucesso.' });
    });
  });
});

// Rota: cadastrar novo usuário
app.post('/usuarios', (req, res) => {
  const novoUsuario = req.body;

  fs.readFile(caminhoUsuarios, 'utf8', (err, data) => {
    const usuarios = data ? JSON.parse(data) : [];

    const jaExiste = usuarios.find(u => u.email === novoUsuario.email);
    if (jaExiste) {
      return res.status(409).json({ mensagem: 'E-mail já cadastrado.' });
    }

    usuarios.push(novoUsuario);
    fs.writeFile(caminhoUsuarios, JSON.stringify(usuarios, null, 2), (err) => {
      if (err) return res.status(500).send('Erro ao salvar usuário.');
      res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso.' });
    });
  });
});

// Rota: login de usuário
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  fs.readFile(caminhoUsuarios, 'utf8', (err, data) => {
    const usuarios = data ? JSON.parse(data) : [];

    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    res.status(200).json({ mensagem: 'Login bem-sucedido.', usuario });
  });
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
