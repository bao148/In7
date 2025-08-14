const unidecode = require('unidecode');
const { OpenAI } = require("openai");
const db = require('../config/db'); // Nhập db từ config

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // API Key từ file .env
});

const chatbotController = async (req, res) => {
    const { message } = req.body;
    try {
      // Chuyển tin nhắn thành chữ thường và loại bỏ dấu để kiểm tra từ khóa
      const lowerCaseMessage = unidecode(message).toLowerCase();

      // Các nhóm từ khóa chung
      const keywordGroups = {
        webFeatures: ["chuc nang web", "chuc nang chinh", "tinh nang chinh", "web co chuc nang gi", "chuc nang cua web"],
        contactInfo: ["dia chi","d/c", "shop o dau", "o dau", "shop o cho nao"],
        phoneInfo: ["so dien thoai", "sdt"],
        emailInfo: ["email"],
        workingHours: ["gio mo cua", "mo cua gio nao", "mo cua may gio"],
        searchFunction: ["tim kiem"],
        filterFunction: ["loc san pham", "loc"],
        purchasePayment: ["mua hang", "thanh toan"],
        loginRegister: ["dang nhap", "dang ky"],
        infoUs: ["thong tin lien he", "thong tin web", "thong tin website", "cach lien he", "lien he"],
      };

      // Kiểm tra các nhóm từ khóa
      const checkKeywords = (group) => group.some(keyword => lowerCaseMessage.includes(keyword));

      // Xử lý câu hỏi về các chức năng chính
      if (checkKeywords(keywordGroups.webFeatures)) {
        return res.json({
          reply: `Xin chào! Chúng tôi rất vui khi được hỗ trợ bạn. Website của chúng tôi cung cấp các chức năng chính giúp bạn mua sắm thuận tiện hơn:
          1. **Tìm kiếm**: Bạn có thể tìm kiếm sản phẩm theo tên, danh mục hoặc sử dụng giọng nói để tìm kiếm nhanh chóng.
          2. **Lọc sản phẩm**: Lọc sản phẩm theo các tiêu chí như giá, tên sản phẩm hoặc danh mục để bạn dễ dàng lựa chọn.
          3. **Mua hàng và thanh toán**: Bạn có thể thêm sản phẩm vào giỏ hàng và thanh toán khi nhận hàng hoặc thanh toán trực tuyến qua thẻ ngân hàng.
          4. **Đăng nhập**: Bạn có thể đăng nhập bằng tài khoản đã đăng ký hoặc sử dụng tài khoản Google để tiết kiệm thời gian.
          Chúng tôi luôn sẵn sàng đồng hành cùng bạn trong suốt quá trình mua sắm!`.trim(),
        });
      }

      if (checkKeywords(keywordGroups.contactInfo)) {
        return res.json({
          reply: "Xin cảm ơn bạn đã quan tâm! Địa chỉ của chúng tôi là: 88 Nguyễn Văn Cừ, Quận Ninh Kiều, Cần Thơ.",
        });
      }

      if (checkKeywords(keywordGroups.phoneInfo)) {
        return res.json({
          reply: "Chúng tôi rất hân hạnh được phục vụ bạn. Số điện thoại liên hệ của chúng tôi là: 097 114 1140.",
        });
      }

      if (checkKeywords(keywordGroups.emailInfo)) {
        return res.json({
          reply: "Cảm ơn bạn đã liên hệ! Email hỗ trợ khách hàng của chúng tôi là: cskh@in7.com.vn.",
        });
      }

      if (checkKeywords(keywordGroups.workingHours)) {
        return res.json({
          reply: "Chúng tôi luôn sẵn sàng phục vụ bạn trong giờ làm việc từ 8:00 AM đến 5:00 PM, hàng ngày.",
        });
      }

      // Xử lý câu hỏi về các chức năng cụ thể
      if (checkKeywords(keywordGroups.searchFunction)) {
        return res.json({
          reply: "Chức năng tìm kiếm của chúng tôi cho phép bạn tìm kiếm nhanh chóng theo tên sản phẩm, danh mục hoặc qua giọng nói. Hãy thử ngay để trải nghiệm nhé!",
        });
      }

      if (checkKeywords(keywordGroups.filterFunction)) {
        return res.json({
          reply: "Chức năng lọc sản phẩm giúp bạn dễ dàng tìm kiếm những sản phẩm phù hợp với nhu cầu, như giá, tên sản phẩm hoặc danh mục. Chúng tôi hy vọng điều này sẽ giúp bạn chọn lựa được sản phẩm ưng ý.",
        });
      }

      if (checkKeywords(keywordGroups.purchasePayment)) {
        return res.json({
          reply: "Với chức năng mua hàng và thanh toán, bạn có thể thêm sản phẩm vào giỏ hàng và thanh toán khi nhận hàng hoặc thanh toán trực tuyến qua tài khoản của bạn. Chúng tôi cam kết mang đến trải nghiệm mua sắm tiện lợi và an toàn.",
        });
      }

      if (checkKeywords(keywordGroups.loginRegister)) {
        return res.json({
          reply: "Bạn có thể đăng nhập bằng tài khoản đã đăng ký hoặc thông qua tài khoản Google để tiết kiệm thời gian. Chúng tôi rất hân hạnh được phục vụ bạn!",
        });
      }

      if (checkKeywords(keywordGroups.infoUs)) {
        return res.json({
          reply: "Thông tin liên hệ của chúng tôi như sau: - Địa chỉ:  88 Nguyễn Văn Cừ, Quận Ninh Kiều, Cần Thơ. - Số điện thoại: 097 114 1140. - Email: cskh@in7.com.vn - Nếu bạn cần thêm thông tin hoặc có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi. Chúng tôi luôn sẵn lòng hỗ trợ bạn.!",
        });
      }
      // Kiểm tra dữ liệu sản phẩm và bài viết trong cơ sở dữ liệu
      const productSql = 'SELECT id, name, description, price FROM products WHERE status = "active"';
      const [products] = await db.query(productSql);

      const postSql = 'SELECT id, title, content FROM posts WHERE status = "published"';
      const [posts] = await db.query(postSql);

      const productList = products.map(
        (product) => `- ${product.name} - Giá: ${product.price} VND - Chi tiết: ${product.description}` 
      ).join("\n");

      const postList = posts.map(
        (post) => `- ${post.title} - ${post.content.substring(0, 100)}...`
      ).join("\n");

      const context = `
        Bạn là một chatbot hỗ trợ bán hàng cho website nội thất.
        Danh sách sản phẩm hiện có:
        ${productList}
        Danh sách bài viết hiện có:
        ${postList}
        Bạn có thể trả lời câu hỏi liên quan đến sản phẩm, bài viết, giá cả, hoặc các chính sách.
        Nếu không có thông tin, hãy trả lời: "Xin lỗi, tôi không tìm thấy thông tin phù hợp. Bạn có thể hỏi về các vấn đề mua hàng, thanh toán và các sản phẩm nội thất của website chúng tôi."
      `.trim();

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: context },
          { role: "user", content: message },
        ],
        max_tokens: 1000,
      });

      const reply = response.choices[0]?.message?.content || "Xin lỗi, tôi không thể xử lý yêu cầu của bạn. Bạn có thể hỏi về các vấn đề mua hàng, thanh toán và các sản phẩm nội thất của website chúng tôi.";
      res.json({ reply });
    } catch (error) {
      console.error("Error during OpenAI API request:", error.message);
      res.status(500).json({ error: "Xin lỗi, đã có lỗi xảy ra khi kết nối đến API. Xin vui lòng thử lại sau." });
    }
};

  
  
module.exports = chatbotController;
