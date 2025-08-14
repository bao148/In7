// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // getCategories() {
  //   throw new Error('Method not implemented.');
  // }
  private baseUrl = environment.apiUrl + "/products";
  private imageUrl = environment.imageUrl; 

  constructor(private http: HttpClient) {}

  // Lấy danh sách sản phẩm
  getAllProducts() {
    return this.http.get(this.baseUrl);
  }

  // Lấy sản phẩm theo ID
  getProductById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Thêm sản phẩm mới
  createProduct(product: FormData) {
    return this.http.post(this.baseUrl, product);
  }

  // Cập nhật sản phẩm
  updateProduct(id: number, product: FormData) {
    return this.http.put(`${this.baseUrl}/${id}`, product);
  }

  // Xóa sản phẩm
  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Thêm phương thức để lấy URL hình ảnh
  getImageUrl(imageName: string): string {
    return `${this.imageUrl}/${imageName}`;
  }

  // Tìm kiếm sản phẩm
  searchProducts(value: string) {
    // Cập nhật đường dẫn API để sử dụng path params thay vì query string
    return this.http.get(`${this.baseUrl}/search/${value}`);
  }
    // Lấy danh sách sản phẩm
    getAllProductsByStatus() {
      return this.http.get(`${this.baseUrl}/bystatus`);
    }
    // Lấy danh sách danh mục
    getAllCategoriesByStatus(){
      return this.http.get(`${this.baseUrl}/bystatus`);
    }
  
}