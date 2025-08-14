const db = require('../config/db');

class Notification {
    static async createNotification(notificationData) {
        const query = `
            INSERT INTO notifications (user_id, type, message, is_read, created_at)
            VALUES (?, ?, ?, ?, NOW())
        `;
        const { user_id, type, message } = notificationData;
        const [result] = await db.query(query, [user_id, type, message, false]);
        return result.insertId;
    }

    static async getNotificationsByUserId(userId) {
        const query = `
            SELECT * 
            FROM notifications
            WHERE user_id = ?
            ORDER BY created_at DESC
        `;
        const [rows] = await db.query(query, [userId]);
        return rows;
    }

    static async markAsRead(notificationId) {
        const query = `
            UPDATE notifications
            SET is_read = true
            WHERE id = ?
        `;
        const [result] = await db.query(query, [notificationId]);
        return result.affectedRows > 0;
    }
}

module.exports = Notification;
