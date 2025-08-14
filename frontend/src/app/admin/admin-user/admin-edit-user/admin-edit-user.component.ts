import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-edit-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.css']
})
export class AdminEditUserComponent implements OnInit {
  user: any = {
    Role: 'user',
    Status: 'active',
  };
  userId: number | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.getUser(this.userId);
    }
  }

  getUser(id: number): void {
    this.userService.getUserById(id).subscribe(
      (response: any) => {
        this.user = response.user;  // Đảm bảo response.user có trường address
      },
      (error) => {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    );
  }
  

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.user.image = file;
    }
  }

  updateUser(): void {
    // Tạo đối tượng dữ liệu JSON chứa các thông tin cần thiết
    const updateData = {
      role: this.user.Role,
      status: this.user.Status,
    };
  
    if (this.userId) {
      // Gọi service để gửi dữ liệu
      this.userService.updateUser(this.userId, updateData).subscribe(
        (response) => {
          Swal.fire({
            title: 'Thành công!',
            text: 'Thông tin người dùng đã được cập nhật!',
            icon: 'success',
            timer: 2000,  // Đóng tự động sau 2 giây
            showConfirmButton: false
          });
          this.router.navigate(['/admin/user']);  // Quay lại trang danh sách người dùng
        },
        (error) => {
          Swal.fire({
            title: 'Lỗi!',
            text: 'Lỗi khi cập nhật thông tin người dùng!',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#d33'
          });
          console.error('Lỗi khi cập nhật người dùng:', error);
        }
      );
    }
  }
  
  
}
