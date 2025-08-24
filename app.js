require('dotenv').config();
const express = require('express');
// const bodyParser = require('body-parser');

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

app.listen(PORT, () => {
  console.log(`Servidor: http://localhost:${ PORT }`); 
}); 