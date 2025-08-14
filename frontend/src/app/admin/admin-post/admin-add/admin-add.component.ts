import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service'; // Import service
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostCategoryService } from '../../../services/postcategory.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-add-post',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent implements OnInit {
  post: any = {
    title: '',
    content: '',
    image_url: null,
    post_category_id: '',
    status: 'draft',
    created_at: '',
    updated_at: ''
  };

  fileError: boolean = false;
  postId: number | null = null;
  isFile: boolean = false;
  categories: any[] = [];
  postcategories: any[] = [];
  filteredCategories: any[] = [];
  searchTerm: string = '';

  constructor(
    private postService: PostService,
    private postCategoryService: PostCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPostCategoryById();
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.postId) {
      this.getPost(this.postId);
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.fileError = false;

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (allowedTypes.includes(file.type)) {
        this.post.image_url = file;
      } else {
        this.fileError = true;
      }
    }
  }

  addPost(): void {
    if (this.fileError) {
      Swal.fire({
        title: 'Lỗi!',
        text: 'Vui lòng chọn tệp hình ảnh hợp lệ.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33'
      });
      return;
    }

    if (!this.post.title || !this.post.content || !this.post.post_category_id) {
      Swal.fire({
        title: 'Lỗi!',
        text: 'Vui lòng điền đầy đủ các thông tin bắt buộc!',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#d33'
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', this.post.title);
    formData.append('content', this.post.content);
    formData.append('image_url', this.post.image_url);
    formData.append('post_category_id', this.post.post_category_id);
    formData.append('status', this.post.status);
    formData.append('created_at', new Date().toISOString());
    formData.append('updated_at', new Date().toISOString());

    this.postService.createPost(formData).subscribe(
      (response) => {
        Swal.fire({
          title: 'Thành công!',
          text: 'Bài viết đã được thêm!',
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
          text: 'Lỗi khi thêm bài viết! Vui lòng kiểm tra lại thông tin.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33'
        });
        console.error(error);
      }
    );
  }

  getPost(id: number): void {
    this.postService.getPostById(id).subscribe(
      (response: any) => {
        this.post = response.post;
        this.isFile = this.post.image_url instanceof File;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error);
      }
    );
  }

  getPostCategoryById(): void {
    this.postCategoryService.getAllPostCategories().subscribe(
      (response: any) => {
        this.postcategories = response.postcategories;
        this.filteredCategories = this.postcategories;
      },
      (error) => {
        console.error('Lỗi khi lấy danh mục bài viết:', error);
      }
    );
  }
}