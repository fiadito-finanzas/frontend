import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCuentaCorrienteComponent } from './crear-cuenta-corriente.component';

describe('CrearCuentaCorrienteComponent', () => {
  let component: CrearCuentaCorrienteComponent;
  let fixture: ComponentFixture<CrearCuentaCorrienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCuentaCorrienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearCuentaCorrienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
