import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';  // Import service
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryService } from '../../services/category.service';
@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule],
  providers: [ProductService],
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  filteredProducts: any[] = [];
  // filteredProducts: any[] = [];
  priceForm: FormGroup;
  loading: boolean = true;

  // Pagination variables
  currentPage: number = 1;
  itemsPerPage: number = 10;

  // Filtering variables
  searchTerm: string = '';
  selectedPriceRange: string = '';
  selectedStatus: string = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder) {
    this.priceForm = this.fb.group({
      minPrice: [null],
      maxPrice: [null],
      categoryId: [null],
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.loading = true;

    this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response.products;
        this.filterProducts();
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    );
  }

  getAllCategoriesByStatus(): void {
    this.categoryService.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response.categories;
        // this.filteredCategories = this.categories;
        // this.parentCategories = this.categories.filter(category => !category.parent_categoryID);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      return (
        (this.searchTerm ? product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true) &&
        (this.selectedPriceRange ? this.filterByPriceRange(product.price) : true) &&
        (this.selectedStatus ? product.status === this.selectedStatus : true)
      );
    });
  }

  filterByPriceRange(price: number): boolean {
    if (this.selectedPriceRange === 'low') return price < 1000000;
    if (this.selectedPriceRange === 'medium') return price >= 1000000 && price <= 5000000;
    if (this.selectedPriceRange === 'high') return price > 5000000;
    return true;
  }

  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName);
  }

  deleteProduct(id: number): void {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có, xóa!',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(
          () => {
            this.products = this.products.filter(product => product.id !== id);
            this.filterProducts();
            Swal.fire('Thành công!', 'Sản phẩm đã được xóa!', 'success');
          },
          (error) => {
            console.error('Lỗi khi xóa sản phẩm:', error);
            Swal.fire('Lỗi!', 'Không thể xóa sản phẩm!', 'error');
          }
        );
      }
    });
  }
  convertCommaToDot(value: any): string {
    if (value) {
      return value.toString().replace(/,/g, '.');  // Thay tất cả dấu phẩy bằng dấu chấm
    }
    return value;
  }
  
}