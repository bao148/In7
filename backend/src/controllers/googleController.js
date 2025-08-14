const { verifyGoogleToken } = require('../service/googleAuth.service');
const { createTokenPair } = require('../auth/auth.Utils');
const KeyTokenService = require('../service/keyToken.service');
const User = require('../models/user');
const crypto = require('crypto');

async function verifyToken(req, res) {
  const { idToken } = req.body;

  try {
    const userInfo = await verifyGoogleToken(idToken);

    // Kiểm tra nếu người dùng đã tồn tại
    let user = await User.findUserByEmail(userInfo.email);

    if (!user) {
      // Nếu người dùng chưa tồn tại, tạo người dùng mới
      user = await User.save({
        FullName: userInfo.name,
        Email: userInfo.email,
        Password: "", // Không cần mật khẩu cho Google Login
        Role: "user",
        Status: "active"
      });
    }

    // Tạo token
    const privateKey = crypto.randomBytes(64).toString('hex');
    const publicKey = crypto.randomBytes(64).toString('hex');
    const tokens = await createTokenPair({ userId: user.id, email: userInfo.email }, publicKey, privateKey);

    await KeyTokenService.createKeyToken({
      userId: user.id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken
    });

    res.json({
      success: true,
      metadata: {
        tokens: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken
        },
        shop: {
          user_id: user.id,
          name: user.fullname,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(400).json({ success: false, message: 'Token verification failed' });
  }
}

module.exports = { verifyToken };
