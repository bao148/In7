import { Injectable } from '@angular/core';
import { Notyf } from 'notyf';

@Injectable({
  providedIn: 'root',
})
export class NotyfService {
  private notyf: Notyf | null = null;

  constructor() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.notyf = new Notyf({
        duration: 1000,
        position: { x: 'right', y: 'top' },
        types: [
          {
            type: 'warning',
            background: '#ffc107', // Màu vàng cho cảnh báo
            icon: {
              tagName: 'span',
              text: '⚠️', // Biểu tượng cảnh báo
            },            
          },
        ],
      });
    }
  }

  success(message: string) {
    this.notyf?.success(message);
  }

  error(message: string) {
    this.notyf?.error(message);
  }

  warning(message: string) {
    this.notyf?.open({
      type: 'warning',
      message,
    });
  }

  info(message: string) {
    this.notyf?.open({
      type: 'info',
      message,
    });
  }
}
