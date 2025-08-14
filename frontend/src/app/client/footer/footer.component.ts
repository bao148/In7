import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, ViewChild, Renderer2, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ChatbotService } from '../../services/chatbot.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements AfterViewInit {
  @ViewChild('carousel') carousel!: ElementRef;

  isChatOpen: boolean = false;
  messages: { user: string; text: string }[] = [];
  userMessage: string = '';

  // Thêm danh sách tin nhắn sẵn
  quickReplies: string[] = [
    'Thông tin liên hệ!',
    'Tư vấn sản phẩm!',
    'Sản phẩm đang có!',
    'Bài viết đang có!'
  ];
  constructor(
    private chatbotService: ChatbotService,
    private sanitizer: DomSanitizer,
    private el: ElementRef,
    private renderer: Renderer2,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    if (this.carousel) {
      const carouselElement = this.carousel.nativeElement;
      const interval = 2000;

      setInterval(() => {
        const activeItem = carouselElement.querySelector('.carousel-item.active');
        const nextItem = activeItem?.nextElementSibling || carouselElement.querySelector('.carousel-item');

        if (activeItem) activeItem.classList.remove('active');
        if (nextItem) nextItem.classList.add('active');
      }, interval);
    }

    this.cdRef.detectChanges();
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }
  // Xử lý khi người dùng chọn tin nhắn sẵn
  sendQuickReply(reply: string) {
    this.messages.push({ user: 'Tôi', text: reply });
    this.chatbotService.sendMessage(reply).subscribe((response) => {
      this.messages.push({ user: 'Bot', text: response.reply });
      this.cdRef.detectChanges();
    });
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ user: 'Tôi', text: this.userMessage });
      this.chatbotService.sendMessage(this.userMessage).subscribe((response) => {
        console.log(response.reply);
        this.messages.push({ user: 'Bot', text: response.reply });
        this.cdRef.detectChanges();  // Đảm bảo cập nhật giao diện
        this.addLinkClickEvent();  // Thêm sự kiện cho các liên kết
      });
      this.userMessage = '';
    }
  }

  // Sử dụng DomSanitizer để làm sạch và cho phép HTML
  formatBotMessage(message: string): string {
    return this.sanitizer.bypassSecurityTrustHtml(message) as unknown as string;
  }

  addLinkClickEvent() {
    const links = this.el.nativeElement.querySelectorAll('a');
    links.forEach((link: HTMLAnchorElement) => {
      this.renderer.listen(link, 'click', (event: Event) => {
        event.preventDefault();
        window.open(link.href, '_blank');  // Mở liên kết trong tab mới
      });
    });
  }
}
