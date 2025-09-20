import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegRegistraUsuarioDialogComponent } from './seg-registra-usuario-dialog.component';

describe('SegRegistraUsuarioDialogComponent', () => {
  let component: SegRegistraUsuarioDialogComponent;
  let fixture: ComponentFixture<SegRegistraUsuarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegRegistraUsuarioDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegRegistraUsuarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
