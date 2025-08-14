import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) {}

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response.status === 200 && this.isLocalStorageAvailable()) {
          const loginTime = new Date().getTime(); // Lưu thời gian hiện tại
          localStorage.setItem('accessToken', response.metadata.tokens.accessToken);
          localStorage.setItem('refreshToken', response.metadata.tokens.refreshToken);
          localStorage.setItem('userId', response.metadata.shop.user_id.toString());
          localStorage.setItem('userName', response.metadata.shop.name);
          localStorage.setItem('userEmail', response.metadata.shop.email);
          localStorage.setItem('userRole', response.metadata.shop.role);
          localStorage.setItem('loginTime', loginTime.toString()); // Lưu thời gian đăng nhập
        }
      }),
      catchError((error: any) => { 
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi';
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  
  checkSessionValidity(): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }
  
    const loginTime = localStorage.getItem('loginTime');
    const accessToken = localStorage.getItem('accessToken');
    const currentTime = new Date().getTime();
  
    if (loginTime && accessToken) {
      const sessionDuration = 24 * 60 * 60 * 1000; // 1 ngày (ms)
      const loginTimestamp = parseInt(loginTime, 10);
  
      if (currentTime - loginTimestamp > sessionDuration) {
        this.logout().subscribe(() => {
          Swal.fire('Phiên làm việc đã hết hạn', 'Vui lòng đăng nhập lại', 'warning');
          this.router.navigate(['/login']);
        });
        return false;
      }
      return true;
    }
    return false;
  }   

  signup(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { name, email, password }).pipe(
      tap((response: any) => {
        if (response.status === 201 && this.isLocalStorageAvailable()) {
          // Lưu access token và refresh token vào localStorage
          const loginTime = new Date().getTime(); // Lưu thời gian hiện tại
          localStorage.setItem('accessToken', response.metadata.tokens.accessToken);
          localStorage.setItem('refreshToken', response.metadata.tokens.refreshToken);
          localStorage.setItem('userId', response.metadata.user.user_id);
          localStorage.setItem('userName', response.metadata.user.name);
          localStorage.setItem('userEmail', response.metadata.user.email);
          localStorage.setItem('loginTime', loginTime.toString()); // Lưu thời gian đăng nhập
        }
      }),
      catchError((error: any) => {
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  logout(): Observable<any> {
    if (!this.isLocalStorageAvailable()) {
      throw new Error('localStorage không được hỗ trợ trong môi trường này.');
    }

    const clientId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (!clientId || !accessToken) {
      throw new Error('Không thể đăng xuất, không tìm thấy thông tin người dùng.');
    }

    const headers = {
      'x-client-id': clientId,
      'authorization': accessToken,
    };

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers }).pipe(
      tap(() => {
        localStorage.clear();
      }),
      catchError((error: any) => {
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi khi đăng xuất';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  isAuthenticated(): boolean {
    return this.isLocalStorageAvailable() && localStorage.getItem('accessToken') !== null;
  }

  // Thêm phương thức lấy thông tin người dùng
  getUserInfo(): Observable<any> {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (!userId || !accessToken) {
      throw new Error('Không tìm thấy thông tin người dùng.');
    }

    const headers = {
      'x-client-id': userId,
      'authorization': accessToken,
    };

    return this.http.get(`${this.apiUrl}/user-info`, { headers }).pipe(
      catchError((error: any) => {
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi khi lấy thông tin người dùng';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  // Thêm phương thức cập nhật thông tin người dùng
  updateUserInfo(name: string, email: string, phoneNumber: string): Observable<any> {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (!userId || !accessToken) {
      throw new Error('Không tìm thấy thông tin người dùng.');
    }

    const headers = {
      'x-client-id': userId,
      'authorization': accessToken,
    };

    return this.http.put(`${this.apiUrl}/update-user`, { name, email, phoneNumber }, { headers }).pipe(
      catchError((error: any) => {
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi khi cập nhật thông tin người dùng';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  // Thêm phương thức thay đổi mật khẩu
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    if (!userId || !accessToken) {
      throw new Error('Không tìm thấy thông tin người dùng.');
    }

    const headers = {
      'x-client-id': userId,
      'authorization': accessToken,
    };

    return this.http.put(`${this.apiUrl}/change-password`, { currentPassword, newPassword }, { headers }).pipe(
      catchError((error: any) => {
        const errorMessage = error.error?.message || 'Đã xảy ra lỗi khi thay đổi mật khẩu';
        return throwError(() => new Error(errorMessage));
      })
    );
  }
// AuthService
checkUserRole(): Observable<boolean> {
  const userId = localStorage.getItem('userId');
  const accessToken = localStorage.getItem('accessToken');

  if (!userId || !accessToken) {
    return throwError(() => new Error('Người dùng chưa đăng nhập.'));
  }

  const headers = {
    'x-client-id': userId,
    'authorization': accessToken,
  };

  return this.http.post(`${this.apiUrl}/admin`, {}, { headers }).pipe(
    tap((response: any) => {
      if (response.status !== 200) {
      }
    }),
    catchError((error: any) => {
      return throwError(() => new Error(error.error?.message || 'Lỗi xác thực quyền.'));
    }),
    tap(() => true)
  );
}

Usignup(name: string, email: string, password: string, status: string, role: string): Observable<any> {
  const payload = { name, email, password, status, role }; // Thêm status và role vào payload
  return this.http.post(`${this.apiUrl}/signup`, payload).pipe(
    tap((response: any) => {
      if (response.status === 201) {
      }
    }),
    catchError((error: any) => {
      const errorMessage = error.error?.message || 'Đã xảy ra lỗi';
      return throwError(() => new Error(errorMessage));
    })
  );
}
  // Load Google Sign-In Button
  loadGoogleSignIn(): void {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.initialize({
        client_id: '755849462515-4ttvf0p534t3aap83l3i7f8ahcuplmoc.apps.googleusercontent.com',
        callback: (response:any) => this.handleCredentialResponse(response)
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-btn'),
        { theme: 'outline', size: 'large' }
      );
    }
  }

  // Xử lý ID Token khi đăng nhập thành công
  handleCredentialResponse(response: any): void {
    this.http.post(`${this.apiUrl}/verify-google-token`, { idToken: response.credential })
      .subscribe(
        (res: any) => {
          console.log('User info:', res.metadata);
  
          // Lưu thông tin vào localStorage
          if (res.metadata && this.isLocalStorageAvailable()) {
            const loginTime = new Date().getTime(); // Lưu thời gian hiện tại
            localStorage.setItem('accessToken', res.metadata.tokens.accessToken);
            localStorage.setItem('refreshToken', res.metadata.tokens.refreshToken);
            localStorage.setItem('userId', res.metadata.shop.user_id.toString());
            localStorage.setItem('userName', res.metadata.shop.name);
            localStorage.setItem('userEmail', res.metadata.shop.email);
            localStorage.setItem('userRole', res.metadata.shop.role);
            localStorage.setItem('loginTime', loginTime.toString()); // Lưu thời gian đăng nhập

            // Hiển thị thông báo thành công
            Swal.fire('Xong!', 'Đăng nhập Google thành công!', 'success');

            // Chuyển hướng sau khi thông báo thành công
            setTimeout(() => {
              this.router.navigate(['/']); // Chuyển hướng đến trang chủ
        }, 2000);
          }else {
            Swal.fire('Lỗi!', 'Có lỗi xảy ra trong quá trình xử lý thông tin!', 'error');
          }
        },
        (err) => {
          console.error('Error:', err);
          Swal.fire('Lỗi!', 'Đăng nhập không thành công! Vui lòng thử lại', 'error');
        }
      );
  }
}
