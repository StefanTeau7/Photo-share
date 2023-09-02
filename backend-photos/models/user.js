const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: String,
    favorites: [String],
    collections: [{
        name: String,
        images: [String]
    }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
