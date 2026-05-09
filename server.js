require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Basic Route for testing
app.get('/', (req, res) => {
    res.send('Portfolio API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
