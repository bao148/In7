const { OAuth2Client } = require('google-auth-library');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Tạo client OAuth2 với Google Client ID
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Xác thực ID Token từ Google
async function verifyGoogleToken(idToken) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,  // Kiểm tra client ID
    });
    const payload = ticket.getPayload();  // Lấy thông tin người dùng
    return payload;
  } catch (error) {
    console.error('Error verifying token:', error); // In lỗi chi tiết
    throw new Error('Token verification failed');
  }
}

module.exports = { verifyGoogleToken };
