import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClSolicitudComponent } from './cl-solicitud.component';

describe('ClSolicitudComponent', () => {
  let component: ClSolicitudComponent;
  let fixture: ComponentFixture<ClSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
