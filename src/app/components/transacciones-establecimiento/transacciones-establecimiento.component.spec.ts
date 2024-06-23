import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionesEstablecimientoComponent } from './transacciones-establecimiento.component';

describe('TransaccionesEstablecimientoComponent', () => {
  let component: TransaccionesEstablecimientoComponent;
  let fixture: ComponentFixture<TransaccionesEstablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransaccionesEstablecimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransaccionesEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
