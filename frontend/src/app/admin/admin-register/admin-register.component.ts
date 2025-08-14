import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],  // Thêm CommonModule vào imports
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css'] // Sửa lại "styleUrl" thành "styleUrls"
})
export class AdminRegisterComponent {
  // Khởi tạo form với validators
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  // Hàm xử lý submit form
  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form Submitted', this.registerForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  // Các getter để lấy giá trị và trạng thái của các form control
  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
}
