import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { NotyfService } from '../../services/notyf.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true, // Định nghĩa component là standalone
  imports: [
    CommonModule, // Cần thiết cho *ngIf, *ngFor
    RouterLink,
    ReactiveFormsModule, // Cần thiết cho Reactive Forms
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  message: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private notyfService: NotyfService) {
    // Khởi tạo form
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
  
    if (this.forgotPasswordForm.invalid) {
      // Kiểm tra lỗi validate và hiển thị thông báo phù hợp
      if (this.forgotPasswordForm.controls['email'].hasError('required')) {
        this.notyfService.error('Email là bắt buộc!');
      } else if (this.forgotPasswordForm.controls['email'].hasError('email')) {
        this.notyfService.error('Vui lòng nhập đúng định dạng email!');
      }
      return; // Ngăn submit khi form không hợp lệ
    }
  
    this.http
      .post('http://localhost:3000/api/forgot-password', this.forgotPasswordForm.value)
      .subscribe({
        next: (response: any) => {
          // Hiển thị thông báo thành công bằng SweetAlert
          Swal.fire({
            title: 'Thành công!',
            text: response.message || 'Yêu cầu đặt lại mật khẩu đã được gửi.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.message = response.message;
          this.error = '';
        },
        error: (err) => {
          // Hiển thị thông báo lỗi từ server bằng Notyf
          this.notyfService.warning('Có lỗi xảy ra! Vui lòng thử lại!');
          this.error = err.error.message || 'Có lỗi xảy ra!';
          this.message = '';
        },
      });
  }
  
  
}
