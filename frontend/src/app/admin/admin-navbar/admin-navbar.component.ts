import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faTags, faBoxOpen, faFolderOpen, faNewspaper, faUser, faGift, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons'; // Import the FontAwesome comments icon

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  home = faHome;
  productCategory = faTags;
  product = faBoxOpen;
  postCategory = faFolderOpen;
  post = faNewspaper;
  user = faUser;
  voucher = faGift;
  order = faShoppingCart;
  logout = faSignOutAlt;
  
  isSidebarOpen: boolean = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  faComments = faComments; // Define the property for the icon
}
