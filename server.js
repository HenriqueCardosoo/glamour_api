const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); // Declaração de app deve vir antes de usá-lo

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com o MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'henrique',
  database: 'ecommerce'
});

// Rota de registro
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  connection.query(query, [username, email, password], (err, results) => {
    if (err) {
      console.error('Erro ao registrar usuário:', err);
      return res.status(500).send('Erro ao registrar usuário');
    }

    console.log('Usuário registrado:', { id: results.insertId, username, email });
    res.status(201).send('Usuário registrado com sucesso!');
  });
});

// Rota de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Query para verificar se o usuário existe
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  connection.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Erro ao fazer login:', err);
      return res.status(500).send('Erro ao fazer login');
    }

    if (results.length > 0) {
      // Se o usuário foi encontrado
      res.status(200).send('Login bem-sucedido');
    } else {
      // Se o usuário não foi encontrado
      res.status(401).send('Credenciais inválidas');
    }
  });
});

// Iniciar o servidor
const port = 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
