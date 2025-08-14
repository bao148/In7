import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';  // Đổi thành PostService
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-admin-post',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, NgxPaginationModule],
  providers: [PostService],  // Đổi thành PostService
  templateUrl: './admin-post.component.html',  // Đổi thành đường dẫn đến file template của post
  styleUrls: ['./admin-post.component.css']  // Đổi thành đường dẫn đến file CSS của post
})
export class AdminPostComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  searchTerm: string = '';
  selectedStatus: string = '';

  currentPage: number = 1;  // Trang hiện tại
  itemsPerPage: number = 10;  // Số bài viết hiển thị mỗi trang (mặc định 10)

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(
      (response: any) => {
        this.posts = response.posts;
        this.filteredPosts = this.posts;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error);
      }
    );
  }

  filterPosts(): void {
    this.filteredPosts = this.posts.filter(post => {
      const matchesSearchTerm = post.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.selectedStatus ? post.status === this.selectedStatus : true;
      return matchesSearchTerm && matchesStatus;
    });
  }

  getImageUrl(imageName: string): string {
    return this.postService.getImageUrl(imageName);
  }

  
  deletePost(id: number): void {
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn xóa bài viết này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có, xóa!',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.postService.deletePost(id).subscribe(
          () => {
            // Cập nhật danh sách bài viết sau khi xóa
            this.posts = this.posts.filter(post => post.id !== id);
            this.filterPosts(); // Lọc lại bài viết sau khi xóa
            Swal.fire({
              title: 'Thành công!',
              text: 'Bài viết đã được xóa thành công!',
              icon: 'success',
              timer: 2000, // Đóng tự động sau 2 giây
              showConfirmButton: false
            });
            console.log('Bài viết đã được xóa thành công!');
          },
          (error) => {
            Swal.fire({
              title: 'Lỗi!',
              text: 'Lỗi khi xóa bài viết!',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#d33'
            });
            console.error('Lỗi khi xóa bài viết:', error);
          }
        );
      }
    });
  }
  
}