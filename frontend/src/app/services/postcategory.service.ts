// postcategory.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostCategoryService {
  private baseUrl = environment.apiUrl + "/postcategory"; // Đổi URL sang postcategory
  private imageUrl = environment.imageUrl; 

  constructor(private http: HttpClient) {}

  // Lấy danh sách danh mục
  getAllPostCategories() {
    return this.http.get(this.baseUrl);
  }
  // Lấy danh sách danh mục
  getAllPostCategoriesByStatus() {
    return this.http.get(`${this.baseUrl}/bystatus`);
  }

  // Lấy danh mục theo ID
  getPostCategoryById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Thêm danh mục mới
  createPostCategory(postCategory: FormData) {
    return this.http.post(this.baseUrl, postCategory);
  }

  // Cập nhật danh mục
  updatePostCategory(id: number, postCategory: FormData) {
    return this.http.put(`${this.baseUrl}/${id}`, postCategory);
  }

  // Xóa danh mục
  deletePostCategory(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Thêm phương thức để lấy URL hình ảnh
  getImageUrl(imageName: string): string {
    return `${this.imageUrl}/${imageName}`;
  }
}
