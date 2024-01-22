const mongoose = require('mongoose');
const Schima = mongoose.Schema;

const personSchima = new Schima({

    
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }


});


module.exports = mongoose.model('Persons', personSchima, 'Persons')