const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: String,
    favorites: [{
        type: mongoose.Schema.Types.Mixed,
        default: []
    }]
    });

const User = mongoose.model('User', userSchema);

module.exports = User;
