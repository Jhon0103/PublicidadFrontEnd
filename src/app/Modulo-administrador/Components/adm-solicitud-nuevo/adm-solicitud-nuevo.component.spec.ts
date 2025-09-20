import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmSolicitudNuevoComponent } from './adm-solicitud-nuevo.component';

describe('AdmSolicitudNuevoComponent', () => {
  let component: AdmSolicitudNuevoComponent;
  let fixture: ComponentFixture<AdmSolicitudNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmSolicitudNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmSolicitudNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
