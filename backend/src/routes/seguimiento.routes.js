const express = require('express');
const router = express.Router();
const verifyToken = require('./validate-token');
const Seguimiento = require('../models/seguimiento');

router.get('/', verifyToken, async (req, res) => {
  try {
    const seguimientos = await Seguimiento.find();
    res.json(seguimientos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los seguimientos' });
  }
});

// Crear una nuevo codigo de seguimiento
router.post('/create', verifyToken, async (req, res) => {
  const seguimientoData = req.body;

  console.log(req.body); // Agrega esta línea para verificar los valores recibidos

  try {
    const seguimiento = new Seguimiento(seguimientoData);
    await seguimiento.save();
    res.json({ message: 'Seguimiento creado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el seguimiento' });
    console.log(error)
  }
});

module.exports = router;
