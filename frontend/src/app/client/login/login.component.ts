import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Thêm CommonModule
import Swal from 'sweetalert2';
declare var gapi: any;
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  signupForm: FormGroup;
  showPassword: boolean = false;

  errorMessage: string = '';

  signupErrorMessage: string = '';
  isSignupVisible: boolean = false;
  successMessage: string = '';
  userName: string | null;
  userEmail: string | null;
  phoneNumber: string | null;
  address: string | null;
  isLoggedIn: boolean = false;

  isPopupVisible: boolean = false;
  popupMessage: string = '';
  isSuccess: boolean = true;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    // Khởi tạo form đăng nhập
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // Khởi tạo form đăng ký
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]], // Thêm trường name
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // Kiểm tra đăng nhập
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
      this.userName = localStorage.getItem('userName');
      this.userEmail = localStorage.getItem('userEmail');
      this.phoneNumber = localStorage.getItem('phoneNumber');
      this.address = localStorage.getItem('address');
    } else {
      this.userName = null;
      this.userEmail = null;
      this.phoneNumber = null;
      this.address = null;
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  ngOnInit(): void {
    this.authService.loadGoogleSignIn();
  }
  handleSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.onLogin(username, password);
    }
  }

  onLogin(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      (response) => {
        if (response.metadata.tokens && response.metadata.tokens.accessToken) {
          Swal.fire('Xong!', 'Đăng nhập thành công!', 'success');
          setTimeout(() => {this.router.navigate(['/']);}, 2000);
        } else {
          Swal.fire('Lỗi!', 'Có lỗi xảy ra trong quá trình đăng nhập!', 'error');
        }
      },
      (error) => {
        Swal.fire('Lỗi!', 'Có lỗi trong quá trình đăng nhập hoặc tài khoản của bạn bị khóa ! Vui lòng thử lại', 'error');
      }
    );
  }
}
