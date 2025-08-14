import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/review.service';
import { DatePipe } from '@angular/common';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-review',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  providers: [DatePipe],
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.css']
})
export class AdminReviewComponent implements OnInit {
  reviews: any[] = [];
  filteredReviews: any[] = [];
  paginatedReviews: any[] = []; // Reviews hiển thị trên trang hiện tại
  searchName: string = ''; // Tìm kiếm theo tên
  selectedRating: string = ''; // selectedRating là kiểu string

  // Biến phân trang
  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number = 5; // Số đánh giá trên mỗi trang
  totalPages: number = 0; // Tổng số trang

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  // Lấy tất cả đánh giá
  loadReviews(): void {
    this.reviewService.getAllReviews().subscribe(
      (data) => {
        this.reviews = data.reviews;
        this.filteredReviews = this.reviews; // Ban đầu hiển thị tất cả
        const userRequests = this.reviews.map((review) =>
          this.reviewService.getUserById(review.user_id)
        );

        forkJoin(userRequests).subscribe(
          (userResponses: any[]) => {
            userResponses.forEach((userData, index) => {
              this.reviews[index].fullname = userData.user.FullName;
            });
            this.applyFilters(); // Áp dụng bộ lọc
          },
          (error) => {
            console.error('Error fetching user data:', error);
            Swal.fire(
              'Thất bại!',
              'Có lỗi xảy ra khi tải dữ liệu người dùng!',
              'error'
            );
          }
        );
      },
      (error) => {
        console.error('Error loading reviews:', error);
        Swal.fire(
          'Thất bại!',
          'Có lỗi xảy ra khi tải danh sách đánh giá!',
          'error'
        );
      }
    );
  }

  // Lọc theo rating
  filterByRating(): void {
    this.applyFilters();
  }

  // Tìm kiếm theo tên
  searchByName(): void {
    this.applyFilters();
  }

  // Áp dụng tất cả bộ lọc và phân trang
  applyFilters(): void {
    this.filteredReviews = this.reviews.filter((review) => {
      // Chuyển đổi selectedRating từ string sang number nếu nó có giá trị
      const ratingFilter = this.selectedRating ? Number(this.selectedRating) : 0; // Nếu không có giá trị, set về 0
  
      const matchesRating = ratingFilter !== 0
        ? review.rating === ratingFilter
        : true; // Nếu selectedRating là 0, không lọc theo rating
  
      const matchesName = this.searchName
        ? review.fullname?.toLowerCase().includes(this.searchName.toLowerCase())
        : true;
  
      return matchesRating && matchesName;
    });
  
    this.totalPages = Math.ceil(this.filteredReviews.length / this.itemsPerPage);
    this.currentPage = 1; // Reset về trang đầu tiên khi lọc
    this.updatePaginatedReviews();
  }
  

  // Cập nhật danh sách đánh giá cho trang hiện tại
  updatePaginatedReviews(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedReviews = this.filteredReviews.slice(startIndex, endIndex);
  }

  // Chuyển trang
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedReviews();
    }
  }

  // Ẩn hoặc hiện đánh giá
  toggleReviewStatus(reviewId: number): void {
    const review = this.reviews.find((r) => r.id === reviewId);
    if (review) {
      const newStatus = review.status === 1 ? 0 : 1;
      const payload = { status: newStatus };

      this.reviewService.updateReviewStatus(reviewId, payload).subscribe(
        (response) => {
          Swal.fire(
            'Thành công!',
            `Trạng thái đánh giá đã được ${
              newStatus === 1 ? 'hiện' : 'ẩn'
            }`,
            'success'
          );
          review.status = newStatus;
          this.applyFilters(); // Cập nhật lại danh sách lọc
        },
        (error) => {
          console.error('Lỗi cập nhật trạng thái:', error);
          Swal.fire(
            'Thất bại!',
            'Có lỗi xảy ra khi cập nhật trạng thái đánh giá!',
            'error'
          );
        }
      );
    }
  }
}
