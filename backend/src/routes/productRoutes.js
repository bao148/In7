const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const db = require('../config/db'); // Đảm bảo bạn đã kết nối tới database

// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Đường dẫn lưu hình ảnh
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Đặt tên file
  },
});

const upload = multer({ storage: storage });

// Lấy danh sách sản phẩm
router.get('/products', productController.getAllProducts);

// Lấy danh sách sản phẩm
router.get('/products/bystatus', productController.getAllProductsByStatus);

// Lấy sản phẩm theo ID
router.get('/products/:id', productController.getProductById);

// Tìm kiếm sản phẩm
router.get('/products/search/:value', productController.searchProduct);

// Thêm sản phẩm mới
router.post('/products', upload.single('image'), productController.createProduct);

// Cập nhật sản phẩm
router.put('/products/:id', upload.single('image'), productController.updateProduct);

// Xóa sản phẩm
router.delete('/products/:id', productController.deleteProduct);

// **Tính tổng số lượng sản phẩm**
router.get('/products/total-quantity', async (req, res) => {
  try {
    const [result] = await db.query('SELECT SUM(quantity) AS totalQuantity FROM products');
    res.json({ totalQuantity: result[0].totalQuantity || 0 });
  } catch (error) {
    console.error('Lỗi khi tính tổng số lượng sản phẩm:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
