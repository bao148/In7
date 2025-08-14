import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../../services/post.service'; // Giả sử có một PostService thay vì ProductService
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostCategoryService } from '../../../services/postcategory.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-edit-post',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})

export class AdminEditComponent implements OnInit {
  post: any = {
    title: '',
    content: '',
    image_url: null,
    post_category_id: '',
    status: 'draft',
    created_at: '',
    updated_at: ''
  };
  postId: number | null = null;
  isFile: boolean = false; // Biến để theo dõi nếu image_url là file hay không
  categories: any[] = []; // Danh sách danh mục bài viết

  constructor(
    private postService: PostService,
    private postCategoryService: PostCategoryService, // Inject PostCategoryService
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPostCategoryById();  // Fetch categories when the component is initialized
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.postId) {
      this.getPost(this.postId);
    }
    this.getCategories(); // Lấy danh mục bài viết
  }

  // Lấy thông tin bài viết theo ID
  getPost(id: number): void {
    this.postService.getPostById(id).subscribe(
      (response: any) => {
        this.post = response.post;
        this.isFile = this.post.image_url instanceof File; // Kiểm tra nếu image_url là file
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error);
      }
    );
  }

  // Lấy danh sách danh mục bài viết
  getCategories(): void {
    this.postCategoryService.getAllPostCategories().subscribe(
      (response: any) => {
        this.categories = response.categories; // Giả sử API trả về { categories: [...] }
      },
      (error) => {
        console.error('Lỗi khi lấy danh sách danh mục:', error);
      }
    );
  }

  // Xử lý khi thay đổi file
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.post.image_url = file; // Gán file vào post.image_url
      this.isFile = true; // Đánh dấu đây là một file
    }
  }

  // Cập nhật bài viết
  updatePost(): void {
    if (!this.validateForm()) {
      return;
    }
  
    this.isFile = typeof this.post.image_url === 'object' && this.post.image_url instanceof Blob;
  
    const formData = new FormData();
    formData.append('title', this.post.title);
    formData.append('content', this.post.content);
    if (this.isFile) {
      formData.append('image_url', this.post.image_url);
    }
    formData.append('post_category_id', this.post.post_category_id);
    formData.append('status', this.post.status);
    formData.append('created_at', this.post.created_at);
    formData.append('updated_at', this.post.updated_at);
  
    if (this.postId) {
      this.postService.updatePost(this.postId, formData).subscribe(
        () => {
          Swal.fire({
            title: 'Thành công!',
            text: 'Bài viết đã được cập nhật!',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#3085d6'
          }).then(() => {
            this.router.navigate(['/admin/post']);
          });
        },
        (error) => {
          Swal.fire({
            title: 'Lỗi!',
            text: 'Có lỗi khi cập nhật bài viết, vui lòng thử lại!',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#d33'
          });
          console.error(error);
        }
      );
    }
  }
  

  // Hàm kiểm tra dữ liệu trước khi submit
  validateForm(): boolean {
    if (!this.post.title || !this.post.content || !this.post.post_category_id) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc!');
      return false;
    }
    return true;
  }


  postcategories: any[] = [];  // Array to store all categories
  filteredCategories: any[] = [];  // Array to store filtered categories based on search
  searchTerm: string = '';  // Variable to store the search term
  
  // Function to fetch all categories
  getPostCategoryById(): void {
    this.postCategoryService.getAllPostCategories().subscribe(
      (response: any) => {
        this.postcategories = response.postcategories;  // Store categories in postcategories
        this.filteredCategories = this.postcategories;  // Initially, show all categories
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

}
