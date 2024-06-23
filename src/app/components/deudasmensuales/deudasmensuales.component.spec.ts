import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudasmensualesComponent } from './deudasmensuales.component';

describe('DeudasmensualesComponent', () => {
  let component: DeudasmensualesComponent;
  let fixture: ComponentFixture<DeudasmensualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeudasmensualesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeudasmensualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
