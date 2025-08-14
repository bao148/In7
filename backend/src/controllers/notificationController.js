const Notification = require('../models/notification');

exports.createNotification = async (req, res) => {
    try {
        const { user_id, type, message } = req.body;
        const notificationId = await Notification.createNotification({ user_id, type, message });
        res.status(201).json({
            message: 'Tạo thông báo thành công',
            notificationId,
        });
    } catch (error) {
        console.error('Error creating notification:', error.message);
        res.status(500).json({ message: 'Lỗi khi tạo thông báo', error });
    }
};

exports.getNotificationsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.getNotificationsByUserId(userId);
        res.status(200).json({
            message: 'Lấy thông báo thành công',
            notifications,
        });
    } catch (error) {
        console.error('Error fetching notifications:', error.message);
        res.status(500).json({ message: 'Lỗi khi lấy thông báo', error });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const success = await Notification.markAsRead(notificationId);
        if (success) {
            res.status(200).json({ message: 'Đánh dấu thông báo đã đọc thành công' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy thông báo' });
        }
    } catch (error) {
        console.error('Error marking notification as read:', error.message);
        res.status(500).json({ message: 'Lỗi khi đánh dấu thông báo', error });
    }
};
