import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHeaderComponent } from './admin-header/admin-header.component'; // Import component
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component'; // Import component

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminNavbarComponent,
    RouterModule,
    ReactiveFormsModule,
    AdminLayoutComponent,
    AdminHeaderComponent, // Import component ở đây
    AdminFooterComponent, // Import component ở đây
    FormsModule,  // FormsModule cần được import ở đây
  ],
  declarations: [
    // Khai báo các component khác không phải standalone ở đây
  ],
  exports: [],
  providers: [
    AppComponent,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AdminModule { }
