import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service'; // Import UserService
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Thêm CommonModule
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  signupForm: FormGroup;

  errorMessage: string = '';
  signupErrorMessage: string = '';
  successMessage: string = '';

  isPopupVisible: boolean = false;
  popupMessage: string = '';
  isSuccess: boolean = true;

  constructor(
    private authService: AuthService,
    private userService: UserService, // Inject UserService
    private router: Router,
    private fb: FormBuilder
  ) {
    // Khởi tạo form đăng ký
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        this.passwordValidator, // Custom password validator
      ]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatchValidator } // Custom validator
  );
  }
   // Custom password validator: kiểm tra chữ hoa, chữ thường, số và ký tự đặc biệt
   passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    if (password) {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasNumber = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (!hasUpperCase) {
        return { uppercase: true };
      }
      if (!hasNumber) {
        return { number: true };
      }
      if (!hasSpecialChar) {
        return { specialChar: true };
      }
    }
    return null;
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  showPopup(message: string, isSuccess: boolean) {
    this.popupMessage = message;
    this.isSuccess = isSuccess;
    this.isPopupVisible = true;
    setTimeout(() => this.closePopup(), 2000);
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  handleSignup() {
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;
      this.authService.signup(name, email, password).subscribe(
        (response) => {
          if (response.metadata?.tokens?.accessToken) {

            // Gửi email chúc mừng
            this.userService.sendWelcomeEmail(email, name).subscribe(
              () => {
                console.log('Email chúc mừng đã được gửi thành công');
              },
              (error) => {
                console.error('Lỗi gửi email chúc mừng:', error);
              }
            );

            Swal.fire('Chúc mừng!', 'Đăng ký thành công!', 'success');
            // Điều hướng sau khi đăng ký thành công
            setTimeout(() => {
              this.router.navigate(['/user']);
            }, 2000);
          } else {
            this.signupErrorMessage = 'Đăng ký không thành công. Vui lòng thử lại.';
          }
        },
        (error) => {
          console.error('Lỗi đăng ký:', error);
          Swal.fire('Lỗi!', 'Địa chỉ mail đã được sử dụng. Vui lòng thử lại!', 'error');
        }
      );
    }
  }
}
