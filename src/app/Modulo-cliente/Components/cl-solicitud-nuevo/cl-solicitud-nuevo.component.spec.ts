import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClSolicitudNuevoComponent } from './cl-solicitud-nuevo.component';

describe('ClSolicitudNuevoComponent', () => {
  let component: ClSolicitudNuevoComponent;
  let fixture: ComponentFixture<ClSolicitudNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClSolicitudNuevoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClSolicitudNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
