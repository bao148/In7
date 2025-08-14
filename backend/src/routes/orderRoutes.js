const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


// Lấy danh sách đơn hàng
router.get('/orders', orderController.getAllOrders);

// Lấy danh sách đơn hàng
router.get('/orders/orderdetails/:id', orderController.getOrderdetailsByOrderid);

// Lấy đơn hàng theo ID
router.get('/orders/:id', orderController.getOrderById);

// Cập nhật đơn hàng
router.put('/orders/:id', orderController.updateOrderStatus);

// Lấy danh sách đơn hàng theo user_id
router.get('/user-orders', orderController.getOrdersByUserId);

// router.get('/orders/total-quantity', async (req, res) => {
//   try {
//     const [result] = await db.query('SELECT SUM(quantity) AS totalQuantity FROM orders');
//     res.json({ totalQuantity: result[0].totalQuantity || 0 });
//   } catch (error) {
//     console.error('Lỗi khi tính tổng số lượng sản phẩm:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

module.exports = router;
