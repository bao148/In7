import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule,FormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  successMessage = '';  // Khởi tạo biến successMessage
  errorMessage = '';    // Khởi tạo biến errorMessage


  constructor(private userService: UserService, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      company: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Vui lòng kiểm tra thông tin nhập vào.',
      });
      return;
    }
  
    this.isSubmitting = true;
  
    this.userService.sendContactEmail(this.contactForm.value).subscribe(
      (response) => {
        this.isSubmitting = false;
        Swal.fire({
          icon: 'success',
          title: 'Thành công',
          text: response.message || 'Gửi thành công!',
        });
        this.contactForm.reset();
      },
      (error) => {
        this.isSubmitting = false;
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại.',
        });
        console.error(error);
      }
    );
  }
  
}