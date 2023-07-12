const mongoose = require('mongoose');

const bodegaSolicitudSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4
  },
  cantidad: {
    type: Number,
    required: true,
    min: 1
  }
});

module.exports = mongoose.model('BodegaSolicitud', bodegaSolicitudSchema);
