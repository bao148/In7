import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { PaymentService } from '../../services/payment.service'; // Import PaymentService
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NotyfService } from '../../services/notyf.service';

@Component({
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  user: any = {
    id: '', // ID người dùng
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
  }; // Thông tin người dùng

  tinhThanh: any[] = [];
  quanHuyen: any[] = [];
  phuongXa: any[] = [];
  selectedTinh: string = '';
  selectedQuan: string = '';
  selectedPhuong: string = '';

  selectedPhuongName: string = '';
  selectedQuanName: string = '';
  selectedTinhName: string = '';

  // Biến lỗi để kiểm tra địa chỉ
  addressError: string = '';
  errors = {
    address: '',
    tinh: '',
    quan: '',
    phuong: '',
    phone: '',
  };

  isLoggedIn: boolean = false;

  isPopupVisible: boolean = false;
  popupMessage: string = '';
  isSuccess: boolean = true;

  profilePicture: File | null = null; // Lưu trữ file ảnh
  profilePicturePreview: string | null = null; // URL preview ảnh

  constructor(
    private paymentService: PaymentService,
    private http: HttpClient, // Inject HttpClient
    private authService: AuthService,
    private notyfService: NotyfService,
    private router: Router
  ) {
    this.isLoggedIn = this.authService.isAuthenticated();
  }
  ngOnInit(): void {
    this.authService.checkSessionValidity();
    setInterval(() => {
      this.authService.checkSessionValidity();
    }, 5 * 60 * 1000); // Kiểm tra sau mỗi 5 phút
    this.authService.getUserInfo().subscribe({
      next: (data) => {
        this.user = {
          id: data.user.id,
          name: data.user.fullname,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber || '',
          address: data.user.address || '',
        };
        // Nếu profile_picture có giá trị, thiết lập preview URL
        this.profilePicturePreview = data.user.profile_picture
        ? data.user.profile_picture // URL đầy đủ từ backend
        : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; // Ảnh mặc định nếu không có hình
    
        // Phân tách địa chỉ thành các phần
        const addressParts = this.user.address
          .split(',')
          .map((part: string) => part.trim());
        this.user.address = addressParts[0] || ''; // Địa chỉ chi tiết (số nhà, tên đường)
        this.selectedPhuong = addressParts[1] || '';
        this.selectedQuan = addressParts[2] || '';
        this.selectedTinh = addressParts[3] || '';
  
        // Tải dữ liệu cho dropdown
        this.loadTinhThanh();
      },
      error: (err) => {
        console.error('Lỗi khi lấy thông tin người dùng:', err);
        this.router.navigate(['/login']);
      },
    });
  }
  
  onLogoutConfirm() {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn đăng xuất không?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning', // Các giá trị khác: success, error, info, question
      showCancelButton: true, // Hiển thị nút "Cancel"
      confirmButtonColor: '#3085d6', // Màu nút xác nhận
      cancelButtonColor: '#d33', // Màu nút hủy
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout().subscribe(
          () => {
            Swal.fire('Xong!', 'Đăng xuất thành công!', 'success');
            setTimeout(() => {
              this.isLoggedIn = false;  // Cập nhật trạng thái đăng xuất
            this.router.navigate(['/']).then(() => {
              window.location.reload(); // Tải lại trang
          });
            }, 2000);
          },
          (error) => {
            console.error('Lỗi khi đăng xuất:', error);
            Swal.fire('Lỗi!', 'Đăng xuất thất bại! Vui lòng thử lại!', 'error');
          }
        );
      } else if (result.isDismissed) {
        Swal.fire('Đã hủy!', 'Bạn đã hủy đăng xuất!', 'info');
      }
    });
    
  }

  validateAddress(): boolean {
    let isValid = true;
    // Kiểm tra số điện thoại
    const phoneRegex = /^[0-9]{10,11}$/; // Chỉ cho phép số điện thoại 10-11 chữ số
    if (!this.user.phoneNumber || !phoneRegex.test(this.user.phoneNumber)) {
      this.errors.phone =
        'Số điện thoại không hợp lệ. Vui lòng nhập đúng số điện thoại.';
      isValid = false;
    } else {
      this.errors.phone = ''; // Xóa lỗi nếu hợp lệ
    }
    // Kiểm tra địa chỉ chi tiết
    if (!this.user.address || this.user.address.trim() === '') {
      this.errors.address = 'Vui lòng nhập địa chỉ chi tiết.';
      isValid = false;
    } else {
      this.errors.address = ''; // Xóa lỗi nếu hợp lệ
    }

    // Kiểm tra Tỉnh
    if (!this.selectedTinh) {
      this.errors.tinh = 'Vui lòng chọn Tỉnh/Thành phố.';
      isValid = false;
    } else {
      this.errors.tinh = ''; // Xóa lỗi nếu hợp lệ
    }

    // Kiểm tra Quận
    if (!this.selectedQuan) {
      this.errors.quan = 'Vui lòng chọn Quận/Huyện.';
      isValid = false;
    } else {
      this.errors.quan = ''; // Xóa lỗi nếu hợp lệ
    }

    // Kiểm tra Phường
    if (!this.selectedPhuong) {
      this.errors.phuong = 'Vui lòng chọn Phường/Xã.';
      isValid = false;
    } else {
      this.errors.phuong = ''; // Xóa lỗi nếu hợp lệ
    }

    return isValid;
  }

  // Lấy danh sách Tỉnh Thành từ API
  loadTinhThanh() {
    this.http.get<any>('https://esgoo.net/api-tinhthanh/1/0.htm').subscribe((data) => {
      if (data.error === 0) {
        this.tinhThanh = data.data;
  
        // Tìm và lưu thông tin tên đầy đủ của tỉnh
        const tinhObj = this.tinhThanh.find(
          (tinh) => tinh.full_name === this.selectedTinh
        );
        if (tinhObj) {
          this.selectedTinh = tinhObj.id; // Lưu ID để tải Quận/Huyện
          this.selectedTinhName = tinhObj.full_name; // Lưu tên
          this.loadQuanHuyen();
        }
      }
    });
  }
  
  loadQuanHuyen() {
    if (this.selectedTinh) {
      this.http.get<any>(`https://esgoo.net/api-tinhthanh/2/${this.selectedTinh}.htm`).subscribe((data) => {
        if (data.error === 0) {
          this.quanHuyen = data.data;
  
          // Tìm và lưu thông tin tên đầy đủ của quận
          const quanObj = this.quanHuyen.find(
            (quan) => quan.full_name === this.selectedQuan
          );
          if (quanObj) {
            this.selectedQuan = quanObj.id; // Lưu ID để tải Phường/Xã
            this.selectedQuanName = quanObj.full_name; // Lưu tên
            this.loadPhuongXa();
          }
        }
      });
    }
  }
  
  loadPhuongXa() {
    if (this.selectedQuan) {
      this.http.get<any>(`https://esgoo.net/api-tinhthanh/3/${this.selectedQuan}.htm`).subscribe((data) => {
        if (data.error === 0) {
          this.phuongXa = data.data;
  
          // Tìm và lưu thông tin tên đầy đủ của phường
          const phuongObj = this.phuongXa.find(
            (phuong) => phuong.full_name === this.selectedPhuong
          );
          if (phuongObj) {
            this.selectedPhuong = phuongObj.id; // Lưu ID
            this.selectedPhuongName = phuongObj.full_name; // Lưu tên
          }
        }
      });
    }
  }
  

  // Phương thức điều hướng
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  // Xử lý khi người dùng chọn file ảnh
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.profilePicture = file;
  
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePicturePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.notyfService.warning('Vui lòng chọn file ảnh hợp lệ!');
    }
  }

  // Cập nhật thông tin người dùng
  updateUser() {
    if (!this.validateAddress()) return;
  
    const selectedTinhName =
      this.tinhThanh.find((tinh) => tinh.id === this.selectedTinh)?.full_name || '';
    const selectedQuanName =
      this.quanHuyen.find((quan) => quan.id === this.selectedQuan)?.full_name || '';
    const selectedPhuongName =
      this.phuongXa.find((phuong) => phuong.id === this.selectedPhuong)?.full_name || '';
  
    const fullAddress = `${this.user.address}, ${selectedPhuongName}, ${selectedQuanName}, ${selectedTinhName}`;
  
    const formData = new FormData();
    formData.append('id', this.user.id);
    formData.append('name', this.user.name);
    formData.append('email', this.user.email);
    formData.append('phoneNumber', this.user.phoneNumber);
    formData.append('address', fullAddress); // Địa chỉ đầy đủ
  // Kiểm tra xem có ảnh mới được chọn hay không
  if (this.profilePicture) {
    formData.append('profilePicture', this.profilePicture);
  } else {
    formData.append('currentProfilePicture', this.profilePicturePreview || ''); // Truyền ảnh hiện tại nếu không có ảnh mới
  }
    const apiUrl = `http://localhost:3000/api/profile/${this.user.id}`;
    this.http.put(apiUrl, formData).subscribe({
      next: (response: any) => {
        this.notyfService.success('Cập nhật thông tin thành công!');
      },
      error: (error) => {
        console.error('Lỗi khi cập nhật thông tin:', error);
        this.notyfService.error('Cập nhật thông tin thất bại!');
      },
    });
  }
  
  resetLink() {
    const userEmail = this.user.email; // Lấy email từ thông tin người dùng
    const apiUrl = 'http://localhost:3000/api/forgot-password';
  
    this.http.post(apiUrl, { email: userEmail }).subscribe({
      next: (response: any) => {
        this.notyfService.success('Link đặt lại mật khẩu đã được gửi đến email của bạn!')
      },
      error: (error) => {
        console.error('Lỗi khi gửi link đặt lại mật khẩu:', error);
        this.notyfService.error('Không thể gửi link đặt lại mật khẩu. Vui lòng thử lại!');
      },
    });
  }
  
  
}
