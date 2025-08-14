import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [ RouterLink, RouterOutlet, HeaderComponent,FooterComponent ],
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.css',
})
export class ClientLayoutComponent {}
