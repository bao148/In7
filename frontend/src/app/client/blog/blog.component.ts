import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, CommonModule],
  providers: [
    PostService,
    { provide: LOCALE_ID, useValue: 'vi' }  // Cấu trúc đúng của LOCALE_ID
  ],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {
  posts: any[] = [];

  constructor(private postService: PostService) {
    registerLocaleData(localeVi, 'vi');  // Đăng ký locale tiếng Việt
  }

  ngOnInit(): void {
    this.getAllPostsByStatus();
  }

  getImageUrl(imageName: string): string {
    return this.postService.getImageUrl(imageName);
  }
  
  getAllPostsByStatus(): void {
    this.postService.getAllPosts().subscribe(
      (response: any) => {
        this.posts = response.posts;
      },
      (error) => {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error);
      }
    );
  }
}
