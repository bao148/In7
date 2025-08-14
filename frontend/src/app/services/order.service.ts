// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = environment.apiUrl + "/orders";
  apiUrl: any;

  constructor(private http: HttpClient) {}

  // Lấy danh sách đơn hàng
  getOrderdetailsByOrderid(id: number) {
    return this.http.get(`${this.baseUrl}/orderdetails/${id}`);
  }

  getAllOrders() {
    return this.http.get(this.baseUrl);
  }


  // Lấy đơn hàng theo ID
  getOrderById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  UpDateStatus(id:number, order: any){
    return this.http.put(`${this.baseUrl}/${id}`, order);
  }

  getOrdersByUserId(userID: number) {
    return this.http.get<{ message: string; orders: any[] }>(`http://localhost:3000/api/user-orders?user_id=${userID}`);
  }
  
  
  updateOrder(id: number, orderData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, orderData);
  }

}
