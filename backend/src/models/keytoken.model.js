'use strict';
const db = require('../config/db'); // Đảm bảo đường dẫn chính xác tới file db.js

class KeytokenModel {
    constructor(userId, publicKey, privateKey, refreshTokensUsed, refreshToken) {
        this.userId = userId;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.refreshTokensUsed = refreshTokensUsed;
        this.refreshToken = refreshToken;
    }

    static async createOrUpdateKeyToken({ userId, publicKey, privateKey, refreshToken }) {
        console.log("userId:: %s, publicKey:: %s, privateKey:: %s, refreshToken:: %s", userId, publicKey, privateKey, refreshToken);

        const querySelect = 'SELECT * FROM key_token WHERE user_id = ?';
        const [rows] = await db.execute(querySelect, [userId]);

        if (rows.length > 0) {
            const queryUpdate = `
                UPDATE key_token
                SET public_key = ?,
                    private_key = ?,
                    refresh_tokens_used = ?,
                    refresh_token = ?
                WHERE user_id = ?`;

            await db.execute(queryUpdate, [publicKey, privateKey, JSON.stringify([]), refreshToken || '', userId]);
        } else {
            const queryInsert = `
                INSERT INTO key_token (user_id, public_key, private_key, refresh_tokens_used, refresh_token)
                VALUES (?, ?, ?, ?, ?)`;

            await db.execute(queryInsert, [userId, publicKey, privateKey, JSON.stringify([]), refreshToken || '']);
        }

        return publicKey; // Trả về publicKey
    }

    // Tìm kiếm token theo userId
    static async findByUserId(userId) {
        const query = 'SELECT * FROM key_token WHERE user_id = ?';
        const [rows] = await db.execute(query, [userId]);
        return rows.length > 0 ? rows[0] : null;
    }

    // Xóa token theo id
    static async removeKeyById(id) {
        const query = 'DELETE FROM key_token WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result.affectedRows > 0; // Trả về true nếu xóa thành công
    }

    // Tìm kiếm token theo refreshTokensUsed
    static async findByRefreshTokenUsed(refreshToken) {
        const query = 'SELECT * FROM key_token WHERE refresh_tokens_used = ?';
        const [rows] = await db.execute(query, [refreshToken]);
        return rows.length > 0 ? rows[0] : null;
    }

    // Xóa token theo userId
    static async deleteKeyById(userId) {
        const query = 'DELETE FROM key_token WHERE user_id = ?';
        const [result] = await db.execute(query, [userId]);
        return result.affectedRows > 0;
    }

    // Tìm kiếm token theo refreshToken
    static async findByRefreshToken(refreshToken) {
        const query = 'SELECT * FROM key_token WHERE refresh_token = ?';
        const [rows] = await db.execute(query, [refreshToken]);
        return rows.length > 0 ? rows[0] : null;
    }

    // Phương thức cập nhật refreshToken và refreshTokensUsed
    static async updateKeyToken(userId, newRefreshToken, refreshTokenUsed) {
        console.log("userId::%s, newRefreshToken::%s, refreshTokenUsed::%s ", userId, newRefreshToken, refreshTokenUsed);
        const query = `
            UPDATE key_token
            SET refresh_token = ?,
                refresh_tokens_used = JSON_ARRAY_APPEND(refresh_tokens_used, '$', ?)
            WHERE user_id = ?
        `;
        const [result] = await db.execute(query, [newRefreshToken, refreshTokenUsed, userId]);
        return result;
    }
}

module.exports = KeytokenModel;
