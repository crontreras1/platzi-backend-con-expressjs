require('dotenv').config();
const express = require('express');
// const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, 'users.json');

const app = express(); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
// console.log(PORT)

app.get('/', (req, res) => {
  res.send(`
    <h1>Backend con expressJs</h1>
    <p>Este es el primer backend que estoy creando 😊</p>
    <p>Corre en el puerto: ${ PORT }</p>
    <p>Funciona!!</p>
  `);
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`Mostrar información del usuario ${ userId }`);
});

app.get('/search', (req, res) => {
  const terms = req.query.term || 'No especificado';
  const category = req.query.category || 'Todas';
  
  res.send(`
    <h2>Resultado de busqueda:</h2>
    <p>Termino: ${ terms }</p>
    <p>Categoría: ${ category }</p>
    <p>Funciona!!</p>
  `);
});

app.post('/form', (req, res) => {
  const name = req.body.name || 'Sin nombre'; 
  const email = req.body.email || 'No proporcionado';

  res.json({
    message: 'Datos recibidos',
    data: {
      name,
      email
    }
  });
});

app.post('/api/data', (req, res) => {
  const data = req.body;

  if(!data || Object.keys(data).length === 0) {
    return res.status(400).json({ error: 'No se recibiron datos' });
  };

  res.status(201).json({
    message: 'Datos JSON recibidos',
    data
  });
});

app.get('/users', (req, res) => {
  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error con conexión de datos' });
    };

    const users = JSON.parse(data); 
    res.json(users); 
  });
});

app.listen(PORT, () => {
  console.log(`Servidor: http://localhost:${ PORT }`); 
}); 