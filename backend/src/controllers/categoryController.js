const db = require('../config/db');
const Category = require('../models/category'); // Assuming you have a Category model

// Lấy tất cả danh mục
exports.getAllCategories = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM category');
        res.json({
            message: 'Lấy danh mục thành công',
            categories: results.map(category => new Category(
                category.id,
                category.category_name,
                category.images,
                category.status,
                category.description,
                category.created_at,
                category.updated_at
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh mục', error: err });
    }
};
// Lấy tất cả danh mục
exports.getAllCategoriesByStatus = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM category WHERE status = "active"');
        res.json({
            message: 'Lấy danh mục thành công',
            categories: results.map(category => new Category(
                category.id,
                category.category_name,
                category.images,
                category.status,
                category.description,
                category.created_at,
                category.updated_at
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh mục', error: err });
    }
};

// Lấy danh mục theo ID
exports.getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM category WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục' });
        }
        const category = results[0];
        res.json({
            message: 'Lấy danh mục thành công',
            category: new Category(
                category.id,
                category.category_name,
                category.images,
                category.status,
                category.description,
                category.created_at,
                category.updated_at
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh mục', error: err });
    }
};

// Tạo danh mục mới
exports.createCategory = async (req, res) => {
    const { category_name, status, description } = req.body;
    const images = req.file ? req.file.filename : null;
    try {
        const [results] = await db.query(
            'INSERT INTO category (category_name, images, status, description) VALUES (?, ?, ?, ?)',
            [category_name, images, status, description]
        );
        res.status(201).json({
            message: 'Tạo danh mục thành công',
            category: new Category(
                results.insertId,
                category_name,
                images,
                status,
                description,
                new Date(),
                new Date()
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi tạo danh mục', error: err });
    }
};

// Cập nhật danh mục
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { category_name, status, description } = req.body;
    const images = req.file ? req.file.filename : null;

    try {
        const [selectResults] = await db.query('SELECT images FROM category WHERE id = ?', [id]);
        if (selectResults.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục' });
        }

        const currentImage = selectResults[0].images;
        const updatedImage = images ? images : currentImage;

        await db.query(
            'UPDATE category SET category_name = ?, images = ?, status = ?, description = ? WHERE id = ?',
            [category_name, updatedImage, status, description, id]
        );
        
        res.json({
            message: 'Cập nhật danh mục thành công',
            category: new Category(
                id,
                category_name,
                updatedImage,
                status,
                description,
                null, // Ngày tạo giữ nguyên
                new Date()
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi cập nhật danh mục', error: err });
    }
};

// Xóa danh mục
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM category WHERE id = ?', [id]);
        res.status(200).json({ message: 'Xóa danh mục thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xóa danh mục', error: err });
    }
};
