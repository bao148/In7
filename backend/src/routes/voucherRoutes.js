// voucherRoutes.js
const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucherController');

// Lấy danh sách voucher
router.get('/vouchers', voucherController.getAllVouchers);

// Lấy danh sách voucher
router.get('/vouchers/bystatus', voucherController.getAllVouchersByStatus);

// Lấy voucher theo ID
router.get('/vouchers/:id', voucherController.getVoucherById);

// Thêm voucher mới
router.post('/vouchers', voucherController.createVoucher);

// Cập nhật voucher
router.put('/vouchers/:id', voucherController.updateVoucher);

// Xóa voucher
router.delete('/vouchers/:id', voucherController.deleteVoucher);

// **Tính tổng số lượng sản phẩm**
router.get('/vouchers/total-quantity', async (req, res) => {
    try {
      const [result] = await db.query('SELECT SUM(quantity) AS totalQuantity FROM vouchers');
      res.json({ totalQuantity: result[0].totalQuantity || 0 });
    } catch (error) {
      console.error('Lỗi khi tính tổng số lượng vouchers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;
