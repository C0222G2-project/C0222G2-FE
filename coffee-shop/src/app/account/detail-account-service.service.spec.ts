import { TestBed } from '@angular/core/testing';

import { DetailAccountServiceService } from './detail-account-service.service';

describe('DetailAccountServiceService', () => {
  let service: DetailAccountServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailAccountServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
