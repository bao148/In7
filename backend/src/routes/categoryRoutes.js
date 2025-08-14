const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const multer = require('multer');

// Cấu hình multer để lưu trữ hình ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Đường dẫn lưu hình ảnh
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Đặt tên file là tên gốc
  }
});

const upload = multer({ storage: storage });

// Lấy danh sách danh mục
router.get('/category', categoryController.getAllCategories);

// Lấy danh sách danh mục
router.get('/category/bystatus', categoryController.getAllCategoriesByStatus);

// Lấy danh mục theo ID
router.get('/category/:id', categoryController.getCategoryById);

// Thêm danh mục mới
router.post('/category', upload.single('images'), categoryController.createCategory);

// Cập nhật danh mục
router.put('/category/:id', upload.single('images'), categoryController.updateCategory);

// Xóa danh mục
router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router;
