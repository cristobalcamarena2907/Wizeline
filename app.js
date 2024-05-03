const express = require('express');
const app = express();
const { Pool } = require('pg');
const config = require('./config');
const bodyParser = require('body-parser');
app.use(bodyParser.json());



const pool = new Pool(config);

app.use(express.static('public'));

//WHERE "contentType" LIKE \'T%\'
app.get('/textTools', (req, res) => {
    pool.query('SELECT "toolName", "IdTool", "toolDescription", "referenceUrl", "freeVersionOption", "paidVersionOption" FROM tools', (err, result) => {
      if (err) {
        console.error('Error al ejecutar consulta:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        const datos = result.rows;
        res.send(datos); // Envía los datos como respuesta JSON
      }
    });
});

// POST
app.post('/textTools', (req, res) => {
  const { toolName, toolDescription, referenceUrl, freeVersionOption, paidVersionOption } = req.body;

  // Aquí deberías tener la lógica para agregar la nueva herramienta a tu base de datos, usando pool.query o algún ORM si lo estás utilizando

  // Ejemplo de inserción de datos en la base de datos usando pool.query:
  pool.query('INSERT INTO tools ("toolName", "toolDescription", "referenceUrl", "freeVersionOption", "paidVersionOption") VALUES ($1, $2, $3, $4, $5)', [toolName, toolDescription, referenceUrl, freeVersionOption, paidVersionOption], (err, result) => {
    if (err) {
      console.error('Error al insertar herramienta de texto:', err);
      res.status(500).json({ error: 'Error interno del servidor al insertar herramienta de texto' });
    } else {
      res.status(201).json({ message: 'Herramienta de texto agregada exitosamente' });
    }
  });
});

// PUT
app.put('/textTools/:id', (req, res) => {
  const toolId = req.params.id;
  const { toolName, toolDescription, referenceUrl, freeVersionOption, paidVersionOption } = req.body;

  // Aquí deberías tener la lógica para actualizar la herramienta con el ID proporcionado en tu base de datos, usando pool.query o algún ORM si lo estás utilizando

  // Ejemplo de actualización de datos en la base de datos usando pool.query:
  pool.query('UPDATE tools SET "toolName" = $1, "toolDescription" = $2, "referenceUrl" = $3, "freeVersionOption" = $4, "paidVersionOption" = $5 WHERE "IdTool" = $6', [toolName, toolDescription, referenceUrl, freeVersionOption, paidVersionOption, toolId], (err, result) => {
    if (err) {
      console.error('Error al actualizar herramienta de texto:', err);
      res.status(500).json({ error: 'Error interno del servidor al actualizar herramienta de texto' });
    } else {
      res.status(200).json({ message: `Herramienta de texto con ID ${toolId} actualizada exitosamente` });
    }
  });
});

// DELETE
app.delete('/textTools/:id', (req, res) => {
  const toolId = req.params.id;

  // Aquí deberías tener la lógica para eliminar la herramienta con el ID proporcionado de tu base de datos, usando pool.query o algún ORM si lo estás utilizando

  // Ejemplo de eliminación de datos en la base de datos usando pool.query:
  pool.query('DELETE FROM tools WHERE "IdTool" = $1', [toolId], (err, result) => {
    if (err) {
      console.error('Error al eliminar herramienta de texto:', err);
      res.status(500).json({ error: 'Error interno del servidor al eliminar herramienta de texto' });
    } else {
      res.status(200).json({ message: `Herramienta de texto con ID ${toolId} eliminada exitosamente` });
    }
  });
});



/*
app.get('/videoTools', (req, res) => {
    pool.query('SELECT "toolName", "IdTool", "toolDescription", "referenceUrl" FROM tools WHERE "contentType" LIKE \'Vi%\'', (err, result) => {
      if (err) {
        console.error('Error al ejecutar consulta:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        const datos = result.rows;
        res.send(datos); // Envía los datos como respuesta JSON
      }
    });
});

app.get('/m&sTools', (req, res) => {
    pool.query('SELECT "toolName", "IdTool", "toolDescription", "referenceUrl" FROM tools WHERE "contentType" LIKE \'M%\' or "contentType" LIKE \'Vo%\'', (err, result) => {
      if (err) {
        console.error('Error al ejecutar consulta:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        const datos = result.rows;
        res.send(datos); // Envía los datos como respuesta JSON
      }
    });
});

app.get('/d&sTools', (req, res) => {
    pool.query('SELECT "toolName", "IdTool", "toolDescription", "referenceUrl" FROM tools', (err, result) => {
      if (err) {
        console.error('Error al ejecutar consulta:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        const datos = result.rows;
        res.send(datos); // Envía los datos como respuesta JSON
      }
    });
});

app.get('/vecDbTools', (req, res) => {
    pool.query('SELECT "toolName", "IdTool", "toolDescription", "referenceUrl" FROM tools', (err, result) => {
      if (err) {
        console.error('Error al ejecutar consulta:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        const datos = result.rows;
        res.send(datos); // Envía los datos como respuesta JSON
      }
    });
});

app.get('/imageTools', (req, res) => {
    pool.query('SELECT "toolName", "IdTool", "toolDescription", "referenceUrl" FROM tools WHERE "contentType" LIKE \'I%\'', (err, result) => {
      if (err) {
        console.error('Error al ejecutar consulta:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        const datos = result.rows;
        res.send(datos); // Envía los datos como respuesta JSON
      }
    });
});

app.get('/speech&moreTools', (req, res) => {
    pool.query('SELECT "toolName", "IdTool", "toolDescription", "referenceUrl" FROM tools WHERE "generativeAiEcosystemLayer" LIKE \'I%\' or "IdTool" = 1028', (err, result) => {
      if (err) {
        console.error('Error al ejecutar consulta:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        const datos = result.rows;
        res.send(datos); // Envía los datos como respuesta JSON
      }
    });
});

app.get('/codeTools', (req, res) => {
    pool.query('SELECT "toolName", "IdTool", "toolDescription", "referenceUrl" FROM tools WHERE "contentType" LIKE \'C%\'', (err, result) => {
      if (err) {
        console.error('Error al ejecutar consulta:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        const datos = result.rows;
        res.send(datos); // Envía los datos como respuesta JSON
      }
    });
});

app.get('/game&VrTools', (req, res) => {
    pool.query('SELECT "toolName", "IdTool", "toolDescription", "referenceUrl" FROM tools WHERE "IdTool" = 1034', (err, result) => {
      if (err) {
        console.error('Error al ejecutar consulta:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        const datos = result.rows;
        res.send(datos); // Envía los datos como respuesta JSON
      }
    });
});
*/
module.exports = app;