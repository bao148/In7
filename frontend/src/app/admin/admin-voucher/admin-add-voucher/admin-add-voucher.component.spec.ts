import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddVoucherComponent } from './admin-add-voucher.component';

describe('AdminAddVoucherComponent', () => {
  let component: AdminAddVoucherComponent;
  let fixture: ComponentFixture<AdminAddVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddVoucherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
