import { TestBed } from '@angular/core/testing';

import { ProductPercentageService } from './product-percentage.service';

describe('ProductPercentageService', () => {
  let service: ProductPercentageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductPercentageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
