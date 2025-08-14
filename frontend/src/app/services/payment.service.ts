import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PaymentResponse {
  payUrl: string; // URL thanh toán trả về từ MoMo
  message: string; // Thông báo trạng thái
  [key: string]: any; // Các thuộc tính bổ sung nếu có
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  private baseUrl = environment.apiUrl + "/payment";

  private paymentStatusSubject = new BehaviorSubject<string>(''); // Trạng thái thanh toán
  paymentStatus$ = this.paymentStatusSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Tạo yêu cầu thanh toán qua MoMo
  createPayment(
    amount: number,
    orderId: string,
    orderInfo: string,
    extraData: any,
    cartItems: any[] // Thêm tham số cartItems vào đây
  ): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(`${this.baseUrl}/create-payment`, {
      amount,
      orderId,
      orderInfo,
      extraData: JSON.stringify(extraData), // Chuyển `extraData` thành chuỗi JSON
      cartItems // Truyền cartItems vào payload

    });
  }
  


  // Gửi thông tin đơn hàng COD
  submitCODOrder(orderData: any) {
    return this.http.post<any>(`${this.baseUrl}/submit-cod-order`, orderData);
  }

  // Xử lý callback từ MoMo (Sau khi thanh toán)
  handlePaymentCallback(data: any) {
    // Kiểm tra mã kết quả và thông báo trạng thái thanh toán
    if (data.resultCode === '0') {
      this.paymentStatusSubject.next('Thanh toán thành công');
    } else {
      this.paymentStatusSubject.next('Thanh toán thất bại');
    }
  }

  // Kiểm tra trạng thái thanh toán (Nếu cần)
  checkPaymentStatus(orderId: string) {
    return this.http.post<any>(`${this.baseUrl}/check-status`, { orderId });
  }
  // Phương thức cập nhật transId vào bảng orders
  updateOrderTransId(orderId: string, transId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/update-order-transid`, { orderId, transId });
  }
}
