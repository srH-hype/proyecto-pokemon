const mongoose = require('mongoose');

const entrenadorEsquema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pass:{
        type: String,
        required: true
    },
    pokemones: [Number]
});

module.exports = mongoose.model('entrenador', entrenadorEsquema);