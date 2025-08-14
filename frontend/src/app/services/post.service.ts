// post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = environment.apiUrl + "/posts";
  private imageUrl = environment.imageUrl; 

  constructor(private http: HttpClient) {}

  // Lấy danh sách bài viết
  getAllPosts(){
    return this.http.get(this.baseUrl);
  }
  // Lấy danh sách bài viết
  getAllPostsByStatus(){
    return this.http.get(`${this.baseUrl}/bystatus`);
  }

  // Lấy bài viết theo ID
  getPostById(id: number){
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Thêm bài viết mới
  createPost(post: FormData) {
    return this.http.post(this.baseUrl, post);
  }

  // Cập nhật bài viết
  updatePost(id: number, post: FormData) {
    return this.http.put(`${this.baseUrl}/${id}`, post);
  }

  // Xóa bài viết
  deletePost(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Thêm phương thức để lấy URL hình ảnh
  getImageUrl(imageName: string): string {
    return `${this.imageUrl}/${imageName}`;
  }
  
}
