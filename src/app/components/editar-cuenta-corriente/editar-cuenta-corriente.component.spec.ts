import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCuentaCorrienteComponent } from './editar-cuenta-corriente.component';

describe('EditarCuentaCorrienteComponent', () => {
  let component: EditarCuentaCorrienteComponent;
  let fixture: ComponentFixture<EditarCuentaCorrienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCuentaCorrienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarCuentaCorrienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
