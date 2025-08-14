const db = require('../config/db');
const Voucher = require('../models/voucher');

// Lấy tất cả vouchers
exports.getAllVouchers = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM vouchers');
        res.json({
            message: 'Lấy voucher thành công',
            vouchers: results.map(voucher => new Voucher(
                voucher.id,
                voucher.voucher_code,  // Thêm voucher_code
                voucher.price,
                voucher.discount_percent,
                voucher.valid_from,    // Thêm valid_from
                voucher.valid_to,      // Thêm valid_to
                voucher.status,
                voucher.quantity,
                voucher.created_at,
                voucher.updated_at
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy voucher', error: err });
    }
};
// Lấy tất cả vouchers
exports.getAllVouchersByStatus = async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM vouchers WHERE status = "active"');
        res.json({
            message: 'Lấy voucher thành công',
            vouchers: results.map(voucher => new Voucher(
                voucher.id,
                voucher.voucher_code,  // Thêm voucher_code
                voucher.price,
                voucher.discount_percent,
                voucher.valid_from,    // Thêm valid_from
                voucher.valid_to,      // Thêm valid_to
                voucher.status,
                voucher.created_at,
                voucher.updated_at
            ))
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy voucher', error: err });
    }
};

// Lấy voucher theo ID
exports.getVoucherById = async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM vouchers WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy voucher' });
        }
        const voucher = results[0];
        res.json({
            message: 'Lấy voucher thành công',
            voucher: new Voucher(
                voucher.id,
                voucher.voucher_code,  // Thêm voucher_code
                voucher.price,
                voucher.discount_percent,
                voucher.valid_from,    // Thêm valid_from
                voucher.valid_to,      // Thêm valid_to
                voucher.status,
                voucher.quantity,
                voucher.created_at,
                voucher.updated_at
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy voucher', error: err });
    }
};

// Tạo voucher mới
exports.createVoucher = async (req, res) => {
    const { voucher_code, price, discount_percent, valid_from, valid_to, status, quantity } = req.body;
    try {
        const [results] = await db.query(
            'INSERT INTO vouchers (voucher_code, price, discount_percent, valid_from, valid_to, status, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [voucher_code, price, discount_percent, valid_from, valid_to, status, quantity]
        );
        res.status(201).json({
            message: 'Tạo voucher thành công',
            voucher: new Voucher(
                results.insertId,
                voucher_code,          // Thêm voucher_code
                price,
                discount_percent,
                valid_from,            // Thêm valid_from
                valid_to,              // Thêm valid_to
                status,
                quantity,
                new Date(),
                new Date()
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi tạo voucher', error: err });
    }
};

// Cập nhật voucher
exports.updateVoucher = async (req, res) => {
    const { id } = req.params;
    const { voucher_code, price, discount_percent, valid_from, valid_to, status, quantity } = req.body;
    try {
        await db.query(
            'UPDATE vouchers SET voucher_code = ?, price = ?, discount_percent = ?, valid_from = ?, valid_to = ?, status = ?, quantity = ? WHERE id = ?',
            [voucher_code, price, discount_percent, valid_from, valid_to, status, quantity, id]
        );
        res.json({
            message: 'Cập nhật voucher thành công',
            voucher: new Voucher(
                id,
                voucher_code,          // Thêm voucher_code
                price,
                discount_percent,
                valid_from,            // Thêm valid_from
                valid_to,              // Thêm valid_to
                status,
                quantity,
                null,                   // giữ nguyên ngày tạo khi cập nhật
                new Date()
            )
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi cập nhật voucher', error: err });
    }
};

// Xóa voucher
exports.deleteVoucher = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM vouchers WHERE id = ?', [id]);
        res.status(200).json({ message: 'Xóa voucher thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xóa voucher', error: err });
    }
};
