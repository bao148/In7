import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule để dùng *ngIf
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule để dùng formGroup

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],  // Thêm CommonModule và ReactiveFormsModule vào đây
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Xử lý logic đăng nhập
      console.log('Form Submitted', this.loginForm.value);
      this.router.navigate(['/index']);
    } else {
      console.log('Form is invalid');
    }
  }
}
