const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', authRoutes);

// MongoDB Connection
const DB_URI = 'mongodb+srv://FA_Agency_Support_bot:FaAgency2026@cluster0.l71dxti.mongodb.net/faagency?retryWrites=true&w=majority'; 
mongoose.connect(DB_URI)
  .then(() => console.log('[MongoDB Atlas Connected]'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = 5000;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
    console.log('Environment: development');
});
