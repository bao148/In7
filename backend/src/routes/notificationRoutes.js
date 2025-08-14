const express = require('express');
const notificationController = require('../controllers/notificationController');
const router = express.Router();

// Lấy thông báo theo user ID
router.get('/:userId', notificationController.getNotificationsByUserId);

// Tạo thông báo mới
router.post('/', notificationController.createNotification);

// Đánh dấu thông báo đã đọc
router.put('/:notificationId/read', notificationController.markAsRead);

module.exports = router;
