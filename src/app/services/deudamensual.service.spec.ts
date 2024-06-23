import { TestBed } from '@angular/core/testing';

import { DeudamensualService } from './deudamensual.service';

describe('DeudamensualService', () => {
  let service: DeudamensualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeudamensualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
