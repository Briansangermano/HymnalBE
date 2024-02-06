const mongoose = require('mongoose');

const himnoSchema = new mongoose.Schema({
  numero: Number,
  titulo: String,
  estrofas: Array,
  autor: String
});

module.exports = mongoose.model('Himno', himnoSchema);
