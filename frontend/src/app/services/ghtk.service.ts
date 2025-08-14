import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class GhtkService {
  private baseUrl = environment.apiUrl + "/orders";

  constructor(private http: HttpClient) {}

  calculateShippingFee(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/calculate-fee`, data);
  }


  // createOrder(order: any): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/create-order`, order);
  // }
}
