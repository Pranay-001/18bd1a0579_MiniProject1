const mongoose = require('mongoose')

const HospitalSchema = new mongoose.Schema({

    hId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Hospital', HospitalSchema);