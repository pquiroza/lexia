import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallefraseComponent } from './detallefrase.component';

describe('DetallefraseComponent', () => {
  let component: DetallefraseComponent;
  let fixture: ComponentFixture<DetallefraseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallefraseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallefraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
