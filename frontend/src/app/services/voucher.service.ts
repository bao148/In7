// voucher.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  private baseUrl = environment.apiUrl + "/vouchers";

  constructor(private http: HttpClient) {}

  // Lấy danh sách voucher
  getAllVouchers() {
    return this.http.get(this.baseUrl);
  }

  // Lấy voucher theo ID
  getVoucherById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Thêm voucher mới
  createVoucher(voucher: any) {
    return this.http.post(this.baseUrl, voucher);
  }

  // Cập nhật voucher
  updateVoucher(id: number, voucher: any) {
    return this.http.put(`${this.baseUrl}/${id}`, voucher);
  }

  // Xóa voucher
  deleteVoucher(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
