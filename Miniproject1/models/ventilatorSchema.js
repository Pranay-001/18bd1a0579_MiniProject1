const mongoose = require('mongoose')

var ventilatorSchema = mongoose.Schema({
    hId: {
        type: String,
        require: true
    },
    ventilatorId: {
        type: String,
        require: true
    },

    status: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    }

});

module.exports = mongoose.model('Ventilator', ventilatorSchema);