import { Component, OnInit } from '@angular/core';
// import { CategoriesService } from '../../../services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-product-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-product-edit.component.html',
  styleUrl: './admin-product-edit.component.css'
})

export class AdminProductEditComponent implements OnInit {
  category: any = {
    category_name: '',
    description: '',
    images: null,
    status: 'inactive',
    created_at: '',
    updated_at: ''
  };
  categoryId: number | null = null;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.categoryId) {
      this.getCategory(this.categoryId);
    }
  }

  getCategory(id: number): void {
    this.categoryService.getCategoryById(id).subscribe(
      (response: any) => {
        this.category = response.category;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu danh mục:', error);
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.category.images = file;
    }
  }

  updateCategory(categoryForm: NgForm): void {
    if (categoryForm.invalid) {
      // Hiển thị thông báo lỗi khi form không hợp lệ
      Swal.fire({
        title: 'Lỗi!',
        text: 'Vui lòng điền đầy đủ thông tin và kiểm tra các lỗi!',
        icon: 'warning'
      });
      return;
    }

    const formData = new FormData();
    formData.append('category_name', this.category.category_name);
    formData.append('description', this.category.description);
    if (this.category.images) {
      formData.append('images', this.category.images);
    }
    formData.append('status', this.category.status);
    formData.append('created_at', this.category.created_at);
    formData.append('updated_at', this.category.updated_at);

    if (this.categoryId) {
      this.categoryService.updateCategory(this.categoryId, formData).subscribe(
        (response) => {
          Swal.fire({
            title: 'Thành công!',
            text: 'Danh mục đã được cập nhật!',
            icon: 'success'
          }).then(() => {
            this.router.navigate(['/admin/productCategory']);
          });
        },
        (error) => {
          console.error('Lỗi khi cập nhật danh mục:', error);
          Swal.fire({
            title: 'Lỗi!',
            text: 'Lỗi khi cập nhật danh mục!',
            icon: 'error'
          });
        }
      );
    }
  }
}

