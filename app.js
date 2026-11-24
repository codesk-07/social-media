const express = require('express');
const sequelize = require('./utils/db');
const path = require('path');

// Import models and associations
require('./models/associations');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to Social Media App');
});


const postRoutes = require('./routes/postRoute');
app.use('/api/posts', postRoutes);


const commentRoutes = require('./routes/commentRoute');
app.use('/api/posts', commentRoutes);

// Database connection and server startup
sequelize.sync()
    .then(() => {
        console.log('Tables created successfully');

        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((err) => {
        console.log('Database sync error:', err);
    });