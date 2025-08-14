import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NotyfService } from '../../services/notyf.service';

@Component({
  selector: 'app-reset-password',
  standalone: true, // Standalone component
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule, // Để sử dụng Reactive Forms
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  message: string = '';
  error: string = '';
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private notyfService: NotyfService
  ) {
    // Khởi tạo Reactive Form
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Lấy token từ query params
    this.token = this.route.snapshot.queryParams['token'];
    if (!this.token) {
      this.error = 'Xác nhận qua email trước!';
    }
  }
  onSubmit() {
    // Kiểm tra nếu form không hợp lệ
    if (this.resetPasswordForm.invalid) {
      // Lỗi ở trường "password"
      if (this.resetPasswordForm.controls['password'].hasError('required')) {
        this.notyfService.error('Mật khẩu là bắt buộc!');
      } else if (this.resetPasswordForm.controls['password'].hasError('minlength')) {
        this.notyfService.error('Mật khẩu phải trên 6 ký tự!');
      }
  
      // Lỗi ở trường "confirmPassword"
      if (this.resetPasswordForm.controls['confirmPassword'].hasError('required')) {
        this.notyfService.error('Xác nhận mật khẩu là bắt buộc!');
      }
      return; // Ngăn submit khi form không hợp lệ
    }
  
    const { password, confirmPassword } = this.resetPasswordForm.value;
  
    // Kiểm tra mật khẩu không khớp
    if (password !== confirmPassword) {
      this.notyfService.error('Mật khẩu không khớp!');
      return; // Ngăn submit nếu mật khẩu không khớp
    }
  
    // Nếu tất cả đều hợp lệ, gọi API đặt lại mật khẩu
    this.http
      .post('http://localhost:3000/api/reset-password', { token: this.token, newPassword: password })
      .subscribe({
        next: (response: any) => {
          // Hiển thị thông báo thành công với SweetAlert
          Swal.fire({
            title: 'Thành công!',
            text: response.message || 'Mật khẩu của bạn đã được đặt lại.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            this.router.navigate(['/login']); // Điều hướng đến trang đăng nhập
          });
        },
        error: (err) => {
          // Hiển thị lỗi từ server với Notyf
          this.notyfService.error(err.error.message || 'Có lỗi xảy ra!');
        },
      });
  }
  
}
