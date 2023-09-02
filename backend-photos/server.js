const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const User = require('./models/user');

const mongoURI = 'mongodb://localhost:27017/sharephotos';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('API is working');
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

app.get('/users/:userId/favorites', async (req, res) => {
    try {
        const { userId } = req.params;

        // Fetch the user from the database using the userId
        const user = await User.findOne({ userId: userId });

        // If the user isn't found, respond with a 404 status
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Return the user's favorite images
        res.json({ success: true, favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


app.post('/users/:userId/favorites', async (req, res) => {
    try {
        const { userId } = req.params;
        const { images } = req.body;

        let user = await User.findOne({ userId: userId });

        if (!user) {
            user = new User({ userId, favorites: [] });
        }

        user.favorites.push(...images);

        await user.save();
        res.json({ success: true, message: 'Favorite saved successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


