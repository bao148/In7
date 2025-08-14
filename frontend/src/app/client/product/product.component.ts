import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';  
import { CategoryService } from '../../services/category.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { NotyfService } from '../../services/notyf.service';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-product',  
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './product.component.html', 
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  filteredProducts: any[] = [];
  priceFilter: number = 0;
  nameFilter: string = '';
  minPrice: number = 0;
  maxPrice: number = 0;
  selectedCategory: number | null = null;
  selectedCategoryName: string = '';
  quantity: number = 1;

  itemsPerPage: number = 9; // Số sản phẩm mỗi trang
  currentPage: number = 1; // Trang hiện tại

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private notyfService: NotyfService
  ) {}

  ngOnInit(): void {
    this.getAllProductsByStatus();
    this.getAllCategoriesByStatus();
  }

  // Lấy tất cả sản phẩm từ API
  getAllProductsByStatus(): void {
    this.productService.getAllProductsByStatus().subscribe(
      (response: any) => {
        this.products = response.products;
        this.filteredProducts = this.products;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    );
  }

  // Lấy tất cả danh mục sản phẩm từ API
  getAllCategoriesByStatus(): void {
    this.categoryService.getAllCategoriesByStatus().subscribe(
      (response: any) => {
        this.categories = response.categories;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu danh mục:', error);
      }
    );
  }

  // Phân trang: Lấy sản phẩm cho trang hiện tại
  get paginatedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
  }

  // Tổng số trang
  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  // Chuyển đến trang
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  // Thêm sản phẩm vào giỏ hàng
  addToCart(product: any, quantity: number) {
    if (product.quantity > 0) {
      const success = this.cartService.addToCart(product, quantity);

      if (success) {
        this.notyfService.success('Sản phẩm đã được thêm vào giỏ hàng!');
      } else {
        this.notyfService.warning('Sản phẩm trong giỏ đã vượt quá tồn kho!');
      }
    } else {
      this.notyfService.warning('Sản phẩm đã hết hàng!');
    }
  }

  // Sắp xếp sản phẩm
  sortProducts(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const sortOption = selectElement.value;

    switch (sortOption) {
      case 'name_asc':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price_asc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        this.filteredProducts = [...this.products];
        break;
    }
    this.currentPage = 1; // Reset về trang đầu
  }

  // Áp dụng bộ lọc
  // applyFilters(): void {
  //   this.filteredProducts = this.products.filter(product => {
  //     const isPriceInRange = (this.minPrice ? product.price >= this.minPrice : true) &&
  //                            (this.maxPrice ? product.price <= this.maxPrice : true);
  //     const isNameMatch = this.nameFilter.trim() === '' || product.name.toLowerCase().includes(this.nameFilter.toLowerCase());
  //     const isCategoryMatch = this.selectedCategory ? product.categories_id === this.selectedCategory : true;

  //     return isPriceInRange && isNameMatch && isCategoryMatch;
  //   });
  //   this.currentPage = 1; // Reset về trang đầu
  // }

  // Lọc sản phẩm theo danh mục
  filterByCategory(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const categoryId = selectElement.value === 'null' ? null : parseInt(selectElement.value, 10);

    this.selectedCategory = categoryId;

    if (categoryId) {
      const selectedCategory = this.categories.find(c => c.id === categoryId);
      this.selectedCategoryName = selectedCategory ? selectedCategory.category_name : '';
    } else {
      this.selectedCategoryName = '';
    }

    this.applyFilters();
  }

  // Lấy URL của ảnh sản phẩm
  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName);
  }
  // đổi giá qua dấu chấm,
// vất hàm này vào ts:
convertCommaToDot(value: any): string {
  if (value) {
    return value.toString().replace(/,/g, '.');  // Thay tất cả dấu phẩy bằng dấu chấm
  }
  return value;
}

// thay cái applyFilters bằng đoạn sau:

  // Hàm loại bỏ dấu tiếng Việt và chuyển thành chữ thường
  removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }
  // Áp dụng bộ lọc
  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      const isPriceInRange = (this.minPrice ? product.price >= this.minPrice : true) &&
                             (this.maxPrice ? product.price <= this.maxPrice : true);
      // const isNameMatch = this.nameFilter.trim() === '' || product.name.toLowerCase().includes(this.nameFilter.toLowerCase());
         // Loại bỏ dấu và chuyển thành chữ thường để so sánh
         const isNameMatch = this.nameFilter.trim() === '' || this.removeAccents(product.name).includes(this.removeAccents(this.nameFilter));
      const isCategoryMatch = this.selectedCategory ? product.categories_id === this.selectedCategory : true;

      return isPriceInRange && isNameMatch && isCategoryMatch;
    });
    this.currentPage = 1; // Reset về trang đầu
  }
  
}