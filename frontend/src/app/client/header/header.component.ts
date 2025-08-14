import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service'; 
import { AuthService } from '../../auth/auth.service';
import Swal from 'sweetalert2'; // Import SweetAlert2

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchValue: string = '';
  cartItems: any[] = [];
  recognition: any;
  isSpeechRecognitionSupported: boolean = false;
  isLoggedIn: boolean = false;  // Trạng thái đăng nhập
  user: any = {
    name: '',
    profile_picture: '',
  };
  profilePicturePreview: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {
    // Speech Recognition initialization
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'vi-VN'; 
      this.isSpeechRecognitionSupported = true;

      this.recognition.onresult = (event: any) => {
        this.searchValue = event.results[0][0].transcript.trim();
        this.searchValue = this.searchValue.replace(/[.,?(){}[\]!@#$%^&*;:"'<>]/g, '');
        this.onSearchSubmit(new Event('submit'));
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech Recognition error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          alert('Chức năng nhận diện giọng nói bị chặn hoặc không được phép trên trình duyệt này.');
        } else {
          alert('Không thể nhận diện giọng nói, vui lòng thử lại!');
        }
      };
    } 
  }

  ngOnInit(): void {
    this.loadCart();
    this.fetchUserInfo();
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  fetchUserInfo(): void {
    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.isLoggedIn = true;  // Người dùng đã đăng nhập
        this.user = {
          name: data.user.fullname,
          profile_picture: data.user.profile_picture || '',
        };
        this.profilePicturePreview = this.user.profile_picture
          ? this.user.profile_picture
          : 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
      },
      error: (err) => {
console.error('Lỗi khi lấy thông tin người dùng:', err);
        this.isLoggedIn = false;  // Người dùng chưa đăng nhập
        this.router.navigate(['/login']);
      },
    });
  }

  onLogoutConfirm(): void {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn đăng xuất không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout().subscribe(() => {
          Swal.fire('Đăng xuất thành công!', '', 'success');
          this.isLoggedIn = false;  // Cập nhật trạng thái đăng xuất
          this.router.navigate(['/']).then(() => {
            window.location.reload(); // Tải lại trang
          });
        });
      }
    });
  }
  
  onSearchSubmit(event: Event): void {
    event.preventDefault();
    if (this.searchValue.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.searchValue } }).then(() => {
        window.location.reload();
      });
    }
  }

  startVoiceSearch(): void {
    if (this.isSpeechRecognitionSupported) {
      this.recognition.start();
    } else {
      alert('Chức năng nhận diện giọng nói không khả dụng trên trình duyệt của bạn.');
    }
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
  }
}