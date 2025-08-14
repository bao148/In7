const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const GHTK_API = process.env.GHTK_API;
const GHTK_TOKEN = process.env.GHTK_TOKEN;

// Hàm tính phí vận chuyển
async function calculateShippingFee(data) {
    try {
        const response = await axios.post(`${GHTK_API}/services/shipment/fee`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Token': GHTK_TOKEN
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'GHTK API Error');
    }
}

module.exports = { calculateShippingFee };

// // Tính phí vận chuyển
// exports.calculateFee = async (req, res) => {
//     const { pick_address, pick_province, pick_district, deliver_province, deliver_district, weight, deliver_option } = req.body;

//     console.log("Dữ liệu nhận từ frontend:", req.body); // Log dữ liệu nhận được

//     try {
//         const response = await axios.post(`${GHTK_API}/services/shipment/fee`, {
//             pick_address,
//             pick_province,
//             pick_district,
//             deliver_province,
//             deliver_district,
//             weight,
//             deliver_option,
//         }, {
//             headers: { Token: GHTK_TOKEN },
//         });

//         console.log("Phản hồi từ GHTK:", response.data); // Log phản hồi GHTK
//         res.json(response.data);
//     } catch (error) {
//         console.error("Lỗi khi gọi API GHTK:", error.response ? error.response.data : error.message); // Log lỗi chi tiết
//         res.status(500).json({
//             error: error.response ? error.response.data : "Unknown error occurred",
//         });
//     }
// };

// // Tạo đơn hàng
// exports.createOrder = async (req, res) => {
//     const order = req.body;

//     try {
//         const response = await axios.post(`${GHTK_API}/services/shipment/order`, order, {
//             headers: { Token: GHTK_TOKEN }
//         });
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
