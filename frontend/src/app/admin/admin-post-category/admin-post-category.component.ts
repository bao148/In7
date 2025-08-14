import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostCategoryService } from '../../services/postcategory.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-admin-post-category',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './admin-post-category.component.html',
  styleUrls: ['./admin-post-category.component.css']
})
export class AdminPostCategoryComponent implements OnInit {
  postcategories: any[] = [];  
  filteredCategories: any[] = [];  
  searchTerm: string = '';  

  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number = 10; // Số mục hiển thị mỗi trang

  constructor(private postCategoryService: PostCategoryService) {}

  ngOnInit(): void {
    this.getAllCategories();  
  }

  getAllCategories(): void {
    this.postCategoryService.getAllPostCategories().subscribe(
      (response: any) => {
        this.postcategories = response.postcategories;  
        this.filteredCategories = this.postcategories;  
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  filterCategories(): void {
    if (this.searchTerm) {
      this.filteredCategories = this.postcategories.filter(category =>
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCategories = this.postcategories;
    }
  }

  getImageUrl(imageName: string): string {
    return this.postCategoryService.getImageUrl(imageName);  
  }
  // Function to delete a category
  deleteCategory(id: number): void {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn xóa danh mục này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có, xóa!',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.postCategoryService.deletePostCategory(id).subscribe(
          () => {
            // Cập nhật danh sách danh mục sau khi xóa
            this.postcategories = this.postcategories.filter(category => category.id !== id);
            
            // Hiển thị thông báo thành công
            Swal.fire({
              title: 'Thành công!',
              text: 'Xóa danh mục thành công!',
              icon: 'success',
              timer: 2000, // Đóng tự động sau 2 giây
              showConfirmButton: false
            }).then(() => {
              // Làm mới trang sau khi thông báo thành công
              window.location.reload(); // Cách này sẽ làm mới toàn bộ trang
            });
          },
          (error) => {
            // Hiển thị thông báo lỗi
            Swal.fire({
              title: 'Lỗi!',
              text: 'Lỗi khi xóa danh mục!',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33'
            });
            console.error('Error deleting category:', error);
          }
        );
      }
    });
  }
}