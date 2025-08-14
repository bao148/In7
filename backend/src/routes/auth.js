const express = require('express');
const { verifyToken } = require('../controllers/googleController');

const router = express.Router();

// Định nghĩa route cho API xác thực
router.post('/verify-google-token', verifyToken);

module.exports = router;
