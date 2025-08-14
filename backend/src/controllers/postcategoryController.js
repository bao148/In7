const db = require('../config/db');
const PostCategory = require('../models/postCategory');

// Lấy tất cả danh mục
exports.getAllPostCategories = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM postcategory');
        res.json({
            message: 'Lấy danh mục thành công',
            postcategories: results.map(postcategory => new PostCategory(
                postcategory.id,
                postcategory.name,
                postcategory.image_url,
                postcategory.created_at,
                postcategory.updated_at
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh mục', error: err });
    }
};

// Lấy danh mục theo ID
exports.getPostCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM postcategory WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục' });
        }
        const postcategory = results[0];
        res.json({
            message: 'Lấy danh mục thành công',
            postcategory: new PostCategory(
                postcategory.id,
                postcategory.name,
                postcategory.image_url,
                postcategory.created_at,
                postcategory.updated_at
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh mục', error: err });
    }
};

// Tạo danh mục mới
exports.createPostCategory = async (req, res) => {
    const { name } = req.body;
    const image_url = req.file ? req.file.filename : null;
    try {
        const [results] = await db.query(
            'INSERT INTO postcategory (name, image_url) VALUES (?, ?)',
            [name, image_url]
        );
        res.status(201).json({
            message: 'Tạo danh mục thành công',
            postcategory: new PostCategory(
                results.insertId,
                name,
                image_url,
                new Date(),
                new Date()
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi tạo danh mục', error: err });
    }
};

// Cập nhật danh mục
exports.updatePostCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const image_url = req.file ? req.file.filename : null;

    try {
        const [selectResults] = await db.query('SELECT image_url FROM postcategory WHERE id = ?', [id]);
        if (selectResults.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục' });
        }

        const currentImage = selectResults[0].image_url;
        const updatedImage = image_url || currentImage;

        await db.query(
            'UPDATE postcategory SET name = ?, image_url = ? WHERE id = ?',
            [name, updatedImage, id]
        );
        res.json({
            message: 'Cập nhật danh mục thành công',
            postcategory: new PostCategory(
                id,
                name,
                updatedImage,
                null,
                new Date()
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi cập nhật danh mục', error: err });
    }
};

// Xóa danh mục
exports.deletePostCategory = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM postcategory WHERE id = ?', [id]);
        res.status(200).json({ message: 'Xóa danh mục thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xóa danh mục', error: err });
    }
};
