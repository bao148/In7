const db = require('../config/db');
const Post = require('../models/post');

// Lấy tất cả bài viết
exports.getAllPosts = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM posts');
        res.json({
            message: 'Lấy bài viết thành công',
            posts: results.map(post => new Post(
                post.id,
                post.title,
                post.content,
                post.post_category_id,
                post.status,
                post.created_at,
                post.updated_at,
                post.image_url
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy bài viết', error: err });
    }
};
// Lấy tất cả bài viết
exports.getAllPostsByStatus = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM posts  WHERE status = "published"');
        res.json({
            message: 'Lấy bài viết thành công',
            posts: results.map(post => new Post(
                post.id,
                post.title,
                post.content,
                post.post_category_id,
                post.status,
                post.created_at,
                post.updated_at,
                post.image_url
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy bài viết', error: err });
    }
};

// Lấy bài viết theo ID
exports.getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy bài viết' });
        }
        const post = results[0];
        res.json({
            message: 'Lấy bài viết thành công',
            post: new Post(
                post.id,
                post.title,
                post.content,
                post.post_category_id,
                post.status,
                post.created_at,
                post.updated_at,
                post.image_url
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy bài viết', error: err });
    }
};

// Tạo bài viết mới
exports.createPost = async (req, res) => {
    const { title, content, post_category_id, status } = req.body;
    const image_url = req.file ? req.file.filename : null;
    try {
        const [results] = await db.query(
            'INSERT INTO posts (title, content, post_category_id, status, image_url) VALUES (?, ?, ?, ?, ?)',
            [title, content, post_category_id, status, image_url]
        );
        res.status(201).json({
            message: 'Tạo bài viết thành công',
            post: new Post(
                results.insertId,
                title,
                content,
                post_category_id,
                status,
                new Date(),
                new Date(),
                image_url
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi tạo bài viết', error: err });
    }
};

// Cập nhật bài viết
exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, post_category_id, status } = req.body;
    const image_url = req.file ? req.file.filename : null;

    try {
        const [selectResults] = await db.query('SELECT image_url FROM posts WHERE id = ?', [id]);
        if (selectResults.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy bài viết' });
        }

        const currentImage = selectResults[0].image_url;
        const updatedImage = image_url || currentImage;

        await db.query(
            'UPDATE posts SET title = ?, content = ?, post_category_id = ?, status = ?, image_url = ? WHERE id = ?',
            [title, content, post_category_id, status, updatedImage, id]
        );
        res.json({
            message: 'Cập nhật bài viết thành công',
            post: new Post(
                id,
                title,
                content,
                post_category_id,
                status,
                null, // Ngày tạo giữ nguyên khi cập nhật
                new Date(),
                updatedImage
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi cập nhật bài viết', error: err });
    }
};

// Xóa bài viết
exports.deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM posts WHERE id = ?', [id]);
        res.status(200).json({ message: 'Xóa bài viết thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xóa bài viết', error: err });
    }
};
