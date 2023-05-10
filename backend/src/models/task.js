const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    nombre: {type: String, required: true},
    precio: {type: Number, required: true, default:0},
    marca: {type: String, required: true},
    stock:{type: Number, required: true , default:0},
    imagen:{type: String, required: true},
    categoria: {type: String, required : true},
    subcategoria:{type: String, requeried: true}
});

const categoria = new Schema({

    nombre: {type: String, required: true},
});

module.exports = mongoose.model('Task', TaskSchema);