import { TestBed } from '@angular/core/testing';

import { CuentacorrienteService } from './cuentacorriente.service';

describe('CuentacorrienteService', () => {
  let service: CuentacorrienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuentacorrienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
