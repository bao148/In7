import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html'
})
export class AdminProductAddComponent {
  @ViewChild('form') form!: NgForm;
  fileError = false;
  fileErrorMessage = '';

  category: any = {
    category_name: '',
    description: '',
    images: null,
    status: 'inactive',
    created_at: '',
    updated_at: ''
  };

  constructor(private categoryService: CategoryService, private router: Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/png'];

    if (file) {
      if (validImageTypes.includes(file.type)) {
        this.category.images = file;
        this.fileError = false;
        this.fileErrorMessage = '';
      } else {
        this.fileError = true;
        this.fileErrorMessage = 'Chỉ chấp nhận file ảnh JPEG hoặc PNG!';
        this.category.images = null;
      }
    }
  }

  addCategory(): void {
    if (this.form.invalid) {
      this.form.form.markAllAsTouched();
      return;
    }

    // Tạo FormData và thêm các dữ liệu cần thiết
    const formData = this.prepareFormData();

    this.createCategory(formData);
  }

  prepareFormData() {
    const formData = new FormData();
    formData.append('category_name', this.category.category_name);
    formData.append('description', this.category.description);
    if (this.category.images) {
      formData.append('images', this.category.images);
    }
    formData.append('status', this.category.status);
    formData.append('created_at', new Date().toISOString());
    formData.append('updated_at', new Date().toISOString());
    return formData;
  }

  createCategory(formData: FormData) {
    this.categoryService.createCategory(formData).subscribe(
      (response) => {
        this.successNotification(); // Gọi thông báo thành công
        this.router.navigate(['/admin/productCategory']);
      },
      (error) => {
        this.errorNotification(); // Gọi thông báo thất bại
      }
    );
  }

  successNotification() {
    Swal.fire('Thành công!', 'Danh mục đã được thêm!', 'success');
  }

  errorNotification() {
    Swal.fire('Thất bại!', 'Lỗi khi thêm danh mục!', 'error');
  }
}
