import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommentPostService } from '../../services/commentpost.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-commentpost',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  templateUrl: './commentpost.component.html',
  styleUrl: './commentpost.component.css'
})
export class CommentpostComponent {
  commentposts: any[] = []; // Mảng lưu trữ danh sách bình luận

  constructor(private commentPostService: CommentPostService) {}

  ngOnInit(): void {
    this.getAllCommentPosts(); // Gọi hàm khi component được khởi tạo
  }

  // Lấy danh sách tất cả bình luận
  getAllCommentPosts(): void {
    this.commentPostService.getAllCommentPosts().subscribe(
      (response: any) => {
        if (response.comments && Array.isArray(response.comments)) {
          this.commentposts = response.comments; // Gán dữ liệu vào mảng commentposts
        } else {
          console.error('Dữ liệu API trả về không hợp lệ.');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Lỗi khi lấy danh sách bình luận:', error.message);
      }
    );
  }

  // Lấy đường dẫn ảnh nếu cần (có thể loại bỏ nếu không dùng)
  getImageUrl(imageName: string): string {
    // Trường hợp nếu API trả về ảnh hoặc muốn xử lý đường dẫn ảnh
    return `https://your-api.com/images/${imageName}`; 
  }

  // Xóa một bình luận
  deleteCommentPost(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa bình luận này không?')) {
      this.commentPostService.deleteComment(id).subscribe(
        () => {
          // Cập nhật danh sách sau khi xóa
          this.commentposts = this.commentposts.filter((comment) => comment.id !== id);
          alert('Bình luận đã được xóa thành công!');
          console.log('Bình luận đã được xóa thành công!');
        },
        (error: HttpErrorResponse) => {
          alert('Lỗi khi xóa bình luận!');
          console.error('Lỗi khi xóa bình luận:', error.message);
        }
      );
    }
  }
}
