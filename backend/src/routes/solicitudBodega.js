const express = require('express');
const router = express.Router();
const verifyToken = require('./validate-token');
const Solicitud = require('../models/bodegaSolicitud');


// Obtener todas las solicitudes de productos
router.get('/', verifyToken, async (req, res) => {
    try {
        const solicitudes = await Solicitud.find();
        res.json(solicitudes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las solicitudes' });
    }
});

router.post('/create', verifyToken, async (req, res) => {
    const { name, cantidad } = req.body;

    console.log(req.body); // Agrega esta línea para verificar los valores recibidos

    try {
        const solicitud = new Solicitud({ name, cantidad: parseInt(cantidad) });
        await solicitud.save();
        res.json({ message: 'Solicitud creada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la solicitud' });
    }
});


module.exports = router;