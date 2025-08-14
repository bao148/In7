const db = require('../config/db');
const Order = require('../models/order');
const Orderdetails = require('../models/orderdetails');

// Lấy danh sách đơn hàng
exports.getAllOrders = async (req, res) => {
    try {
        const [results] = await db.query(`
            SELECT 
                orders.*, 
                users.fullname 
            FROM 
                orders
            JOIN 
                users ON orders.user_id = users.id
        `);

        if (results.length === 0) {
            return res.status(404).json({ message: 'Không có đơn hàng nào' });
        }

        res.json({
            message: 'Lấy danh sách đơn hàng thành công',
            orders: results.map(order => ({
                id: order.id,
                user_id: order.user_id,
                fullname: order.fullname, // Thêm thông tin người dùng
                total_amount: order.total_amount,
                payment_method: order.payment_method,
                status: order.status,
                address: order.address,
                phone_number: order.phone_number,
                note: order.note,
                voucher_code: order.voucher_code,
                voucher_discount: order.voucher_discount,
                voucher_id: order.voucher_id,
                transIdMomo: order.transIdMomo,
                orderId: order.orderId,
                created_at: order.created_at,
                updated_at: order.updated_at,
            }))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách đơn hàng', error: err });
    }
};

// Lấy danh sách đơn hàng
exports.getOrderdetailsByOrderid = async (req, res) => {
    const { id } = req.params;

    try {
        const [results] = await db.query('SELECT * FROM order_details where order_id=?', [id]);
        res.json({
            message: 'Lấy chi tiết đơn hàng thành công',
            orders: results.map(order_details => new Orderdetails(
                order_details.id,
                order_details.order_id,
                order_details.product_id,
                order_details.product_name,
                order_details.quantity,
                order_details.unit_price,
                order_details.total_price,
                order_details.voucher_code,
                order_details.voucher_discount,
                order_details.created_at,
                order_details.updated_at,
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy đơn hàng', error: err });
    }
};
// Lấy đơn hàng theo ID
exports.getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query(`
            SELECT 
                orders.*, 
                users.fullname 
            FROM 
                orders
            JOIN 
                users ON orders.user_id = users.id
            WHERE 
                orders.id = ?
        `, [id]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }

        const order = results[0];
        res.json({
            message: 'Lấy đơn hàng thành công',
            order: {
                id: order.id,
                user_id: order.user_id,
                fullname: order.fullname, // Thêm username vào kết quả
                total_amount: order.total_amount,
                payment_method: order.payment_method,
                status: order.status,
                address: order.address,
                phone_number: order.phone_number,
                note: order.note,
                voucher_code: order.voucher_code,
                voucher_discount: order.voucher_discount,
                voucher_id: order.voucher_id,
                transIdMomo: order.transIdMomo,
                orderId: order.orderId,
                created_at: order.created_at,
                updated_at: order.updated_at,
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy đơn hàng', error: err });
    }
};


// Cập nhật đơn hàng
exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        // Cập nhật trạng thái đơn hàng
        await db.query(
            'UPDATE orders SET status = ? WHERE id = ?',
            [status, id]
        );

        // Nếu trạng thái đơn hàng là "canceled", hoàn lại số lượng sản phẩm
        if (status === 'canceled') {
            // Lấy danh sách các sản phẩm trong đơn hàng
            const [orderDetails] = await db.query(
                'SELECT * FROM order_details WHERE order_id = ?',
                [id]
            );

            // Duyệt qua các sản phẩm trong đơn hàng để hoàn lại số lượng
            for (const detail of orderDetails) {
                const { product_id, quantity, voucher_code  } = detail;

                // Cập nhật lại số lượng sản phẩm trong kho
                await db.query(
                    'UPDATE products SET quantity = quantity + ? WHERE id = ?',
                    [quantity, product_id]
                );
                // Nếu có voucher, hoàn lại số lượng voucher trong kho
                if (voucher_code) {
                    // Cập nhật lại số lượng voucher
                    await db.query(
                        'UPDATE vouchers SET quantity = quantity + 1 WHERE voucher_code = ?',
                        [voucher_code]
                    );
                }
            }
        }

        // Trả về thông báo thành công
        res.json({
            message: 'Cập nhật đơn hàng thành công',
            order: {
                id,
                status,
            }
        });
    } catch (err) {
        // Xử lý lỗi nếu có
        res.status(500).json({ message: 'Lỗi khi cập nhật đơn hàng', error: err });
    }
};

exports.getOrdersByUserId = async (req, res) => {
    const { user_id } = req.query;

    if (!user_id) {
        return res.status(400).json({ message: 'Thiếu user_id' });
    }

    try {
        const [results] = await db.query(
            `SELECT * FROM orders WHERE user_id = ? ORDER BY updated_at ASC`,
            [user_id]
        );

        if (results.length === 0) {
            // Nếu không có đơn hàng, trả về một thông báo cho biết không có đơn hàng
            return res.json({
                message: 'Không tìm thấy đơn hàng cho người dùng này',
                orders: []  // Trả về mảng rỗng thay vì lỗi 404
            });
        }

        res.json({
            message: 'Lấy danh sách đơn hàng thành công',
            orders: results.map(order => new Order(
                order.id,
                order.user_id,
                order.total_amount,
                order.payment_method,
                order.status,
                order.address,
                order.phone_number,
                order.note,
                order.voucher_code,
                order.voucher_discount,
                order.voucher_id,
                order.transIdMomo,
                order.orderId,
                order.created_at,
                order.updated_at,
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách đơn hàng', error: err });
    }
};

