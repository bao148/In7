import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private baseUrl = environment.apiUrl + "/chatbot";
  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    return this.http.post(this.baseUrl, { message });
  }
}
