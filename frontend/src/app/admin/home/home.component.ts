import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProductService } from '../../services/product.service';
import { PostService } from '../../services/post.service';
import { VoucherService } from '../../services/voucher.service';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';  // Import service
import { HttpClient } from '@angular/common/http';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // Dữ liệu
  totalProductCount: number = 0;
  totalQuantity: number = 0;

  totalPostCount: number = 0;
  totalDrafts: number = 0;
  totalPublished: number = 0;

  totalVoucherCount: number = 0;
  totalActiveVouchers: number = 0;
  totalInactiveVouchers: number = 0;

  totalUserCount: number = 0;
  totalActiveUsers: number = 0;
  totalInactiveUsers: number = 0;

  totalOrderCount: number = 0;
  totalDeliveringOrders: number = 0;
  totalCanceledOrders: number = 0;
  totalProcessingOrders: number = 0;
  totalCompletedOrders: number = 0;
  constructor(
    private productService: ProductService,
    private postService: PostService,
    private voucherService: VoucherService,
    private userService: UserService,
    private orderService: OrderService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Lấy dữ liệu từ API
    this.getAllProducts();
    this.getAllPosts();
    this.getAllVouchers();
    this.getAllUsers();
    this.getAllOrders();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.totalProductCount = response.products.length;
        this.totalQuantity = response.products.reduce((sum: number, product: any) => sum + product.quantity, 0);

        // Vẽ biểu đồ sản phẩm
        this.createProductChart();
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    );
  }

  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(
      (response: any) => {
        this.totalPostCount = response.posts.length;
        this.totalPublished = response.posts.filter((post: any) => post.status === 'published').length;
        this.totalDrafts = response.posts.filter((post: any) => post.status === 'draft').length;

        // Vẽ biểu đồ bài viết
        this.createPostChart();
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error);
      }
    );
  }

  getAllVouchers(): void {
    this.voucherService.getAllVouchers().subscribe(
      (response: any) => {
        this.totalVoucherCount = response.vouchers.length;
        this.totalActiveVouchers = response.vouchers.filter((voucher: any) => voucher.status === 'active').length;
        this.totalInactiveVouchers = response.vouchers.filter((voucher: any) => voucher.status === 'inactive').length;

        // Vẽ biểu đồ voucher
        this.createVoucherChart();
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu voucher:', error);
      }
    );
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        this.totalUserCount = response.users.length;
        this.totalActiveUsers = response.users.filter((user: any) => user.Status === 'active').length;
        this.totalInactiveUsers = response.users.filter((user: any) => user.Status === 'inactive').length;
        // Vẽ biểu đồ người dùng
        this.createUserChart();
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      }
    );
  }

  getAllOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (response: any) => {
        this.totalOrderCount = response.orders.length;
        this.totalDeliveringOrders = response.orders.filter((order: any) => order.status === 'delivering').length;
        this.totalCanceledOrders = response.orders.filter((order: any) => order.status === 'canceled').length;
        this.totalProcessingOrders = response.orders.filter((order: any) => order.status === 'processing').length;
        this.totalCompletedOrders = response.orders.filter((order: any) => order.status === 'completed').length;

        // Vẽ biểu đồ đơn hàng
        this.createOrderChart();
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu đơn hàng:', error);
      }
    );
  }

  // Tạo biểu đồ
  createProductChart(): void {
    new Chart('productChart', {
      type: 'pie',
      data: {
        labels: ['Sản phẩm', 'Tồn kho'],
        datasets: [
          {
            label: 'Số lượng',
            data: [this.totalProductCount, this.totalQuantity],
            backgroundColor: ['#42A5F5', '#66BB6A'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });
  }

  createPostChart(): void {
    new Chart('postChart', {
      type: 'pie',
      data: {
        labels: ['Xuất bản', 'Nháp'],
        datasets: [
          {
            label: 'Bài viết',
            data: [this.totalPublished, this.totalDrafts],
            backgroundColor: ['#00FF99', '#00FFFF'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });
  }

  createVoucherChart(): void {
    new Chart('voucherChart', {
      type: 'doughnut',
      data: {
        labels: ['Kích hoạt', 'Không kích hoạt'],
        datasets: [
          {
            label: 'Voucher',
            data: [this.totalActiveVouchers, this.totalInactiveVouchers],
            backgroundColor: ['#26A69A', '#EF5350'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });
  }

  createUserChart(): void {
    new Chart('userChart', {
      type: 'doughnut',
      data: {
        labels: ['Kích hoạt', 'Không kích hoạt'],
        datasets: [
          {
            label: 'Tổng số người dùng',
            data: [this.totalActiveUsers, this.totalInactiveUsers],
            backgroundColor: ['#008000', '#EF5350'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true, // Hiển thị chú giải
          },
        },
      },
    });
  }
  

  createOrderChart(): void {
    new Chart('orderChart', {
      type: 'bar', // Đổi từ 'line' sang 'bar'
      data: {
        labels: ['Tổng đơn', 'Đang giao', 'Đã hủy', 'Hoàn thành', 'Đang xử lý'], // Nhãn cho các cột
        datasets: [
          {
            label: 'Đơn hàng',
            data: [
              this.totalOrderCount,
              this.totalDeliveringOrders,
              this.totalCanceledOrders,
              this.totalCompletedOrders,
              this.totalProcessingOrders,
            ],
            backgroundColor: [
              '#5C6BC0', // Tổng đơn
              '#42A5F5', // Đã giao
              '#EF5350', // Đã hủy
              '#66BB6A', // Hoàn thành
              '#FFFF66', // Đang xử lý
            ],
            borderColor: '#000', // Viền của cột (nếu cần)
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true, // Hiển thị chú thích
          },
        },
        scales: {
          x: {
            beginAtZero: true, // Đảm bảo cột bắt đầu từ 0
          },
          y: {
            beginAtZero: true, // Đảm bảo giá trị trục Y bắt đầu từ 0
          },
        },
      },
    });
  }
  
}
