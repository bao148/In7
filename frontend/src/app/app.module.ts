import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AdminModule,
    ClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000, // thời gian hiển thị toast
      positionClass: 'toast-bottom-right', // vị trí hiện toast
      preventDuplicates: true, // tránh hiện nhiều thông báo trùng lặp
    })
  ],
  providers: [    
  ],
  bootstrap: []
})
export class AppModule { }
