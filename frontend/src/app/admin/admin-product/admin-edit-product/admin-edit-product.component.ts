import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-edit-product',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.css']
})

export class AdminEditProductComponent implements OnInit {
  productForm: FormGroup;
  productId: number | null = null;
  categories: any[] = [];  // Lưu danh sách danh mục

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,  // Inject CategoryService
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Khởi tạo form với các điều kiện xác thực
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      image: [null],
      description: ['', Validators.required],
      discount: [0, [Validators.min(0), Validators.max(770)]],
      quantity: [0, [Validators.required, Validators.min(1)]],
      status: ['active', Validators.required],
      categories_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.getProduct(this.productId);
    }
    this.getAllCategoriesByStatus();  // Lấy danh sách danh mục khi khởi tạo
  }

  // Lấy danh sách danh mục từ API
  getAllCategoriesByStatus(): void {
    this.categoryService.getAllCategoriesByStatus().subscribe(
      (response: any) => {
        this.categories = response.categories;  // Giả sử response có thuộc tính categories
      },
      (error) => {
        console.error('Lỗi khi lấy danh mục:', error);
        alert('Không thể tải danh mục sản phẩm.');
      }
    );
  }


  // Lấy thông tin sản phẩm theo ID
  getProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (response: any) => {
        this.productForm.patchValue(response.product);
      },
      (error) => {
        console.error('Lỗi khi lấy sản phẩm:', error);
        alert('Không thể tải thông tin sản phẩm.');
      }
    );
  }

  // Xử lý khi người dùng thay đổi hình ảnh
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ image: file });
    }
  }

  // Cập nhật sản phẩm
  updateProduct(): void {
    if (this.productForm.invalid) {
      Swal.fire({
        title: 'Thông báo!',
        text: 'Vui lòng kiểm tra lại thông tin sản phẩm!',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6'
      });
      return;
    }
  
    const formData = new FormData();
    Object.keys(this.productForm.controls).forEach(key => {
      if (key === 'image' && this.productForm.get('image')?.value) {
        formData.append(key, this.productForm.get('image')?.value);
      } else {
        formData.append(key, this.productForm.get(key)?.value);
      }
    });
  
    if (this.productId) {
      this.productService.updateProduct(this.productId, formData).subscribe(
        (response) => {
          Swal.fire({
            title: 'Thành công!',
            text: 'Sản phẩm đã được cập nhật!',
            icon: 'success',
            timer: 2000, // Đóng tự động sau 2 giây
            showConfirmButton: false
          });
          this.router.navigate(['/admin/product']);
        },
        (error) => {
          console.error('Lỗi khi cập nhật sản phẩm:', error);
          Swal.fire({
            title: 'Lỗi!',
            text: 'Có lỗi xảy ra, vui lòng thử lại.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#d33'
          });
        }
      );
    }
  }
  
}