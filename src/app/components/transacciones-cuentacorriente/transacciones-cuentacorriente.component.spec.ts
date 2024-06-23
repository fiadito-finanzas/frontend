import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionesCuentacorrienteComponent } from './transacciones-cuentacorriente.component';

describe('TransaccionesCuentacorrienteComponent', () => {
  let component: TransaccionesCuentacorrienteComponent;
  let fixture: ComponentFixture<TransaccionesCuentacorrienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransaccionesCuentacorrienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransaccionesCuentacorrienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
