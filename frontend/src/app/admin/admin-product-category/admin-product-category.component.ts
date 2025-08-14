import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-admin-product-category',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './admin-product-category.component.html',
  styleUrls: ['./admin-product-category.component.css']
})
export class AdminProductCategoryComponent {
  categories: any[] = [];
  filteredCategories: any[] = [];
  parentCategories: any[] = [];
  
  searchTerm: string = '';
  selectedParentCategory: string = '';
  selectedStatus: string = '';
  
  currentPage: number = 1; // Current page
  itemsPerPage: number = 10; // Items per page

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response.categories;
        this.filteredCategories = this.categories;
        this.parentCategories = this.categories.filter(category => !category.parent_categoryID);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  filterCategories(): void {
    this.filteredCategories = this.categories.filter(category => {
      const matchesSearchTerm = category.category_name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesParentCategory = this.selectedParentCategory
        ? category.parent_categoryID == this.selectedParentCategory
        : true;
      const matchesStatus = this.selectedStatus
        ? category.status === this.selectedStatus
        : true;

      return matchesSearchTerm && matchesParentCategory && matchesStatus;
    });
  }

  getImageUrl(imageName: string): string {
    return this.categoryService.getImageUrl(imageName);
  }

  deleteCategory(id: number): void {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: 'Bạn có muốn xóa danh mục này không?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có, xóa ngay!',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe(
          () => {
            this.categories = this.categories.filter(category => category.id !== id);
            this.filterCategories();
            Swal.fire({
              title: 'Thành công!',
              text: 'Danh mục đã được xóa thành công!',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
          },
          (error) => {
            Swal.fire({
              title: 'Lỗi!',
              text: 'Lỗi khi xóa danh mục!',
              icon: 'error'
            });
            console.error('Error deleting category:', error);
          }
        );
      }
    });
  }
}
