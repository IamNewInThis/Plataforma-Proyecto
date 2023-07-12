const mongoose = require('mongoose');


const seguimientoSchema = mongoose.Schema({
    codigo_seguimiento: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
})

module.exports = mongoose.model('seguimiento', seguimientoSchema);