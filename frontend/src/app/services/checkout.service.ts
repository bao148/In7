
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
    private baseUrl = environment.apiUrl + "/checkout";

  constructor(private http: HttpClient) {}

  placeOrder(orderData: any): Observable<any> {
    return this.http.post(this.baseUrl, orderData);
  }
}