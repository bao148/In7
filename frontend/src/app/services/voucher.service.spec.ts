import { TestBed } from '@angular/core/testing';

import { VoucherService } from './voucher.service';

describe('ProductService', () => {
  let service: VoucherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoucherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
