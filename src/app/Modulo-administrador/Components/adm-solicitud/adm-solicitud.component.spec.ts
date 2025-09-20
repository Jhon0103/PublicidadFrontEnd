import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmSolicitudComponent } from './adm-solicitud.component';

describe('AdmSolicitudComponent', () => {
  let component: AdmSolicitudComponent;
  let fixture: ComponentFixture<AdmSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
