import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Đảm bảo đã import Observable
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsers() {
    throw new Error('Method not implemented.');
  }
  private baseUrl = environment.apiUrl + "/users";
  private imageUrl = "http://localhost:3000"; 

  constructor(private http: HttpClient) {}

  // Lấy danh sách người dùng
  getAllUsers() {
    return this.http.get(this.baseUrl);
  }

  // Lấy người dùng theo ID
  getUserById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Thêm người dùng mới
  createUser(user: FormData) {
    return this.http.post(this.baseUrl, user);
  }

  // Cập nhật người dùng
  updateUser(id: number, updateData: any) {
    return this.http.put(`${this.baseUrl}/${id}`, updateData);
  }  

  // Xóa người dùng
  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Gửi email thông báo
  sendEmail(email: string, fullName: string, reason: String): Observable<any> {
    const emailApiUrl = `${environment.apiUrl}/send-email`; // Sử dụng biến môi trường
    return this.http.post(emailApiUrl, { email, fullName, reason });
  }

  sendWelcomeEmail(email: string, name: string): Observable<any> {
    const welcomeEmailApiUrl = `${environment.apiUrl}/send-welcome-email`; // API endpoint cho email chúc mừng
    return this.http.post(welcomeEmailApiUrl, { email, name });
  }

  // Phương thức để lấy URL hình ảnh (nếu cần dùng cho avatar hoặc hình đại diện của user)
  getImageUrl(imageName: string): string {
    return `${this.imageUrl}${imageName}`;
  }
  sendContactEmail(contactData: { name: string; email: string; phone: string; company?: string; message: string }): Observable<any> {
    const emailApiUrl = `${environment.apiUrl}/send-contact-email`;
    return this.http.post(emailApiUrl, contactData);
  }
}
