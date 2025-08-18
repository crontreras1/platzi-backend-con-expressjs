require('dotenv').config();
const express = require('express');
const app = express(); 

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>Backend con expressJs</h1>
    <p>Este es el primer backend que estoy creando 😊</p>
    <p>Corre en el puerto: ${ PORT }</p>
    <p>Funciona!!</p>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor: http://localhost:${ PORT }`); 
}); 