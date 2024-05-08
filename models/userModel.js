const mongoose = require('mongoose');
const userScheme = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide username']
    },
    email: {
        type: String,
        required: [true, 'Please provide user email'],
        unique: [true, 'Email is already in use'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    }

}, { timestamps: true });

module.exports = mongoose.model('User', userScheme)