const express = require('express');
const router = express.Router();
const commentPostController = require('../controllers/commentpostController')
const multer = require('multer');

// Lấy danh sách tất cả commentpost
router.get('/commentpost', commentPostController.getAllComments);

// Lấy một commentpost theo ID
router.get('/commentpost/:id', commentPostController.getCommentById);

// Thêm một commentpost mới
router.post('/commentpost', commentPostController.createComment);

// Cập nhật một commentpost
router.put('/commentpost/:id', commentPostController.updateComment);

// Xóa một commentpost
router.delete('/commentpost/:id', commentPostController.deleteComment);

module.exports = router;
