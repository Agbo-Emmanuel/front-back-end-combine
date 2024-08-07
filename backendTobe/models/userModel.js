const mongoose = require('mongoose');

const mySchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },

})

const myModel  = mongoose.model('User', mySchema)

module.exports = myModel


