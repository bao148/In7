import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NotyfService } from '../../services/notyf.service';
import { NotificationService } from '../../services/notification.service'; // Service thông báo

@Component({
  selector: 'app-admin-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-wrapper.component.html',
  styleUrl: './admin-wrapper.component.css',
})
export class AdminWrapperComponent implements OnInit {
  user: any = {
    id: '',
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
  }; // Thông tin người dùng

  notifications: any[] = []; // Danh sách thông báo
  unreadCount: number = 0; // Số thông báo chưa đọc

  isLoggedIn: boolean = false;
  profilePicturePreview: string | null = null; // URL preview ảnh
  hasNewNotification: boolean = false;
  constructor(
    private authService: AuthService,
    private notyfService: NotyfService,
    private router: Router,
    private notificationService: NotificationService,
    private renderer: Renderer2,
  ) {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  ngOnInit(): void {
    this.authService.checkSessionValidity();
    this.fetchUserInfo();
    setInterval(() => this.checkForNewNotifications(), 5000);
  }
  
  fetchUserInfo(): void {
    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.user = {
          id: data.user.id,
          name: data.user.fullname,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber || '',
          address: data.user.address || '',
        };
        this.profilePicturePreview = data.user.profile_picture
          ? data.user.profile_picture
          : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
    
        this.fetchNotifications();
      },
      error: (err) => {
        console.error('Lỗi khi lấy thông tin quản trị:', err);
        this.router.navigate(['/login']);
      },
    });
  }
  

  fetchNotifications(): void {
    this.notificationService.getNotifications(this.user.id).subscribe({
      next: (response) => {
        this.notifications = Array.isArray(response.notifications) ? response.notifications : []; // Trích mảng notifications
        this.unreadCount = this.notifications.filter((n) => !n.is_read).length; // Đếm thông báo chưa đọc
      },
      error: (err) => {
        console.error('Lỗi khi lấy thông báo:', err);
      },
    });
  }
  

  onMarkNotification(notificationId: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
  
    if (isChecked) {
      this.notificationService.markAsRead(notificationId).subscribe({
        next: () => {
          this.notifications = this.notifications.map((n) =>
            n.id === notificationId ? { ...n, is_read: true } : n
          );
          this.unreadCount = this.notifications.filter((n) => !n.is_read).length;
        },
        error: (err) => {
          console.error('Lỗi khi đánh dấu thông báo đã đọc:', err);
        },
      });
    }
  }
  
  

  onLogoutConfirm(): void {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn đăng xuất không?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout().subscribe(
          () => {
            Swal.fire('Xong!', 'Đăng xuất thành công!', 'success');
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Lỗi khi đăng xuất:', error);
            Swal.fire('Lỗi!', 'Đăng xuất thất bại! Vui lòng thử lại!', 'error');
          }
        );
      }
    });
  }
  checkForNewNotifications(): void {
    this.notificationService.getNotifications(this.user.id).subscribe({
      next: (response) => {
        const newNotifications = response.notifications.filter(
          (n) => !n.is_read && !this.notifications.some((o) => o.id === n.id)
        );
        if (newNotifications.length > 0) {
          this.hasNewNotification = true; // Kích hoạt hiệu ứng
          setTimeout(() => (this.hasNewNotification = false), 5000); // Tắt hiệu ứng sau 3 giây
        }
        this.notifications = response.notifications || [];
        this.unreadCount = this.notifications.filter((n) => !n.is_read).length;
      },
      error: (err) => console.error('Lỗi khi kiểm tra thông báo mới:', err),
    });
  }
  
}
