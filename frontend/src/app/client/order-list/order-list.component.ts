import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../auth/auth.service';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orders: any[] = []; // Danh sách đơn hàng
  userID: String | null = null; // ID người dùng hiện tại
  isLoggedIn: boolean = false;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Kiểm tra đăng nhập
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.userID = localStorage.getItem('userId');
    }
    if (this.userID) {
      this.loadOrders(Number(this.userID)); // Gọi loadOrders và chuyển đổi userID thành số
    }
  }

  // Tải danh sách đơn hàng
  loadOrders(userID: number): void {
    this.orderService.getOrdersByUserId(userID).subscribe({
      next: (response) => {
        this.orders = response.orders; // Trích xuất mảng orders
        console.log('Danh sách đơn hàng:', this.orders);
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách đơn hàng:', err);
      },
    });
  }

  // Xử lý hủy đơn hàng
cancelOrder(order: any): void {
  // Chỉ cho phép hủy đơn nếu trạng thái là "processing"
  if (order.status !== 'processing') {
    return; // Không làm gì nếu trạng thái không phải là "processing"
  }

  // Hiển thị cửa sổ xác nhận hủy đơn
  Swal.fire({
    title: 'Bạn có chắc chắn muốn hủy đơn hàng này?',
    text: 'Hành động này không thể hoàn tác.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Hủy Đơn',
    cancelButtonText: 'Quay lại',
    customClass: {
      confirmButton: 'btn btn-danger',
      cancelButton: 'btn btn-secondary',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Cập nhật trạng thái đơn hàng thành 'canceled'
      this.orderService.UpDateStatus(order.id, { status: 'canceled' }).subscribe(
        (response) => {
          order.status = 'canceled';  // Update trạng thái trong local
          Swal.fire('Đã hủy đơn!', 'Đơn hàng của bạn đã được hủy.', 'success');
        },
        (error) => {
          console.error('Lỗi khi hủy đơn:', error);
          Swal.fire('Lỗi!', 'Không thể hủy đơn hàng lúc này. Vui lòng thử lại.', 'error');
        }
      );
    }
  });
}

  
    // Lấy class theo trạng thái đơn hàng
    getStatusClass(status: string): string {
      switch (status) {
        case 'processing':
          return 'bg-warning';  // Yellow for processing
        case 'delivering':
          return 'bg-primary';  // Blue for delivering
        case 'canceled':
          return 'bg-danger';   // Red for canceled
        case 'completed':
          return 'bg-success';  // Green for completed
        default:
          return '';
      }
    }
    // Lấy nhãn cho trạng thái
    getStatusLabel(status: string): string {
      switch (status) {
        case 'processing':
          return 'Chờ xử lý';
        case 'delivering':
          return 'Đang giao';
        case 'canceled':
          return 'Đã hủy';
        case 'completed':
          return 'Hoàn thành';
        default:
          return 'Chưa xác định';
      }
    }
    convertCommaToDot(value: any): string {
      if (value) {
        return value.toString().replace(/,/g, '.');  // Thay tất cả dấu phẩy bằng dấu chấm
      }
      return value;
    }
    
  }