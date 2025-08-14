





import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ReviewService } from '../../services/review.service';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';  // Import UserService
import { CartService } from '../../services/cart.service'; // Import CartService
import { NotyfService } from '../../services/notyf.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any = {
    name: '',
    price: 0,
    image: null,
    description: '',
    discount: 0,
    quantity: 0,
    status: 'active',
    categories_id: ''
  };
  productId: number | null = null;
  reviews: any[] = [];
  newReview: {
    rating: number;
    comment: string;
    user_id: string | null;
    product_id: number | null;
    reviews_text: string;
  } = {
      rating: 0,
      comment: '',
      user_id: null,
      product_id: null,
      reviews_text: ''
    };
  visibleReviews: number = 3;
  displayOption: string = 'latest'; // Biến để theo dõi tùy chọn hiển thị
  filteredReviews: any[] = []; // Mảng chứa các bình luận đã lọc
  selectedRating: string | null = null;

  userId: string | null = null;
  userName: string | null = null;
  userEmail: string | null = null;
  isLoggedIn: boolean = false;
  quantity: number = 1;  // Số lượng sản phẩm mặc định là 1

  constructor(
    private notyfService: NotyfService,
    private productService: ProductService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,  // Inject UserService
    private router: Router,  // Inject Router
    private cartService: CartService // Inject CartService
  ) { }

  ngOnInit(): void {
    // Lấy thông tin sản phẩm từ URL
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.getProduct(this.productId);
      this.loadReviews(); // Tải đánh giá khi khởi tạo component
    }
  
    // Kiểm tra trạng thái đăng nhập và lấy thông tin người dùng từ localStorage
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.userName = localStorage.getItem('userName');
      this.userEmail = localStorage.getItem('userEmail');
      this.userId = localStorage.getItem('userId');
    } else {
      this.userName = null;
      this.userEmail = null;
      this.userId = null;
    }
  
    // Đặt giá trị mặc định của displayOption là 'all' để hiển thị tất cả bình luận
    this.displayOption = 'all';
    this.filterReviews(); // Áp dụng bộ lọc ngay khi khởi tạo
  }
  

  // Lấy thông tin chi tiết sản phẩm từ API
  getProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (response: any) => {
        this.product = response.product;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    );
  }

  // Lấy URL của hình ảnh sản phẩm
  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName);
  }

  // Hàm giảm số lượng
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Hàm tăng số lượng
  increaseQuantity(): void {
    if (this.quantity < this.product.quantity) {
      this.quantity++;
    }
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(product: any, quantity: number) {
    if (product.quantity > 0) {
      const success = this.cartService.addToCart(product, quantity);  // Gọi service để thêm sản phẩm vào giỏ
  
      if (success) {
        this.notyfService.success('Sản phẩm đã được thêm vào giỏ hàng!');
      } else {
        this.notyfService.warning('Sản phẩm trong giỏ đã vượt quá tồn kho!');
      }
    } else {
      this.notyfService.error('Sản phẩm đã hết hàng!');
    }
  }

  // Validate số lượng sản phẩm
  validateQuantity(): void {
    if (this.quantity < 1) {
      this.quantity = 1;  // Đảm bảo số lượng không nhỏ hơn 1
    } else if (this.quantity > this.product.quantity) {
      this.quantity = this.product.quantity;  // Điều chỉnh lại số lượng nếu vượt quá kho
      this.notyfService.error('Sản phẩm trong giỏ đã vượt quá tồn kho!');
    }
  }

// Tải các đánh giá của sản phẩm và lấy thông tin người dùng
  // Tải các đánh giá của sản phẩm và lấy thông tin người dùng
  loadReviews(): void {
    if (this.productId) {
      this.reviewService.getProductReviews(this.productId).subscribe(
        (data) => {
          // console.log(data); // In ra cấu trúc dữ liệu
          this.reviews = data.reviews;
          this.filterReviews(); // Thực hiện lọc ngay khi tải xong
          this.reviews.forEach((review) => {
            // console.log(review); // Kiểm tra từng đánh giá
            this.reviewService.getUserById(review.user_id).subscribe(
              (userData: any) => {
                review.fullname = userData.user.FullName;
              },
              (error) => {
                console.error('Error fetching user data:', error);
              }
            );
          });
        },
        (error) => {
          console.error('Error loading reviews:', error);
        }
      );
    }
  }
// Hàm setRatingFilter để lọc theo rating đã chọn
setRatingFilter(rating: string | null): void {
  this.selectedRating = rating;

  // Nếu người dùng chọn rating, chỉ hiển thị các đánh giá có rating tương ứng
  if (rating && rating !== '') {
    this.filteredReviews = this.reviews.filter(review => review.rating.toString() === rating);
  } else {
    // Nếu không chọn rating (hoặc rating là rỗng), hiển thị tất cả các đánh giá
    this.filteredReviews = [...this.reviews];
  }

  // Debug log để kiểm tra kết quả
  console.log('Filtered Reviews (Rating):', this.filteredReviews);
}


loadMore(): void {
  if (this.displayOption === 'all') {
    this.visibleReviews = this.filteredReviews.length; // Hiển thị tất cả bình luận khi chọn "Tất cả bình luận"
  } else {
    this.visibleReviews += 3; // Tăng số lượng bình luận hiển thị mỗi lần nhấn
  }
}


setDisplayOption(option: string): void {
  this.displayOption = option;
  this.filterReviews(); // Gọi lại hàm lọc sau khi thay đổi tùy chọn
}

  
  
filterReviews(): void {
  // Nếu displayOption là 'all', ta luôn hiển thị tất cả bình luận
  if (this.displayOption === 'all') {
    // Lấy tất cả các bình luận từ mảng reviews
    this.filteredReviews = [...this.reviews];

    // Reset rating filter khi chọn "all"
    this.selectedRating = null; // Xóa bộ lọc theo sao

    // Hiển thị tối đa 4 bình luận đầu tiên khi chưa chọn "Xem thêm"
    this.visibleReviews = Math.min(this.filteredReviews.length, 4);
    return; // Không cần xử lý thêm
  }

  // Nếu lựa chọn không phải 'all', xử lý theo displayOption (latest)
  const currentDate = new Date();
  const threeDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 3));

  let reviewsToFilter = [...this.reviews];

  // Nếu chọn 'latest', sắp xếp các đánh giá theo ngày giảm dần
  if (this.displayOption === 'latest') {
    reviewsToFilter = reviewsToFilter.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime();  // Sắp xếp từ mới nhất đến cũ nhất
    });
  }

  // Áp dụng bộ lọc rating nếu có
  if (this.selectedRating && this.selectedRating !== '') {
    reviewsToFilter = reviewsToFilter.filter(
      review => review.rating.toString() === this.selectedRating
    );
  }

  // Cập nhật lại mảng filteredReviews sau khi đã lọc
  this.filteredReviews = reviewsToFilter;

  // Điều chỉnh số lượng bình luận hiển thị
  this.visibleReviews = Math.min(this.filteredReviews.length, 4);
}



  // Gửi đánh giá của người dùng
  submitReview(): void {
    if (this.isLoggedIn) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.newReview.user_id = userId;
        this.newReview.product_id = this.productId;
  
        // Đảm bảo rằng comment được gửi đúng
        this.newReview.reviews_text = this.newReview.comment;
  
        this.reviewService.addReview(this.newReview).subscribe(
          (response) => {
            console.log('Đánh giá thành công:', response);
            Swal.fire('Thành công', 'Gửi đánh giá thành công!', 'success');
            this.loadReviews(); // Tải lại các đánh giá sau khi gửi thành công
          },
          (error) => {
            console.error('Lỗi khi gửi đánh giá:', error);
            // Kiểm tra mã lỗi trả về từ API
            if (error.status === 403) {
              Swal.fire('Thất bại', error.error.message, 'error'); // Hiển thị thông báo lỗi từ backend
            } else if (error.status === 400) {
              // Kiểm tra nội dung thông báo từ API
              if (error.error.message === 'Bạn đã đánh giá sản phẩm không thể đánh giá nữa') {
                Swal.fire('Thất bại', 'Bạn đã đánh giá sản phẩm này, không thể đánh giá thêm!', 'error');
              } else {
                Swal.fire('Thất bại', error.error.message, 'error'); // Hiển thị thông báo lỗi khác từ API
              }
            } else {
              Swal.fire('Thất bại', 'Gửi đánh giá không thành công!', 'error');
            }
          }
        );
      } else {
        Swal.fire('Thất bại', 'Không tìm thấy thông tin người dùng!', 'error');
      }
    } else {
      // Nếu người dùng chưa đăng nhập, điều hướng họ đến trang đăng nhập
      Swal.fire('Thất bại', 'Bạn cần đăng nhập để gửi đánh giá!', 'error');
      this.router.navigate(['/login']);
    }
  }
  
  convertCommaToDot(value: any): string {
    if (value) {
      return value.toString().replace(/,/g, '.');  // Thay tất cả dấu phẩy bằng dấu chấm
    }
    return value;
  }
  formatPriceWithDot(value: number): string {
    return value.toLocaleString('vi-VN').replace(/,/g, '.');
  }

}

//ts