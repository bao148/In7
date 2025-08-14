// category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  addCategory(formData: FormData) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = environment.apiUrl + "/category";  // Changed from /posts to /category
  private imageUrl = environment.imageUrl; 
  private apiUrl = 'http://localhost:3000/api/category'; // Địa chỉ API của bạn
  constructor(private http: HttpClient) {}

  // Lấy danh sách danh mục
  getAllCategories(){
    return this.http.get(this.baseUrl);
  }
  // Lấy danh sách danh mục
  getAllCategoriesByStatus(){
    return this.http.get(`${this.baseUrl}/bystatus`);
  }

  // Lấy danh mục theo ID
  getCategoryById(id: number){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Thêm danh mục mới
  createCategory(category: FormData) {
    return this.http.post(this.baseUrl, category);
  }

  // Cập nhật danh mục
  updateCategory(id: number, category: FormData) {
    return this.http.put(`${this.baseUrl}/${id}`, category);
  }

  // Xóa danh mục
  deleteCategory(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Thêm phương thức để lấy URL hình ảnh
  getImageUrl(imageName: string): string {
    return `${this.imageUrl}/${imageName}`;
  }
    
  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
