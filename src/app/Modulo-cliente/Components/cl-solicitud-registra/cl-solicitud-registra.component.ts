import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { solicitudDTO, tipoSolicitud } from 'src/app/Modulo-administrador/Models/cl-solicitud';
import { ClSolicitudService } from 'src/app/Modulo-administrador/Services/cl-solicitud.service';
import { SegRegistraUsuarioDialogComponent } from 'src/app/Modulo-seguridad/Components/seg-registra-usuario-dialog/seg-registra-usuario-dialog.component';
import { UserContextService } from 'src/app/Modulo-seguridad/Services/user-context.service';
import { ApiResponse } from 'src/assets/Model/globals-constants.model';
import swal from 'sweetalert2';


@Component({
  selector: 'app-cl-solicitud-registra',
  templateUrl: './cl-solicitud-registra.component.html',
  styleUrls: ['./cl-solicitud-registra.component.css']
})
export class ClSolicitudRegistraComponent implements OnInit {

  idUsuario! : number;

  form!: FormGroup;
  tipoSolicitud!: tipoSolicitud[];
  subscription!: Subscription;
  modeloGrabar? : solicitudDTO;
  modeloEditar? : solicitudDTO;
  tipoSolicitudDesc? : string = '';

  colorBorde: string = 'borde-gris';
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private solicitudService: ClSolicitudService,
    private userContext: UserContextService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.modeloGrabar = new solicitudDTO()

    this.idUsuario = this.userContext.getIdUsuario()
    this.form = this.fb.group({
      proyecto: ['', Validators.required],
      descripcion: ['', Validators.required],
      idTipoSolicitud: ['', Validators.required],
      fechaEstimadaUsuario: ['', Validators.required],
    });
    this.listarTipos();


  }
  actualizarDescripcion(idTipo: number) {
    const tipo = this.tipoSolicitud.find(t => t.idTipoSolicitud === idTipo);

    this.tipoSolicitudDesc = tipo?.descripcion || '';

    // Asignar color según el ID o nombre (puedes ajustar esto)
    switch (idTipo) {
      case 1:
        this.colorBorde = 'borde-verde';
        break;
      case 2:
        this.colorBorde = 'borde-azul';
        break;
      case 3:
        this.colorBorde = 'borde-rojo';
        break;
      default:
        this.colorBorde = 'borde-gris';
        break;
    }
  }
  listarTipos(): void {
      this.subscription = this.solicitudService.listarTipoSolicitud()
      .subscribe({
        next: (res: ApiResponse<tipoSolicitud[]>) => {
          if (res?.code === 200 || res.data) {
            this.tipoSolicitud = res.data
          } else {
          swal.fire('Algo salió mal', 'Inténtalo nuevamente', 'error');
            }
        },
        error: (error) => {
          const mensaje = error.error?.message || 'Error desconocido';
          swal.fire('Intenta con otras fechas', mensaje, 'error');
        }
      });
    }

  registrarSolicitud() {
    if (this.form.invalid) return;
    //insertar dialog para el usuario
    const dialogRef = this.dialog.open(SegRegistraUsuarioDialogComponent, {
      width: '50%',
      height: '90vh',
      disableClose : true,
    });

    dialogRef.afterClosed().subscribe(data => {
      if(data.idUsuario){
        this.idUsuario! = data.idUsuario;
      this.modeloGrabar!.proyecto = this.form.controls['proyecto'].value;
      this.modeloGrabar!.idTipoSolicitud = this.form.controls['idTipoSolicitud'].value;
      this.modeloGrabar!.fechaEstimadaUsuario = this.form.controls['fechaEstimadaUsuario'].value;
      this.modeloGrabar!.descripcion = this.form.controls['descripcion'].value;
      this.modeloGrabar!.idUsuario = this.idUsuario

      this.subscription = this.solicitudService.insertarSolicitud(this.modeloGrabar!)
      .subscribe({
        next: (res) => {
          if (res.data! > 0) {
            this.router.navigate(['/main/cl-solicitud']);
          } else {
            swal.fire('Error', 'Ocurrió un problema al registrar', 'error');
          }
        },
        error: (error) => {
          const mensaje = error.error?.message || 'Error desconocido';
          swal.fire('La solicitud no pudo guardarse', mensaje, 'error');
        }
      });
      }
    });
  }
}
