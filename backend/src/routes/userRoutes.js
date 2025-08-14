// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { forgotPassword, resetPassword } = require("../controllers/userController");
const multer = require('multer');
// const  {authentication, authorization}= require("../auth/auth.Utils");

// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Đường dẫn lưu hình ảnh
  },
  filename: (req, file, cb) => {
    // cb(null, Date.now() + '-' + file.originalname);
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Lấy danh sách
router.get('/users', userController.getAllUsers);

// authorization("[admin,user]"),

// Lấy theo ID
router.get('/users/:id', userController.getUserById);

// Cập nhật
router.put('/users/:id', userController.updateUser);

// Xóa
router.delete('/users/:id', userController.deleteUser);

// Route lấy thông tin người dùng
router.get('/user-info', userController.getUserInfo);
// Cập nhật thông tin người dùng với upload file
router.put('/profile/:id', upload.single('profilePicture'), userController.updateUserProfile);
// Quên mật khẩu
router.post("/forgot-password", forgotPassword);

// Đặt lại mật khẩu
router.post("/reset-password", resetPassword);


module.exports = router;
