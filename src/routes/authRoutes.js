const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/authController');
const verifyAdminToken = require('../middlewares/authMiddleware');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// সুরক্ষিত ড্যাশবোর্ড রুট উদাহরণ
router.get('/dashboard', verifyAdminToken, (req, res) => {
    res.status(200).json({ message: 'Welcome to the Admin Dashboard!', admin: req.admin });
});

module.exports = router;