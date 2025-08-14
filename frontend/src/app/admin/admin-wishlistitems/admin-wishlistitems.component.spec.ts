import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWishlistitemsComponent } from './admin-wishlistitems.component';

describe('AdminWishlistitemsComponent', () => {
  let component: AdminWishlistitemsComponent;
  let fixture: ComponentFixture<AdminWishlistitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminWishlistitemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminWishlistitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
