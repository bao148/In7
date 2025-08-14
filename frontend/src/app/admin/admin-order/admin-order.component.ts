import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';  // Import service
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Import FormsModule
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-order',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule],
  providers: [OrderService],
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {
  orders: any[] = [];  // Lưu trữ tất cả các đơn hàng
  filteredOrders: any[] = [];  // Lưu trữ các đơn hàng đã lọc
  activeTab: string = 'processing';  // Tab đang chọn, mặc định là 'processing'
  
  currentPage: number = 1;  // Trang hiện tại
  pageSize: number = 10;  // Số đơn hàng mỗi trang
  totalOrders: number = 0;  // Tổng số đơn hàng
  searchTerm: string = '';  // Từ khóa tìm kiếm

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getAllOrders();  // Lấy tất cả đơn hàng khi khởi tạo
  }

  // Lấy tất cả đơn hàng từ dịch vụ
  getAllOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (response: any) => {
        this.orders = response.orders;  // Lưu trữ đơn hàng
        this.totalOrders = this.orders.length;  // Cập nhật tổng số đơn hàng
        this.filterOrdersByStatus();  // Lọc đơn hàng theo trạng thái tab hiện tại
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu đơn hàng:', error);
      }
    );
  }

  // Đặt tab hoạt động và lọc đơn hàng theo trạng thái
  setActiveTab(status: string): void {
    this.activeTab = status;
    this.filterOrdersByStatus();  // Lọc đơn hàng khi thay đổi tab
  }

  // Lọc đơn hàng theo trạng thái của tab và từ khóa tìm kiếm
  filterOrdersByStatus(): void {
    let filtered = this.orders;

    if (this.activeTab === 'processing') {
      filtered = filtered.filter(order => order.status === 'processing');
    } else if (this.activeTab === 'delivering') {
      filtered = filtered.filter(order => order.status === 'delivering');
    } else if (this.activeTab === 'canceled') {
      filtered = filtered.filter(order => order.status === 'canceled');
    } else if (this.activeTab === 'completed') {
      filtered = filtered.filter(order => order.status === 'completed');
    }

    if (this.searchTerm) {
      filtered = filtered.filter(order => 
        order.fullname?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    

    this.totalOrders = filtered.length;  // Cập nhật tổng số đơn hàng sau khi lọc
    this.filteredOrders = filtered.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);  // Phân trang
  }

  // Lấy class CSS cho trạng thái đơn hàng
  getStatusClass(status: string): string {
    switch (status) {
      case 'processing':
        return 'bg-warning';  // Màu vàng cho "Chờ xử lý"
      case 'delivering':
        return 'bg-primary';  // Màu xanh dương cho "Đang giao"
      case 'canceled':
        return 'bg-danger';   // Màu đỏ cho "Đã hủy"
      case 'completed':
        return 'bg-success';  // Màu xanh lá cho "Hoàn thành"
      default:
        return '';
    }
  }

  // Lấy nhãn cho trạng thái đơn hàng
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

  updateOrderStatus(order: any): void {
    // Chỉ xử lý khi trạng thái là processing hoặc delivering
    if (order.status !== 'processing' && order.status !== 'delivering') {
      return;
    }
  
    let cancelActionClicked = false;
  
    Swal.fire({
      title: 'Xác nhận hành động',
      html: order.status === 'processing'
        ? '<p>Bạn muốn duyệt hoặc hủy đơn hàng này?</p>'
        : '<p>Bạn muốn hoàn thành đơn hàng này?</p>',
      showCancelButton: true, // Nút "Hủy thao tác"
      cancelButtonText: 'Hủy thao tác',
      confirmButtonText: order.status === 'processing' ? 'Duyệt đơn' : 'Hoàn thành đơn',
      allowOutsideClick: false,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-secondary',
        actions: 'swal2-actions-custom' // Thêm class tùy chỉnh
      },
      didRender: () => {
        // Lấy container của các nút
        const actionsContainer = document.querySelector('.swal2-actions');
  
        // Chỉ thêm nút "Hủy đơn" nếu trạng thái là "processing"
        if (order.status === 'processing') {
          const cancelOrderButton = document.createElement('button');
          cancelOrderButton.textContent = 'Hủy đơn';
          cancelOrderButton.className = 'btn btn-danger';
          cancelOrderButton.id = 'cancelOrder';
  
          // Thêm nút "Hủy đơn" vào trước nút "Hủy thao tác"
          const cancelButton = document.querySelector('.swal2-cancel');
          actionsContainer?.insertBefore(cancelOrderButton, cancelButton);
  
          // Gán sự kiện cho nút "Hủy đơn"
          document.getElementById('cancelOrder')?.addEventListener('click', () => {
            cancelActionClicked = true;
            const canceledOrder = { ...order, status: 'canceled' };
            this.orderService.UpDateStatus(order.id, canceledOrder).subscribe(
              (response) => {
                order.status = 'canceled';
                Swal.fire('Đơn hàng đã bị hủy!', '', 'error');
                this.filterOrdersByStatus();
              },
              (error) => {
                Swal.fire('Lỗi!', 'Có lỗi khi hủy đơn hàng.', 'error');
              }
            );
            Swal.close();
          });
        }
      }
    }).then((result) => {
      if (result.isConfirmed && !cancelActionClicked) {
        // Cập nhật trạng thái tương ứng
        const updatedOrder = { ...order, status: order.status === 'processing' ? 'delivering' : 'completed' };
        this.orderService.UpDateStatus(order.id, updatedOrder).subscribe(
          (response) => {
            order.status = updatedOrder.status;
            Swal.fire(
              order.status === 'delivering'
                ? 'Duyệt đơn thành công!'
                : 'Hoàn thành đơn hàng thành công!',
              '',
              'success'
            );
            this.filterOrdersByStatus();
          },
          (error) => {
            Swal.fire('Lỗi!', 'Có lỗi xảy ra khi cập nhật đơn hàng.', 'error');
          }
        );
      }
    });
  }
  
  
  
  
  
  
  // Phương thức phân trang
  nextPage(): void {
    if (this.currentPage * this.pageSize < this.totalOrders) {
      this.currentPage++;
      this.filterOrdersByStatus();  // Lọc lại khi thay đổi trang
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filterOrdersByStatus();  // Lọc lại khi thay đổi trang
    }
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.filterOrdersByStatus();  // Lọc lại khi chọn trang
  }

  // Getter để tính tổng số trang
  get totalPages(): number {
    return Math.ceil(this.totalOrders / this.pageSize);  // Tính tổng số trang
  }

  convertCommaToDot(value: any): string {
    if (value) {
      return value.toString().replace(/,/g, '.');  // Thay tất cả dấu phẩy bằng dấu chấm
    }
    return value;
  }
  
}