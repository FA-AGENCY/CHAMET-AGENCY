const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', authRoutes);

// MongoDB Connection
const DB_URI = 'mongodb://FA_Agency_Support_bot:FaAgency2026@cluster0-shard-00-00.l71dxti.mongodb.net:27017,cluster0-shard-00-01.l71dxti.mongodb.net:27017,cluster0-shard-00-02.l71dxlpi.mongodb.net:27017/faagency?ssl=true&replicaSet=atlas-l71dxti-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(DB_URI)
  .then(() => console.log('[MongoDB Atlas Connected]'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(\Server is running on port \\);
    console.log('Environment: development');
});
