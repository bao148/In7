const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const chatbotRoutes = require('./src/routes/chatbotRoutes');
const nodemailer = require('nodemailer'); // Import nodemailer
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/auth');
const { OpenAI } = require("openai");
const postRoutes = require('./src/routes/postRoutes');
const voucherRoutes = require('./src/routes/voucherRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const productRoutes = require('./src/routes/productRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const postcategoryRoutes = require('./src/routes/postcategoryRoutes');
const commentpostRoutes = require('./src/routes/commentpostRoutes');;
const reviewRoutes = require('./src/routes/review');
const userRoutes = require('./src/routes/userRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');  // Import routes thanh toán MoMo
const emailRoutes = require('./src/routes/emailRoutes');
const ghtkRoutes = require("./src/routes/ghtkRoutes");
const notificationRoutes = require('./src/routes/notificationRoutes');

const db = require('./src/config/db'); // Nhập db từ config
const dbmomo = require('./src/config/momo'); // Nhập db từ config


// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
// Use CORS middleware
app.use(cors());

// Middleware để phục vụ tệp tĩnh
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Cấu hình transporter cho nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Thay thế bằng máy chủ của Gmail
  port: 587,
  secure: false, // true nếu sử dụng cổng 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// Middleware để xử lý JSON body
app.use(bodyParser.json());
// OpenAI Configuration

// Tạo đối tượng OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // API Key từ file .env
});



// Sử dụng route xác thực
app.use('/api', authRoutes);
app.use('/api', chatbotRoutes);
// Routes
app.use('/api', productRoutes);
app.use('/api', postRoutes);
app.use('/api', voucherRoutes);
app.use('/api', orderRoutes);
app.use('/api', categoryRoutes);
app.use('/api', postcategoryRoutes);
app.use('/api', commentpostRoutes);
app.use('/api', reviewRoutes);
app.use('/api', userRoutes);
app.use('/api', emailRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', ghtkRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api', require("./src/routes/index"));


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

