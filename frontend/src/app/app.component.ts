import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './client/header/header.component';
import { FooterComponent } from './client/footer/footer.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'datn';
  constructor(private router: Router) {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
