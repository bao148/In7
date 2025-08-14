import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { VoucherService } from '../../../services/voucher.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-add-voucher',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './admin-add-voucher.component.html',
  styleUrls: ['./admin-add-voucher.component.css'] // Sửa từ styleUrl thành styleUrls
})
export class AdminAddVoucherComponent implements OnInit {
  voucher = {
    voucher_code: '',
    price: 0,
    discount_percent: 0,
    valid_from: '',
    valid_to: '',
    status: 'active',
    quantity: 1, // Giá trị mặc định là 1
  };

  dateError: boolean = false; // Biến để kiểm tra lỗi ngày

  constructor(private voucherService: VoucherService, private router: Router) {}

  ngOnInit(): void {
    // Logic khởi tạo nếu cần
  }

  // Kiểm tra ngày hợp lệ
  validateDates(): void {
    const validFrom = new Date(this.voucher.valid_from);
    const validTo = new Date(this.voucher.valid_to);

    if (validTo <= validFrom) {
      this.dateError = true; // Nếu ngày hết hạn trước ngày bắt đầu
    } else {
      this.dateError = false; // Ngày hợp lệ
    }
  }

  // Gửi dữ liệu thêm voucher
  addVoucher(): void {
    this.validateDates(); // Kiểm tra ngày trước khi gửi
    if (this.dateError) {
      Swal.fire({
        title: 'Cảnh báo!',
        text: 'Ngày hết hạn không được trước ngày bắt đầu!',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    this.voucherService.createVoucher(this.voucher).subscribe(
      (response) => {
        Swal.fire({
          title: 'Thành công!',
          text: 'Voucher đã được thêm!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
        console.log('Voucher đã được thêm:', response);
        this.router.navigate(['/admin/voucher']); // Chuyển hướng về danh sách voucher
      },
      (error) => {
        Swal.fire({
          title: 'Lỗi!',
          text: 'Lỗi khi thêm voucher!',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33',
        });
        console.error('Lỗi khi thêm voucher:', error);
      }
    );
  }
}
