const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const authRoutes = require('./routes/auth.route');

const app = express();
app.use(express.json());


app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('Hello MongoDB!');
});

// Connect to DB and then start server
connectDB().then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`🚀Server running on http://localhost:${port}`);
    });
}).catch((err) => {
    console.error('❌ Failed to connect to MongoDB. Server not started.', err);
});
