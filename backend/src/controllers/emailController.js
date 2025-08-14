const transporter = require("../config/emailConfig");
const crypto = require("crypto");
const User = require("../models/user");

// Hàm gửi email thông báo tài khoản bị xóa
const sendEmail = (req, res) => {
  const { email, fullName, reason } = req.body;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thông báo về trạng thái tài khoản",
    html: `
      <html>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;">
          <table align="center" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #ddd; background-color: #ffffff; margin-top: 20px;">
            <tr>
              <td align="center" style="background-color: #D32F2F; color: #ffffff; padding: 15px;">
                <h1 style="margin: 0; font-size: 24px;">Thông báo tài khoản</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <p>Xin chào <strong>${fullName}</strong>,</p>
                <p style="line-height: 1.6;">
                  Chúng tôi muốn thông báo rằng tài khoản của bạn đã bị xóa khỏi hệ thống vì lý do sau:
                </p>
                <p style="background-color: #f9f9f9; padding: 10px 15px; border-left: 4px solid #D32F2F; font-style: italic;">
                  <strong>${reason}</strong>
                </p>
                <p style="line-height: 1.6;">
                  Nếu bạn có bất kỳ thắc mắc nào hoặc cần hỗ trợ thêm, vui lòng liên hệ với chúng tôi qua email <a href="mailto:dien0922667574@gmail.com" style="color: #D32F2F; text-decoration: none;">hotrokhachhangin7@gmail.com</a>.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding: 20px; background-color: #f9f9f9; color: #777;">
                <p style="margin: 0;">Trân trọng,</p>
                <p style="margin: 5px 0 0;"><strong>Đội ngũ hỗ trợ khách hàng IN7</strong></p>
              </td>
            </tr>
            <tr>
              <td align="center" style="background-color: #D32F2F; color: #ffffff; padding: 10px;">
                <p style="margin: 0; font-size: 12px;">&copy; 2024 Your Company. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ message: "Gửi email thất bại" });
    }
    res.status(200).send({ message: "Email đã được gửi thành công" });
  });
};

// Hàm gửi email chúc mừng đăng ký tài khoản thành công
const sendWelcomeEmail = (req, res) => {
  const { email, name } = req.body;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "🎉 Chào mừng bạn đến với cộng đồng của chúng tôi!",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f9; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <!-- Header -->
      <div style="background-color: #FF6633; padding: 20px; text-align: center;">
      </div>
  
      <!-- Body -->
      <div style="padding: 20px; color: #333;">
        <h1 style="text-align: center; color: #FF6633;">Chúc mừng, ${name}! 🎉</h1>
        <p style="font-size: 16px; line-height: 1.6; text-align: justify;">
          Xin chào <strong>${name}</strong>,<br><br>
          Chúng tôi rất vui mừng chào đón bạn đến với cộng đồng của chúng tôi! Đây là bước khởi đầu cho một hành trình tuyệt vời, nơi bạn sẽ được trải nghiệm những điều đặc biệt cùng với chúng tôi.
        </p>
  
        <div style="text-align: center; margin: 30px 0;">
          <a href="http://localhost:4200/login" style="display: inline-block; padding: 15px 25px; font-size: 16px; color: #fff; background-color: #4CAF50; text-decoration: none; border-radius: 5px; font-weight: bold;">Đăng nhập ngay</a>
        </div>
  
        <p style="font-size: 16px; line-height: 1.6; text-align: justify;">
          Nếu bạn cần bất kỳ hỗ trợ nào, đừng ngần ngại liên hệ với chúng tôi. Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn.
        </p>
      </div>
  
      <!-- Footer -->
      <div style="background-color: #f4f4f9; padding: 10px 20px; text-align: center; border-top: 1px solid #ddd;">
        <p style="font-size: 14px; color: #999;">
          Đây là email tự động, vui lòng không trả lời.<br>
          Nếu bạn không thực hiện đăng ký, hãy bỏ qua email này.
        </p>
        <p style="font-size: 14px; color: #999;">© 2024 YourWebsite. Tất cả các quyền được bảo lưu.</p>
      </div>
    </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Lỗi khi gửi email:", error);
      return res.status(500).send("Lỗi khi gửi email chúc mừng");
    }
    console.log("Email chúc mừng đã được gửi:", info.response);
    res.status(200).send("Email chúc mừng đã được gửi thành công");
  });
};

// Hàm gửi email quên mật khẩu
const sendForgotPassEmail = async ({ email, name, resetLink }) => {
  console.log("Email:", email); // Thêm log để kiểm tra
  console.log("Reset Link:", resetLink);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "🔑 Yêu cầu đặt lại mật khẩu!",
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f9; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); padding: 20px;">
          <!-- Header -->
          <div style="text-align: center; padding-bottom: 20px;">
          </div>
      
          <!-- Body -->
          <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="text-align: center; color: #333; font-size: 22px;">Xin chào ${name},</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Nếu bạn đã yêu cầu điều này, vui lòng nhấn vào liên kết dưới đây để đặt lại mật khẩu:
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="display: inline-block; padding: 15px 25px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px; font-weight: bold; transition: background-color 0.3s;">
                Đặt lại mật khẩu
              </a>
            </div>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Nếu bạn không yêu cầu, vui lòng bỏ qua email này. Mật khẩu của bạn sẽ không bị thay đổi.
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Trân trọng,<br>
              <strong>IN7</strong>
            </p>
          </div>
      
          <!-- Footer -->
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 14px;">
            <p>
              Đây là email tự động, vui lòng không trả lời.<br>
              Nếu bạn gặp bất kỳ vấn đề nào, hãy liên hệ với chúng tôi qua trang hỗ trợ của công ty.
            </p>
            <p>
              © 2024 IN7.
            </p>
          </div>
        </div>
        `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email đã được gửi:", info.response);
    return { success: true };
  } catch (error) {
    console.error("Lỗi khi gửi email:", error);
    throw new Error("Lỗi khi gửi email");
  }
};

const sendContactEmail = (req, res) => {
  const { name, phone, company, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: "📩 Yêu cầu liên hệ từ khách hàng",
    html: `
       <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); padding: 20px; background-color: #ffffff; border: 1px solid #e0e0e0; overflow: hidden;">
  <h2 style="color: #007bff; font-size: 26px; margin-bottom: 20px; text-align: center; text-transform: uppercase; letter-spacing: 1px;">Thông tin liên hệ</h2>
  
  <div style="margin-bottom: 15px;">
    <p style="font-size: 16px; color: #555; margin: 0; font-weight: bold;">Họ và tên: <span style="color: #333; font-weight: normal;">${name}</span></p>
  </div>
  
  <div style="margin-bottom: 15px;">
    <p style="font-size: 16px; color: #555; margin: 0; font-weight: bold;">Số điện thoại: <span style="color: #333; font-weight: normal;">${phone}</span></p>
  </div>
  
  <div style="margin-bottom: 15px;">
    <p style="font-size: 16px; color: #555; margin: 0; font-weight: bold;">Tên công ty: <span style="color: #333; font-weight: normal;">${company || 'Không cung cấp'}</span></p>
  </div>
  
  <div style="margin-bottom: 15px;">
    <p style="font-size: 16px; color: #555; margin: 0; font-weight: bold;">Email: <span style="color: #333; font-weight: normal;">${email}</span></p>
  </div>
  
  <div style="margin-bottom: 20px;">
    <p style="font-size: 16px; color: #555; margin: 0; font-weight: bold;">Lời nhắn:</p>
    <p style="background-color: #f0f8ff; padding: 15px; border-radius: 5px; border-left: 6px solid #007bff; color: #333; font-size: 14px; line-height: 1.5; font-style: italic;">
      ${message}
    </p>
  </div>

  <div style="text-align: center;">
  <a href="mailto:${email}" style="text-decoration: none;">
    <button style="padding: 12px 25px; background-color: #28a745; color: #fff; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; transition: background-color 0.3s ease; font-weight: bold;">
      Liên hệ lại với khách hàng
    </button>
  </a>
</div>
</div>

      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Lỗi khi gửi email:", error);
      return res.status(500).json({ message: "Gửi email thất bại" });
    }
    res
      .status(200)
      .json({ message: "Thông tin của bạn đã được gửi thành công!" });
  });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendForgotPassEmail,
  sendContactEmail,
};