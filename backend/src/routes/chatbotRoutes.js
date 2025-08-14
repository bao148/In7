const express = require('express');
const router = express.Router();
const chatbotController = require('../controllers/chatbotController');

// Định nghĩa route cho chatbot
router.post('/chatbot', chatbotController);

module.exports = router;
