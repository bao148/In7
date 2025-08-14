import { Component, OnInit } from '@angular/core';
import { VoucherService } from '../../../services/voucher.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-edit-voucher',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './admin-edit-voucher.component.html',
  styleUrls: ['./admin-edit-voucher.component.css']
})

export class AdminEditVoucherComponent implements OnInit {
  voucher: any = {
    voucher_code: '',
    price: 0,
    discount_percent: 0,
    valid_from: '',
    valid_to: '',
    status: 'active',
    quantity: 1,
  };
  voucherId: number | null = null;
  dateError: boolean = false; // Biến để kiểm tra lỗi ngày

  constructor(
    private voucherService: VoucherService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Lấy ID từ URL và gọi API để lấy voucher khi sửa
    this.voucherId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.voucherId) {
      this.getVoucher(this.voucherId);
    }
  }

  // Lấy voucher từ API
  getVoucher(id: number): void {
    this.voucherService.getVoucherById(id).subscribe(
      (response: any) => {
        this.voucher = response.voucher;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu voucher:', error);
      }
    );
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

  // Cập nhật voucher khi form hợp lệ
  editVoucher(form: NgForm): void {
    this.validateDates(); // Kiểm tra ngày trước khi gửi
    if (form.valid && !this.dateError) {
      if (this.voucherId) {
        this.voucherService.updateVoucher(this.voucherId, this.voucher).subscribe(
          (response) => {
            Swal.fire({
              title: 'Thành công!',
              text: 'Voucher đã được cập nhật!',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
            });
            console.log('Voucher đã được cập nhật:', response);
            this.router.navigate(['/admin/voucher']);
          },
          (error) => {
            Swal.fire({
              title: 'Lỗi!',
              text: 'Lỗi khi cập nhật voucher!',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33',
            });
            console.error('Lỗi khi cập nhật voucher:', error);
          }
        );
      }
    } else {
      Swal.fire({
        title: 'Cảnh báo!',
        text: 'Vui lòng điền đầy đủ thông tin hợp lệ!',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
      });
    }
  }
}
