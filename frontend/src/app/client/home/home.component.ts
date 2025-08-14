import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { PostService } from '../../services/post.service'; // Import PostService
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { NotyfService } from '../../services/notyf.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: any[] = []; // Tất cả sản phẩm
  newestProducts: any[] = []; // Sản phẩm mới nhất
  posts: any[] = []; // Danh sách bài viết
  quantity: number = 1;
  filteredProducts: any[] = [];

  constructor(
    private productService: ProductService,
    private postService: PostService, // Inject PostService
    private cartService: CartService,
    private notyfService: NotyfService
  ) {}

  ngOnInit(): void {
    this.getNewestProducts(); // Lấy sản phẩm mới nhất
    this.getAllPosts(); // Lấy danh sách bài viết
    this.getAllProductsByStatus();
    }

  // Lấy danh sách sản phẩm mới nhất
  getNewestProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response.products;
        this.newestProducts = this.products
          .sort((a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
          .slice(0, 8); // Giới hạn 8 sản phẩm
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    );
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

  // Lấy danh sách bài viết
  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(
      (response: any) => {
        this.posts = response.posts.slice(0, 3); // Lấy tối đa 6 bài viết
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error);
      }
    );
  }

  // Lấy URL hình ảnh
  getImageUrl(imageName: string): string {
    return this.productService.getImageUrl(imageName);
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
  convertCommaToDot(value: any): string {
    if (value) {
      return value.toString().replace(/,/g, '.');  // Thay tất cả dấu phẩy bằng dấu chấm
    }
    return value;
  }
  
}
