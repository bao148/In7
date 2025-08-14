import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';  // Import CartService
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';   // Import FormsModule
import { VoucherService } from '../../services/voucher.service';  // Import VoucherService
import { AuthService } from '../../auth/auth.service';
import { OrderService } from '../../services/order.service';  // Import OrderService
import { NotyfService } from '../../services/notyf.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  voucherCode: string = ''; // Mã voucher nhập từ người dùng
  appliedVoucher: any = null; // Voucher đã áp dụng
  isLoggedIn: boolean = false;
  userId: string | null = null;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private voucherService: VoucherService, // Inject VoucherService
    private notyfService: NotyfService,
    private authService: AuthService,
    private orderService: OrderService // Inject OrderService
  ) {}

  ngOnInit(): void {
    this.loadCart();
    const savedVoucher = localStorage.getItem('appliedVoucher');
    if (savedVoucher) {
      this.appliedVoucher = JSON.parse(savedVoucher); // Khôi phục voucher từ localStorage
    }
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.userId = localStorage.getItem('userId');
    } else {
      this.userId = null;
    }
  }

  // Tải giỏ hàng từ CartService
  loadCart() {
    this.cartItems = this.cartService.getCartItems();
    const total = this.getTotalWithoutVoucher();
    if (this.appliedVoucher) {
      const voucher = this.appliedVoucher;
      const minAmount = parseFloat(voucher.price);

      if (total < minAmount) {
        localStorage.removeItem('appliedVoucher');
        this.appliedVoucher = null;
      }
    }
  }

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  // Tăng số lượng sản phẩm
  increaseQuantity(item: any) {
    this.productService.getProductById(item.id).subscribe((response: any) => {
      const product = response.product;
      if (item.quantity < product.quantity) {
        item.quantity++;
        this.cartService.updateQuantity(item.id, item.quantity);
        this.loadCart();
      } else {
        this.notyfService.warning('Sản phẩm trong giỏ đã vượt quá tồn kho!');
      }
    });
  }

  // Giảm số lượng sản phẩm
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateQuantity(item.id, item.quantity);
      this.loadCart();
    }
  }

  // Kiểm tra số lượng sản phẩm
  validateQuantity(item: any) {
    this.productService.getProductById(item.id).subscribe((response: any) => {
      const product = response.product;
      if (item.quantity < 1) {
        item.quantity = 1;
      } else if (item.quantity > product.quantity) {
        item.quantity = product.quantity;
        this.notyfService.warning('Sản phẩm trong giỏ đã vượt quá tồn kho!');
      }
      this.cartService.updateQuantity(item.id, item.quantity);
    });
  }

  // Tính tổng tiền không có voucher
  getTotalWithoutVoucher() {
    return this.cartItems.reduce((total, item) => {
      const priceWithDiscount =
        item.discount > 0
          ? item.price - item.price * (item.discount / 100)
          : item.price;
      return total + priceWithDiscount * item.quantity;
    }, 0);
  }

  // Tính tổng tiền có voucher
  getTotal() {
    const total = this.getTotalWithoutVoucher();
    if (this.appliedVoucher) {
      const discount = (this.appliedVoucher.discount_percent / 100) * total;
      return total - discount;
    }
    return total;
  }

  // Xóa tất cả sản phẩm trong giỏ
  clearCart() {
    Swal.fire({
      title: 'Bạn có chắc chắn xóa hết giỏ hàng không?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Xong!', 'Xóa giỏ hàng thành công!', 'success');
        this.cartService.clearCart();
        this.loadCart();
      }
    });
  }

  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName);
  }

  // Áp dụng mã voucher
  applyVoucher() {
    if (!this.isLoggedIn) {
      this.notyfService.warning('Bạn cần đăng nhập để áp dụng voucher!');
      return;
    }
    if (!this.voucherCode) {
      this.notyfService.warning('Vui lòng nhập mã voucher!');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    if (!this.userId) {
      this.notyfService.warning('Không tìm thấy thông tin người dùng!');
      return;
    }

    const userIdNumber = Number(this.userId);
    if (isNaN(userIdNumber)) {
      this.notyfService.error('ID người dùng không hợp lệ!');
      return;
    }

    this.orderService.getOrdersByUserId(userIdNumber).subscribe((response: any) => {
      const orders = response.orders;

      const todayOrders = orders.filter((order: any) => {
        const orderDate = new Date(order.created_at).toISOString().split('T')[0];
        return orderDate === currentDate && order.voucher_code === this.voucherCode;
      });

      if (todayOrders.length > 0) {
        this.notyfService.warning('Voucher này đã được sử dụng hôm nay!');
        return;
      }

      this.voucherService.getAllVouchers().subscribe((voucherResponse: any) => {
        const vouchers = voucherResponse.vouchers;

        const voucher = vouchers.find((v: any) => v.voucher_code === this.voucherCode);

        if (!voucher) {
          this.notyfService.error('Mã voucher không hợp lệ!');
          return;
        }

        const quantityVoucher = voucher.quantity >= 1;
        if (!quantityVoucher) {
          this.notyfService.error('Voucher đã hết số lượng sử dụng!');
          return;
        }

         // Kiểm tra ngày và trạng thái voucher
         const currentDate = new Date();
         const validFrom = new Date(voucher.valid_from);
         const validTo = new Date(voucher.valid_to);
         const isValid = currentDate >= validFrom && currentDate <= validTo && voucher.status === 'active';

        if (!isValid) {
          this.notyfService.warning('Voucher không hợp lệ hoặc đã hết hạn!');
          return;
        }

        const total = this.getTotalWithoutVoucher();
        if (total < parseFloat(voucher.price)) {
          this.notyfService.warning('Giá trị đơn hàng chưa đủ để áp dụng voucher!');
          localStorage.removeItem('appliedVoucher');
          this.appliedVoucher = null;
          return;
        }

        this.appliedVoucher = voucher;
        localStorage.setItem('appliedVoucher', JSON.stringify(voucher));
        this.notyfService.success('Voucher áp dụng thành công!');
      });
    });
  }

  removeVoucher() {
    if (this.appliedVoucher != null) {
      this.notyfService.warning('Voucher đã bị xóa!');
    }
    localStorage.removeItem('appliedVoucher');
    this.appliedVoucher = null;
  }

  convertCommaToDot(value: any): string {
    if (value) {
      return value.toString().replace(/,/g, '.');
    }
    return value;
  }
}


