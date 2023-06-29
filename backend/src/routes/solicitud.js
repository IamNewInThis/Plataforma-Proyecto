const express = require('express');
const router = express.Router();
const verifyToken = require('./validate-token');
const Solicitud = require('../models/Solicitud');

// Obtener todas las solicitudes de productos
router.get('/', verifyToken, async (req, res) => {
  try {
    const solicitudes = await Solicitud.find();
    res.json(solicitudes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las solicitudes' });
  }
});

// Crear una nueva solicitud de producto
router.post('/', verifyToken, async (req, res) => {
  const { sucursal, productos } = req.body;

  try {
    const solicitud = new Solicitud({ sucursal, productos });
    await solicitud.save();
    res.json({ message: 'Solicitud creada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la solicitud' });
  }
});

// Obtener una solicitud de producto por su ID
router.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const solicitud = await Solicitud.findById(id);
    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }
    res.json(solicitud);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la solicitud' });
  }
});

// Actualizar una solicitud de producto por su ID
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { sucursal, productos } = req.body;

  try {
    const solicitud = await Solicitud.findByIdAndUpdate(id, { sucursal, productos }, { new: true });
    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }
    res.json({ message: 'Solicitud actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la solicitud' });
  }
});

// Eliminar una solicitud de producto por su ID
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const solicitud = await Solicitud.findByIdAndRemove(id);
    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }
    res.json({ message: 'Solicitud eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la solicitud' });
  }
});

module.exports = router;
