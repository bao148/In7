import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; // Sử dụng HttpClient cho các yêu cầu HTTP
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, RouterModule],
  providers: [UserService, AuthService],
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css'], // Đổi từ `styleUrl` thành `styleUrls` để đúng cú pháp
})
export class AdminUserComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  selectedStatus: string = '';
  selectedRole: string = '';
  userToDelete: any = null;
  deleteReason: string = '';
  deleteReasonError: string = ''; // Thêm thuộc tính này
  // Thuộc tính phân trang
  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number = 5; // Số mục hiển thị trên mỗi trang

  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.resetModal();
  }

  
  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        this.users = response.users;
        this.filteredUsers = [...this.users];
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      }
    );
  }

  // Lấy URL của ảnh người dùng
  getImageUrl(imageName: string | null | undefined): string {
    const defaultImage = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
    return imageName && imageName.trim() !== ''
      ? this.userService.getImageUrl(imageName)
      : defaultImage;
  }


  filterUsers(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearchTerm = user.FullName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.selectedStatus ? user.Status === this.selectedStatus : true;
      const matchesRole = this.selectedRole ? user.Role === this.selectedRole : true;
      return matchesSearchTerm && matchesStatus && matchesRole;
    });
  }

  // Mở modal xác nhận xóa
  openDeleteModal(userID: number, email: string, fullName: string): void {
    // Gán thông tin người dùng cần xóa
    this.userToDelete = { userID, email, fullName };
    
    // Lấy phần tử modal từ DOM
    const modalElement = document.getElementById('deleteModal');
    
    // Kiểm tra và hiển thị modal
    if (modalElement) {
      modalElement.style.display = 'flex'; // Hiển thị modal
      modalElement.setAttribute('aria-hidden', 'false'); // Đảm bảo hỗ trợ accessibility
    }
  }
  
  showModal(): void {// Kiểm tra nếu có userToDelete, tức là có người dùng cần xóa
    if (this.userToDelete) {
      const modalElement = document.getElementById('deleteModal');
      if (modalElement) {
        modalElement.style.display = 'block'; // Hiển thị modal
      }
    }
  }
  

  closeModal(): void {
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      modalElement.style.display = 'none'; // Ẩn modal
    }
    this.resetModal();  // Reset lại thông tin modal sau khi đóng
  } 

  resetModal(): void {
    this.userToDelete = null;  // Đảm bảo không có user nào được chọn để xóa
  }
  

  deleteUser(): void {
    if (this.deleteReason.trim() === '') {
      this.deleteReasonError = 'Vui lòng nhập lý do xóa tài khoản.'; // Hiển thị lỗi
      return;
    }

    this.userService.deleteUser(this.userToDelete.userID).subscribe(
      () => {
        Swal.fire('Thành công!','Thông tin người dùng đã được cập nhật!','success');
        this.sendEmailNotification(this.userToDelete.email, this.userToDelete.fullName, this.deleteReason);
        this.getAllUsers();
        this.closeModal(); // Đóng modal sau khi xóa thành công
      },
      (error) => {
        console.error('Lỗi khi xóa người dùng:', error);
        Swal.fire('Thất bại!','Thông tin người dùng không được cập nhật!','error');
        this.deleteReasonError = 'Lỗi khi xóa người dùng. Vui lòng thử lại sau.';
      }
    );
  }

  getStatusLabel(status: string): string {
    return status === 'active' ? 'Kích hoạt' : 'Vô hiệu hóa';
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case 'admin':
        return 'Quản trị viên';
      case 'user':
        return 'Người dùng';
      default:
        return 'Không xác định';
    }
  }  

  // Phương thức lấy dữ liệu phân trang
  getPagedData(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  // Chuyển đến trang
  goToPage(page: number): void {
    this.currentPage = page;
  }
  getTotalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }
  getPaginationArray(): number[] {
    const totalPages = this.getTotalPages();
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
  
  sendEmailNotification(email: string, fullName: string, reason: string): void {
    this.userService.sendEmail(email, fullName, reason).subscribe(
      (response) => {
        console.log('Email đã được gửi:', response);
      },
      (error) => {
        console.error('Lỗi khi gửi email:', error);
      }
    );
  }

  
}
