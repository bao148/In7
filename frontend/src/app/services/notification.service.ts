import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private baseUrl = 'http://localhost:3000/api/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(userId: number): Observable<{ notifications: any[] }> {
    return this.http.get<{ notifications: any[] }>(`${this.baseUrl}/${userId}`);
  }
  

  markAsRead(notificationId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${notificationId}/read`, {});
  }
}
