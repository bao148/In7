const db = require('../config/db');
const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
    try {
        const sql = 'SELECT * FROM products';
        const [results] = await db.query(sql);
        res.json({
            message: 'Lấy sản phẩm thành công',
            products: results.map(product => new Product(
                product.id,
                product.name,
                product.price,
                product.image,
                product.description,
                product.discount,
                product.quantity,
                product.status,
                product.categories_id,
                product.created_at,
                product.updated_at
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy sản phẩm', error: err });
    }
};

exports.getAllProductsByStatus = async (req, res) => {
    try {
        const sql = 'SELECT * FROM products WHERE status = "active"';
        const [results] = await db.query(sql);
        res.json({
            message: 'Lấy sản phẩm thành công',
            products: results.map(product => new Product(
                product.id,
                product.name,
                product.price,
                product.image,
                product.description,
                product.discount,
                product.quantity,
                product.status,
                product.categories_id,
                product.created_at,
                product.updated_at
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy sản phẩm', error: err });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'SELECT * FROM products WHERE id = ?';
        const [results] = await db.query(sql, [id]);
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }

        const product = results[0];
        res.json({
            message: 'Lấy sản phẩm thành công',
            product: new Product(
                product.id,
                product.name,
                product.price,
                product.image,
                product.description,
                product.discount,
                product.quantity,
                product.status,
                product.categories_id,
                product.created_at,
                product.updated_at
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy sản phẩm', error: err });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, discount, quantity, status, categories_id } = req.body;
        const image = req.file.filename;
        const sql = 'INSERT INTO products (name, price, image, description, discount, quantity, status, categories_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        const [results] = await db.query(sql, [name, price, image, description, discount, quantity, status, categories_id]);
        
        res.status(201).json({
            message: 'Tạo sản phẩm thành công',
            product: new Product(
                results.insertId,
                name,
                price,
                image,
                description,
                discount,
                quantity,
                status,
                categories_id,
                new Date(),
                new Date()
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi tạo sản phẩm', error: err });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, discount, quantity, status, categories_id } = req.body;
        const image = req.file ? req.file.filename : null;

        const selectSql = 'SELECT image FROM products WHERE id = ?';
        const [selectResults] = await db.query(selectSql, [id]);

        if (selectResults.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }

        const currentImage = selectResults[0].image;
        const updatedImage = image || currentImage;

        const sql = 'UPDATE products SET name = ?, price = ?, image = ?, description = ?, discount = ?, quantity = ?, status = ?, categories_id = ? WHERE id = ?';
        await db.query(sql, [name, price, updatedImage, description, discount, quantity, status, categories_id, id]);

        res.json({
            message: 'Cập nhật sản phẩm thành công',
            product: new Product(
                id,
                name,
                price,
                updatedImage,
                description,
                discount,
                quantity,
                status,
                categories_id,
                null, // ngày tạo giữ nguyên khi update
                new Date()
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm', error: err });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'DELETE FROM products WHERE id = ?';
        await db.query(sql, [id]);
        res.status(200).json({ message: 'Xóa sản phẩm thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xóa sản phẩm', error: err });
    }

// Lấy tất cả danh mục sản phẩm
exports.getCategories = async (req, res) => {
    try {
      const [results] = await db.query('SELECT * FROM categories');
      res.json({
        message: 'Danh sách loại sản phẩm',
        categories: results
      });
    } catch (err) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách loại sản phẩm', error: err });
    }
  };
  
};



exports.searchProduct = async (req, res) => {
    try {
        const { value } = req.params;  // Lấy giá trị tìm kiếm từ route parameter

        // Kiểm tra nếu không có giá trị tìm kiếm
        if (!value) {
            return res.status(400).json({ message: 'Cần cung cấp giá trị tìm kiếm' });
        }

        // Xây dựng câu lệnh SQL với JOIN
        const sql = `
            SELECT p.* 
            FROM products p
            LEFT JOIN category c ON p.categories_id = c.id
            WHERE p.name LIKE ? OR c.category_name LIKE ?
        `;
        
        const [results] = await db.query(sql, [`%${value}%`, `%${value}%`]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm nào' });
        }

        res.json({
            message: 'Tìm kiếm sản phẩm thành công',
            products: results.map(product => new Product(
                product.id,
                product.name,
                product.price,
                product.image,
                product.description,
                product.discount,
                product.quantity,
                product.status,
                product.categories_id,
                product.created_at,
                product.updated_at
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi tìm kiếm sản phẩm', error: err });
    }
};

exports.Admin = async (req, res) => {
    try {
        res.json({
            message: 'Accept access',
            status: 200
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred',
            status: 500
        });
    }
};

