import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVoucherComponent } from './admin-voucher.component';

describe('AdminVoucherComponent', () => {
  let component: AdminVoucherComponent;
  let fixture: ComponentFixture<AdminVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVoucherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
