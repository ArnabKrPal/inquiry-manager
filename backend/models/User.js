const mongoose = require('mongoose');

// This defines the exact structure of a user account in your database
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // Prevents two people from using the same email
    },
    password: {
        type: String,
        required: true
    }
});

// We export it so the server can use it
module.exports = mongoose.model('User', userSchema);