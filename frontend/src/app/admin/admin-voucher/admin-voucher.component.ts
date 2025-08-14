import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Thêm CommonModule để sử dụng *ngFor và *ngIf
import { VoucherService } from '../../services/voucher.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-admin-voucher',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, NgxPaginationModule], // Thêm CommonModule vào imports
  templateUrl: './admin-voucher.component.html',
  styleUrls: ['./admin-voucher.component.css']
})
export class AdminVoucherComponent implements OnInit {
  vouchers: any[] = [];  // Mảng lưu trữ tất cả các voucher
  filteredVouchers: any[] = [];  // Mảng lưu trữ các voucher sau khi lọc
  selectedStatus: string = '';  // Trạng thái đã chọn
  searchTerm: string = '';  // Biến tìm kiếm theo mã voucher

  currentPage: number = 1;  // Trang hiện tại
  itemsPerPage: number = 10;  // Số voucher hiển thị mỗi trang (mặc định 10)

  constructor(private voucherService: VoucherService) {}

  ngOnInit(): void {
    this.getAllVouchers();  // Lấy dữ liệu voucher khi component khởi tạo
  }

  // Lấy tất cả voucher từ dịch vụ
  getAllVouchers(): void {
    this.voucherService.getAllVouchers().subscribe(
      (response: any) => {
        this.vouchers = response.vouchers;
        this.filteredVouchers = this.vouchers;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu voucher:', error);
      }
    );
  }

  // Lọc voucher theo trạng thái và mã voucher
  filterVouchers(): void {
    this.filteredVouchers = this.vouchers.filter(voucher => {
      const matchesSearchTerm = voucher.voucher_code.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.selectedStatus ? voucher.status === this.selectedStatus : true;
      return matchesSearchTerm && matchesStatus;
    });
  }

  // Xóa voucher
  deleteVoucher(id: number): void {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn xóa voucher này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có, xóa!',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.voucherService.deleteVoucher(id).subscribe(
          () => {
            this.vouchers = this.vouchers.filter(voucher => voucher.id !== id);
            this.filterVouchers();
            Swal.fire({
              title: 'Thành công!',
              text: 'Voucher đã được xóa thành công!',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
            console.log('Voucher đã được xóa thành công!');
          },
          (error) => {
            Swal.fire({
              title: 'Lỗi!',
              text: 'Lỗi khi xóa voucher!',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33'
            });
            console.error('Lỗi khi xóa voucher:', error);
          }
        );
      }
    });
  }
  convertCommaToDot(value: any): string {
    if (value) {
      return value.toString().replace(/,/g, '.');  // Thay tất cả dấu phẩy bằng dấu chấm
    }
    return value;
  }
  
}
