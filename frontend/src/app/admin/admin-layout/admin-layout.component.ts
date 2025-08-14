import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from '../admin-footer/admin-footer.component';
import { AdminWrapperComponent } from '../admin-wrapper/admin-wrapper.component';
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, AdminWrapperComponent, AdminHeaderComponent, AdminNavbarComponent, AdminFooterComponent ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {}
