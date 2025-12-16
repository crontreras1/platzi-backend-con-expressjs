require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// const bodyParser = require('body-parser');

const loggerMiddleware = require('./middlewares/logger'); 
const errorHandler = require('./middlewares/errorHandler');
const { validateUser } = require('./utils/validation');
const authenticateToken = require('./middlewares/auth');

const fs = require('fs');
const path = require('path');
const { error } = require('console');
const usersFilePath = path.join(__dirname, 'users.json');

const app = express(); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use(errorHandler);

const PORT = process.env.PORT || 51214;

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
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error con conexión de datos' });
    };

    const users = JSON.parse(data); 
    res.json(users); 
  });
});

app.post('/users', (req, res) => {
  const newUser = req.body; 

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error en conexión de datos' });
    };

    const users = JSON.parse(data);

    const validation = validateUser(newUser, users);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.error });
    };

    users.push(newUser); 

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
      if (err) {
        return res.status(500).json({ error: 'Error al guardar usuario' });
      };

      res.status(201).json(newUser); 
    });
  });
});

app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10); // El 10 representa la base numérica en decimales
  const updatedUser = req.body;

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error de conexión de datos' });
    }; 
    
    let users = JSON.parse(data); 

    const validation = validateUser(updatedUser, users);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.error });
    };

    users = users.map(user => user.id === userId ? {...user, ...updatedUser} : user);

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
      if (err) {
        return res.status(500).json({ error: 'Error al actualizar usuario' });
      };

      res.json(updatedUser);
    });
  });
});

app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);

  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error con conexión de datos' });
    };

    let users = JSON.parse(data);
    users = users.filter(user => user.id !== userId);

    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
      if (err) {
        return res.status(500).json({ error: 'Error al eliminar usuario' });
      }

      res.status(204).send();
    });
  });
});

app.get('/error', (req, res, next) => {
  next(new Error('Error intencional XO')); 
})

app.get('/protected-route', authenticateToken, (req, res) => {
  res,send('Esta es una ruta protegida');
});

app.get('/db-users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al comunicarse con la Base de Datos' });
  }
})

app.listen(PORT, () => {
  console.log(`Servidor: http://localhost:${ PORT }`); 
}); 