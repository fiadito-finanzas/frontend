import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteCuentacorrienteComponent } from './cliente-cuentacorriente.component';

describe('ClienteCuentacorrienteComponent', () => {
  let component: ClienteCuentacorrienteComponent;
  let fixture: ComponentFixture<ClienteCuentacorrienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteCuentacorrienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteCuentacorrienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
