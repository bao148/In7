const express = require('express');
const router = express.Router();
const postCategoryController = require('../controllers/postcategoryController');
const multer = require('multer');
const asyncHandler = require("../helpers/asyncHandler");
const accessController = require("../controllers/authController");
const  {authentication}= require("../auth/auth.Utils");

// Cấu hình multer
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
router.get('/postcategory', postCategoryController.getAllPostCategories);

// Lấy danh mục theo ID
router.get('/postcategory/:id', postCategoryController.getPostCategoryById);

// Thêm danh mục mới
router.post('/postcategory', upload.single('image_url'), postCategoryController.createPostCategory);

// Cập nhật danh mục
router.put('/postcategory/:id', upload.single('image_url'), postCategoryController.updatePostCategory);

// Xóa danh mục
router.delete('/postcategory/:id', postCategoryController.deletePostCategory);

module.exports = router;
