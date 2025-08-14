import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service'; // Import service
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-add-product',
  standalone: true,
  imports: [FormsModule,  CommonModule, ReactiveFormsModule],

  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {
  product: any = {
    name: '',
    price: 0,
    image: null,
    description: '',
    discount: 0,
    quantity: 0,
    status: 'active',
    categories_id: ''
  };
  categories: any[] = [];  // List of categories
  fileError: boolean = false;
  submitted: boolean = false;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCategoriesByStatus();
  }

  getAllCategoriesByStatus(): void {
    this.categoryService.getAllCategoriesByStatus().subscribe(
      (response: any) => {
        this.categories = response.categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        alert('Could not load categories.');
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.fileError = false;
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (allowedTypes.includes(file.type)) {
        this.product.image = file;
      } else {
        this.fileError = true;
      }
    }
  }

  addProduct(): void {
    this.submitted = true;
  
    if (!this.product.categories_id) {
      Swal.fire({
        title: 'Thông báo!',
        text: 'Vui lòng chọn loại sản phẩm!',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6'
      });
      return;
    }
  
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
    formData.append('name', this.product.name);
    formData.append('price', this.product.price.toString());
    formData.append('image', this.product.image);
    formData.append('description', this.product.description);
    formData.append('discount', this.product.discount.toString());
    formData.append('quantity', this.product.quantity.toString());
    formData.append('status', this.product.status);
    formData.append('categories_id', this.product.categories_id);
  
    this.productService.createProduct(formData).subscribe(
      (response) => {
        Swal.fire({
          title: 'Thành công!',
          text: 'Sản phẩm đã được thêm thành công!',
          icon: 'success',
          timer: 2000, // Đóng tự động sau 2 giây
          showConfirmButton: false
        });
        this.router.navigate(['/admin/product']);
      },
      (error) => {
        Swal.fire({
          title: 'Lỗi!',
          text: 'Lỗi khi thêm sản phẩm! Vui lòng kiểm tra lại thông tin.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33'
        });
      }
    );
  }
  
}