const db = require('../config/db');
const CommentPost = require('../models/commentpost'); // Assuming you have a CommentPost model

// Lấy tất cả commentpost
exports.getAllComments = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM commentpost');
        res.json({
            message: 'Lấy danh sách comment thành công',
            comments: results.map(comment => new CommentPost(
                comment.id,
                comment.posts_id,
                comment.users_id,
                comment.comment,
                comment.status,
                comment.created_at,
                comment.updated_at
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách comment', error: err });
    }
};

// Lấy commentpost theo ID
exports.getCommentById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM commentpost WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy comment' });
        }
        const comment = results[0];
        res.json({
            message: 'Lấy comment thành công',
            comment: new CommentPost(
                comment.id,
                comment.posts_id,
                comment.users_id,
                comment.comment,
                comment.status,
                comment.created_at,
                comment.updated_at
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy comment', error: err });
    }
};

// Tạo commentpost mới
exports.createComment = async (req, res) => {
    const { posts_id, users_id, comment, status } = req.body;
    try {
        const [results] = await db.query(
            'INSERT INTO commentpost (posts_id, users_id, comment, status) VALUES (?, ?, ?, ?)',
            [posts_id, users_id, comment, status]
        );
        res.status(201).json({
            message: 'Tạo comment thành công',
            comment: new CommentPost(
                results.insertId,
                posts_id,
                users_id,
                comment,
                status,
                new Date(),
                new Date()
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi tạo comment', error: err });
    }
};

// Cập nhật commentpost
exports.updateComment = async (req, res) => {
    const { id } = req.params;
    const { posts_id, users_id, comment, status } = req.body;
    try {
        const [selectResults] = await db.query('SELECT * FROM commentpost WHERE id = ?', [id]);
        if (selectResults.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy comment' });
        }

        await db.query(
            'UPDATE commentpost SET posts_id = ?, users_id = ?, comment = ?, status = ? WHERE id = ?',
            [posts_id, users_id, comment, status, id]
        );

        res.json({
            message: 'Cập nhật comment thành công',
            comment: new CommentPost(
                id,
                posts_id,
                users_id,
                comment,
                status,
                selectResults[0].created_at,
                new Date()
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi cập nhật comment', error: err });
    }
};

// Xóa commentpost
exports.deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM commentpost WHERE id = ?', [id]);
        res.status(200).json({ message: 'Xóa comment thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xóa comment', error: err });
    }
};
