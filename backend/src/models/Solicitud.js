const mongoose = require('mongoose');

const solicitudSchema = mongoose.Schema({
  sucursal: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  idBoleta: {
    type: String,
    required: true
  },
  productos: [{
    nombre: {
      type: String,
      required: true,
      minlength: 6
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1
    }
  }]
});

module.exports = mongoose.model('Solicitudes', solicitudSchema);
