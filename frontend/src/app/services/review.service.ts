import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';  // Import AuthService
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private allUrl = environment.apiUrl + "/review";
  private baseUrl = environment.apiUrl + "/reviews";
  private userUrl = environment.apiUrl + "/users";  // Đường dẫn API của người dùng

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Phương thức thêm đánh giá
  addReview(reviewData: any): Observable<any> {
    const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage

    if (!userId) {
      throw new Error('Không tìm thấy userId trong localStorage');
    }

    // Thêm user_id vào reviewData
    reviewData.user_id = userId;

    return this.http.post(this.baseUrl, reviewData);
  }
  // Phương thức để lấy tất cả các đánh giá
  getAllReviews(): Observable<{ reviews: any[] }> {
    return this.http.get<{ reviews: any[] }>(`${this.allUrl}`);
  }

  // Lấy thông tin người dùng theo ID
  getUserById(userId: string): Observable<any> {
    return this.http.get(`${this.userUrl}/${userId}`);
  }

  // Phương thức để lấy các đánh giá của sản phẩm
  // getProductReviews(productId: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/${productId}`);
  // }
  getProductReviews(productId: number): Observable<{ reviews: any[] }> {
    return this.http.get<{ reviews: any[] }>(`${this.baseUrl}/${productId}`);
}
  updateReviewStatus(reviewId: number, payload: { status: number }): Observable<any> {
    return this.http.put(`${this.baseUrl}/${reviewId}`, payload);  // Sửa lại endpoint
  }

}

