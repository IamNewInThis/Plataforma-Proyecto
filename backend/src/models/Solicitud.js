const mongoose = require('mongoose');

const solicitudSchema = new mongoose.Schema({
  boletas: [{
    fechaBoleta: {
      type: String,
      required: true
    },
    idBoleta: {
      type: String,
      required: true
    },
    productos: {
      type: String,
      required: true
    },
    sucursal: {
      type: String,
      required: true
    }
  }]
});

const Solicitudes = mongoose.model('Solicitudes', solicitudSchema);

module.exports = Solicitudes;
