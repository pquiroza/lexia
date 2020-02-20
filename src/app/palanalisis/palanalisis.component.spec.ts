import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PalanalisisComponent } from './palanalisis.component';

describe('PalanalisisComponent', () => {
  let component: PalanalisisComponent;
  let fixture: ComponentFixture<PalanalisisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PalanalisisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PalanalisisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
