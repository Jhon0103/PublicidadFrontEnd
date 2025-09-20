import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { listaEstado, solicitudDTO, tipoSolicitud } from 'src/app/Modulo-administrador/Models/cl-solicitud';
import { ClSolicitudService } from 'src/app/Modulo-administrador/Services/cl-solicitud.service';
import { UserContextService } from 'src/app/Modulo-seguridad/Services/user-context.service';
import { ApiResponse } from 'src/assets/Model/globals-constants.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cl-solicitud-nuevo',
  templateUrl: './cl-solicitud-nuevo.component.html',
  styleUrls: ['./cl-solicitud-nuevo.component.css']
})
export class ClSolicitudNuevoComponent implements OnInit {

  idUsuario! : number;

  form!: FormGroup;
  tipoSolicitud!: tipoSolicitud[];
  listaEstado! : listaEstado[];
  subscription!: Subscription;
  modeloGrabar? : solicitudDTO;
  modeloEditar? : solicitudDTO;
  constructor(
    private fb: FormBuilder,
    private solicitudService: ClSolicitudService,
    private userContext: UserContextService,
    private router: Router,
  ) {
    this.modeloEditar = new solicitudDTO();
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { solicitud: solicitudDTO };

    if (state && state.solicitud) {
      this.modeloEditar! = state.solicitud;
    }
  }

  ngOnInit(): void {
    this.listaEstado = [{idEstadoSolicitud: 1,estado :'En Proceso'},{idEstadoSolicitud: 2,estado :'Aprobada'},{idEstadoSolicitud : 3,estado : 'Rechazada'}]
    this.modeloGrabar = new solicitudDTO()

    this.idUsuario = this.userContext.getIdUsuario()
    this.form = this.fb.group({
      proyecto: ['', Validators.required],
      descripcion: ['', Validators.required],
      idTipoSolicitud: ['', Validators.required],
      fechaEstimadaUsuario: ['', Validators.required],
      idEstado: ['', Validators.required],
      comentarios: ['', Validators.required],
      fechaEstimadaEntrega: ['', Validators.required]
    });
    this.listarTipos();

    this.form.controls['idEstado'].disable();
    this.form.controls['idEstado'].setValue(1);
    this.form.controls['comentarios'].disable();
    this.form.controls['fechaEstimadaEntrega'].disable();

    if(this.modeloEditar!.idSolicitud != 0){
      this.modeloGrabar = this.modeloEditar
      this.editarCompra(this.modeloGrabar!)
    }
  }

  editarCompra(solicitud : solicitudDTO){
    const fecha = solicitud.fechaEstimadaUsuario?.substring(0, 10);
    const fechaEntrega = solicitud.fechaEstimadaEntrega?.substring(0, 10);
    this.form.controls['proyecto'].setValue(solicitud.proyecto);
    this.form.controls['idTipoSolicitud'].setValue(solicitud.idTipoSolicitud);

    this.form.controls['fechaEstimadaUsuario'].setValue(fecha);
    this.form.controls['descripcion'].setValue(solicitud.descripcion);
    this.form.controls['idEstado'].setValue(solicitud.idEstadoSolicitud);
    this.form.controls['comentarios'].setValue(solicitud.comentarios);
    this.form.controls['fechaEstimadaEntrega'].setValue(fechaEntrega);

    if (solicitud.estado != 'En proceso'){
      this.form.disable();
    }
    else{
      this.form.controls['idEstado'].disable();
      this.form.controls['comentarios'].disable();
      this.form.controls['fechaEstimadaEntrega'].disable();
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
    this.modeloGrabar!.proyecto = this.form.controls['proyecto'].value;
    this.modeloGrabar!.idTipoSolicitud = this.form.controls['idTipoSolicitud'].value;
    this.modeloGrabar!.fechaEstimadaUsuario = this.form.controls['fechaEstimadaUsuario'].value;
    this.modeloGrabar!.descripcion = this.form.controls['descripcion'].value;
    this.modeloGrabar!.idEstadoSolicitud = this.form.controls['idEstado'].value;
    this.modeloGrabar!.comentarios = this.form.controls['comentarios'].value;

    this.modeloGrabar!.idUsuario = this.idUsuario
    if(this.modeloGrabar!.idSolicitud == 0){

      this.subscription = this.solicitudService.insertarSolicitud(this.modeloGrabar!)
      .subscribe({
        next: (res) => {
          if (res.data! > 0) {
            swal.fire('Éxito', 'Solicitud registrada correctamente', 'success');
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
    else{
      this.modeloGrabar!.fechaEstimadaEntrega = this.form.controls['fechaEstimadaEntrega'].value;
      this.subscription = this.solicitudService.actualizaSolicitudCliente(this.modeloGrabar!)
      .subscribe({
        next: (res) => {
          if (res.data! > 0) {
            swal.fire('Éxito', 'Solicitud registrada correctamente', 'success');
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
  }

  cancelar() {
    this.router.navigate(['/main/cl-solicitud']);
  }

}
