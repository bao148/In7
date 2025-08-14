import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostCategoryService } from '../../../services/postcategory.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-add-post',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './admin-add-post.component.html',
  styleUrl: './admin-add-post.component.css'
})
export class AdminAddPostComponent {
  postcategory: any = {
    name: '',
    image_url: null
  };

  fileError: boolean = false;

  constructor(private postCategoryService: PostCategoryService, private router: Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.fileError = false; // Reset lỗi

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (allowedTypes.includes(file.type)) {
        this.postcategory.image_url = file;
      } else {
        this.fileError = true; // Đặt lỗi nếu tệp không hợp lệ
      }
    }
  }

  createPostCategory(): void {
    if (this.fileError) {
      Swal.fire({
        title: 'Lỗi!',
        text: 'Vui lòng chọn tệp hình ảnh hợp lệ.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33'
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', this.postcategory.name);
    formData.append('image_url', this.postcategory.image_url);

    this.postCategoryService.createPostCategory(formData).subscribe(
      (response) => {
        Swal.fire({
          title: 'Thành công!',
          text: 'Danh mục đã được thêm!',
          icon: 'success',
          timer: 2000, // Đóng tự động sau 2 giây
          showConfirmButton: false
        });
        this.router.navigate(['/admin/postCategory']);
      },
      (error) => {
        Swal.fire({
          title: 'Lỗi!',
          text: 'Lỗi khi thêm danh mục! Vui lòng kiểm tra lại thông tin.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33'
        });
      }
    );
  }
}
