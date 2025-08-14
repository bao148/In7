import { Injectable } from '@angular/core';
import { gapi } from 'gapi-script';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private clientId: string = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

  constructor() {}

  // Khởi tạo Google API client
  initGoogleAuth(): void {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: this.clientId,
      });
    });
  }

  // Đăng nhập qua Google
  signInWithGoogle(): Promise<any> {
    return new Promise((resolve, reject) => {
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signIn().then(
        (googleUser: any) => {
          const profile = googleUser.getBasicProfile();
          const idToken = googleUser.getAuthResponse().id_token;
          resolve({ profile, idToken });
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  // Đăng xuất
  signOut(): void {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
    });
  }
}
