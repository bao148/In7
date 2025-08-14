import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  // BehaviorSubject để theo dõi trạng thái đăng nhập của người dùng
  private loggedInSource = new BehaviorSubject<boolean>(false);
  currentLoggedInStatus = this.loggedInSource.asObservable();

  constructor() {
    // Kiểm tra nếu có access token trong localStorage thì người dùng đã đăng nhập
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.loggedInSource.next(true);
    }
  }

  // Phương thức để thay đổi trạng thái đăng nhập
  changeLoginStatus(status: boolean): void {
    this.loggedInSource.next(status);
  }
}
