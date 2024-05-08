const mongoose = require('mongoose');
const contactScheme = mongoose.Schema({
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please provide contact name']
    },
    email: {
        type: String,
        required: [true, 'Please provide contact email']
    },
    mobile: {
        type: String,
        required: [true, 'Please provide contact mobile number']
    }
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactScheme)