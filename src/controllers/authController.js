const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin Register (প্রয়োজনে প্রথমবার অ্যাডমিন তৈরির জন্য)
exports.registerAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) return res.status(400).json({ message: 'Admin already exists.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ username, email, password: hashedPassword });
        
        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: 'Invalid email or password.' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password.' });

        // JWT Token Generate
        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_SECRET || 'your_super_secret_key',
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            admin: { id: admin._id, username: admin.username, email: admin.email }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};