const express = require('express');
const { sendEmail , sendWelcomeEmail, sendContactEmail  } = require('../controllers/emailController');

const router = express.Router();

// Route để gửi email
router.post('/send-email', sendEmail);

router.post('/send-welcome-email', sendWelcomeEmail);

router.post('/send-contact-email', sendContactEmail);

module.exports = router;