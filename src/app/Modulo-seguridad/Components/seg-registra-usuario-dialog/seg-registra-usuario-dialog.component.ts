import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpRequest } from '@angular/common/http';
import { RegistroUsuarioDTO } from '../../Models/seg-login.model';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SegLoginService } from '../../Services/seg-login.service';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-seg-registra-usuario-dialog',
  templateUrl: './seg-registra-usuario-dialog.component.html',
  styleUrls: ['./seg-registra-usuario-dialog.component.css']
})
export class SegRegistraUsuarioDialogComponent implements OnInit{
  form!: FormGroup;
  subscription!: Subscription;
  tipoSeleccionado: boolean | null = null;
  esEmpresa = false;
  archivoPartida: File | null = null;
  escogio : boolean = false;
  modeloGrabar? : RegistroUsuarioDTO;


  constructor(
    private fb: FormBuilder,
    private loginService: SegLoginService,
    private router: Router,
    public dialogRef: MatDialogRef<RegistroUsuarioDTO>,
  ) {
    this.form = this.fb.group({
      nombreUsuario: [''],
      user: [''],
      password: [''],
      idTipoDocumento: [1],
      numeroDocumento: [''],
      nombres: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      correo: [''],
      celular: [''],
      fechaNacimiento: [''],

      // empresa
      razonSocial: [''],
      ruc: [''],
      partidaRegistral: [false]
    });
  }
  ngOnInit(): void {
  }

  seleccionarTipo(esEmpresa: boolean) {
    this.escogio = true;
    this.tipoSeleccionado = esEmpresa;
    this.esEmpresa = esEmpresa;
  }

  volver() {
    this.escogio =false;
    this.tipoSeleccionado = null;
    this.esEmpresa = false;
    this.form.reset();
  }

  cargarArchivo(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.archivoPartida = file;
      console.log('Archivo seleccionado:', file.name);
    }
  }

  registrar() {
    if (this.form.invalid) return;

    const tipo = this.tipoSeleccionado;
    const form = this.form.controls;

    this.modeloGrabar = new RegistroUsuarioDTO();
    this.modeloGrabar.user = form['nombreUsuario'].value;
    this.modeloGrabar.password = btoa(form['password'].value);
    this.modeloGrabar.nombres = form['nombres'].value;
    this.modeloGrabar.apellidoPaterno = form['apellidoPaterno'].value;
    this.modeloGrabar.apellidoMaterno = form['apellidoMaterno'].value;
    this.modeloGrabar.numeroDocumento = form['numeroDocumento'].value;
    this.modeloGrabar.correo = form['correo'].value;
    this.modeloGrabar.celular = form['celular'].value;
    this.modeloGrabar.fechaNacimiento = form['fechaNacimiento'].value;

    if (tipo === true) {
      this.modeloGrabar.razonSocial = form['razonSocial'].value;
      this.modeloGrabar.ruc = form['ruc'].value;
      this.modeloGrabar.partidaRegistral = form['partidaRegistral'].value;
    }

    this.subscription = this.loginService.crearUsuario(this.modeloGrabar)
      .subscribe({
        next: (res) => {
          if (res.data.idUsuario! > 0) {
            this.subirArchivo(res.data.idUsuario)
            swal.fire('Éxito', 'Usuario registrado correctamente', 'success');
            this.dialogRef.close(res.data);
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
  subirArchivo(id:number){
    const formData = new FormData();

    formData.append('files', this.archivoPartida!);

    //const request = new HttpRequest('POST', `${environment.url_api}Compras/uploadFile`, formData, { reportProgress: true });

    this.subscription = this.loginService.subirArchivo(id,formData)
    .subscribe((resp) => {
      },
      (error) => console.error(error));
    }
}
