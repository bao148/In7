import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditVoucherComponent } from './admin-edit-voucher.component';

describe('AdminEditVoucherComponent', () => {
  let component: AdminEditVoucherComponent;
  let fixture: ComponentFixture<AdminEditVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEditVoucherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
