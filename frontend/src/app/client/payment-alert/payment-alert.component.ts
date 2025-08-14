// payment-alert.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,RouterLink } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-payment-alert',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payment-alert.component.html',
  styleUrl: './payment-alert.component.css',
})

export class PaymentAlertComponent implements OnInit {
  paymentStatus: string = '';
  orderId: string = '';
  resultCode: string = '';
  message: string = '';
  amount: string = '';
  transId: string = '';
  orderInfo: string = '';

  constructor(private route: ActivatedRoute, private paymentService: PaymentService) {}

  ngOnInit() {
    // Lấy các tham số từ URL
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
      this.resultCode = params['resultCode'];
      this.message = params['message'];
      this.amount = params['amount'];
      this.transId = params['transId']; // Lấy transId từ URL
      this.orderInfo = params['orderInfo'];

      // Xử lý kết quả thanh toán
      if (this.resultCode === '0') {
        this.paymentStatus = '0';
        this.updateOrderWithTransId();
      } else{
        this.paymentStatus = '1';
      } 
      // Gọi API để lưu trạng thái thanh toán vào cơ sở dữ liệu
    });
  }

  updateOrderWithTransId() {
    // Kiểm tra nếu giao dịch thành công và có transId
    if (this.resultCode === '0' && this.transId) {
      const transId = this.transId;
      const orderId = this.orderId;

      // Gọi API để lưu transId vào bảng orders
      this.paymentService.updateOrderTransId(orderId,transId).subscribe(
        (response) => {
          console.log('Cập nhật transId vào đơn hàng thành công:', response);
        },
        (error) => {
          console.error('Lỗi khi cập nhật transId vào đơn hàng:', error);
        }
      );
    }
  }
}
