import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarTransaccionComponent } from './registrar-transaccion.component';

describe('RegistrarTransaccionComponent', () => {
  let component: RegistrarTransaccionComponent;
  let fixture: ComponentFixture<RegistrarTransaccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarTransaccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
