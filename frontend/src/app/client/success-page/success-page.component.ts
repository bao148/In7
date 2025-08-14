import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [RouterModule, CommonModule], // Import RouterModule
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css'],
})
export class SuccessPageComponent implements OnInit {
  orderId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Lấy orderId từ query params (nếu có)
    this.orderId = this.route.snapshot.queryParamMap.get('orderId');
  }
}
