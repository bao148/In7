const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Thêm thông tin cấu hình MoMo
const momoConfig = {
  accessKey: process.env.MOMO_ACCESS_KEY,  // Tạo trong tài khoản MoMo
  secretKey: process.env.MOMO_SECRET_KEY,  // Tạo trong tài khoản MoMo
  orderInfo: 'Thanh toán qua MoMo',  // Thông tin đơn hàng
  partnerCode: process.env.MOMO_PARTNER_CODE,  // Mã đối tác MoMo
  redirectUrl: 'http://localhost:4200/payment-alert',  // URL chuyển hướng sau khi thanh toán
  ipnUrl: 'http://localhost:3000/payment/callback',  // URL nhận callback từ MoMo
  requestType: 'payWithMethod',
  extraData: '',
  lang: 'vi',
};

module.exports = momoConfig;
