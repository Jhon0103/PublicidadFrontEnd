import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClSolicitudRegistraComponent } from './cl-solicitud-registra.component';

describe('ClSolicitudRegistraComponent', () => {
  let component: ClSolicitudRegistraComponent;
  let fixture: ComponentFixture<ClSolicitudRegistraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClSolicitudRegistraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClSolicitudRegistraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
