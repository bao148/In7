import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      // Người dùng chưa đăng nhập
      this.showAlert('Bạn chưa đăng nhập!', 'Vui lòng đăng nhập để tiếp tục.', 'warning');
      this.router.navigate(['/login']);
      return false;
    }

    // Lấy role từ route.data
    const requiredRole = route.data['role'];

    if (requiredRole && !this.checkRole(requiredRole)) {
      // Vai trò không phù hợp
      this.showAlert('Truy cập bị từ chối!', 'Bạn không có quyền truy cập vào trang này.', 'error');
      this.router.navigate(['/']);
      return false;
    }

    // Nếu đã đăng nhập và vai trò phù hợp (hoặc không cần kiểm tra vai trò), cho phép truy cập
    return true;
  }

  private checkRole(requiredRole: string): boolean {
    const userRole = localStorage.getItem('userRole');
    return userRole === requiredRole;
  }

  private showAlert(title: string, text: string, icon: 'success' | 'error' | 'warning' | 'info') {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'Đóng',
    });
  }
}
