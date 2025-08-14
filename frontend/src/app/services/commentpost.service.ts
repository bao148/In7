import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentPostService {
  getAllComment() {
    throw new Error('Method not implemented.');
  }
  deleteCommentPost(id: number) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = environment.apiUrl + "/commentpost"; // Changed to /commentpost

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả commentpost
  getAllCommentPosts() {
    return this.http.get(this.baseUrl);
  }

  // Lấy một commentpost theo ID
  getCommentById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Thêm một commentpost mới
  createComment(comment: any) {
    return this.http.post(this.baseUrl, comment);
  }

  // Xóa một commentpost
  deleteComment(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
  
}
