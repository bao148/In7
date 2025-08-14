import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostCategoryService } from '../../../services/postcategory.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-edit-post',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './admin-edit-post.component.html',
  styleUrl: './admin-edit-post.component.css'
})

export class AdminEditPostComponent {
  postcategory: any = {
    name: '',
    parentCategoryID: null,
    image_url: null,
    status: 'active',
    created_at: '',
    updated_at: ''
  };
  postCategoryId: number | null = null;
  isFileImage: boolean = false;

  constructor(
    private postCategoryService: PostCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.postCategoryId) {
      this.getPostCategory(this.postCategoryId);
    }
  }

  getPostCategory(id: number): void {
    this.postCategoryService.getPostCategoryById(id).subscribe(
      (response: any) => {
        this.postcategory = response.postcategory;
        // Kiểm tra xem image_url có phải là một file hay không
        this.isFileImage = this.postcategory.image_url instanceof File;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu danh mục bài viết:', error);
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.postcategory.image_url = file;
      this.isFileImage = true;  // Đánh dấu là file khi người dùng chọn
    }
  }

  validateForm(): boolean {
    if (!this.postcategory.name) {
      alert('Vui lòng nhập tên danh mục!');
      return false;
    }
    if (this.postcategory.parentCategoryID !== null && this.postcategory.parentCategoryID < 0) {
      alert('ID danh mục cha phải lớn hơn hoặc bằng 0!');
      return false;
    }
    if (!this.postcategory.image_url && !this.isFileImage) {
      alert('Vui lòng chọn hình ảnh!');
      return false;
    }
    return true;
  }

  updatePostCategory(): void {
    if (!this.validateForm()) {
      return;
    }
  
    const formData = new FormData();
    formData.append('name', this.postcategory.name);
    formData.append('parentCategoryID', this.postcategory.parentCategoryID || '');
    if (this.isFileImage) {
      formData.append('image_url', this.postcategory.image_url);
    }
    formData.append('status', this.postcategory.status);
    formData.append('created_at', this.postcategory.created_at);
    formData.append('updated_at', this.postcategory.updated_at);
  
    if (this.postCategoryId) {
      this.postCategoryService.updatePostCategory(this.postCategoryId, formData).subscribe(
        (response) => {
          // Hiển thị thông báo thành công
          Swal.fire({
            title: 'Thành công!',
            text: 'Danh mục bài viết đã được cập nhật!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            // Chuyển hướng về trang danh mục sau khi cập nhật
            this.router.navigate(['/admin/postCategory']);
          });
        },
        (error) => {
          // Hiển thị thông báo lỗi
          Swal.fire({
            title: 'Lỗi!',
            text: 'Lỗi khi cập nhật danh mục bài viết!',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    }
  }
  
}
