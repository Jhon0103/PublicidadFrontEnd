import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { accesoDirecto, listarModuloDTO, loginModel, UsuarioDTO } from 'src/app/Modulo-seguridad/Models/seg-login.model';
import { SegLoginService } from 'src/app/Modulo-seguridad/Services/seg-login.service';
import { StorageService } from 'src/app/Modulo-seguridad/Services/storage.service';
import { UserContextService } from 'src/app/Modulo-seguridad/Services/user-context.service';
import { ApiResponse } from 'src/assets/Model/globals-constants.model';
import swal from 'sweetalert2';
import { SEGCargaEsperaComponent } from '../../seg-carga-espera/seg-carga-espera.component';

@Component({
  selector: 'app-seg-login',
  templateUrl: './seg-login.component.html',
  styleUrls: ['./seg-login.component.css']
})
export class SegLoginComponent implements OnInit {
  apiReponse?: ApiResponse<any>;
  subscription = new Subscription();
  formularioLogin!: FormGroup;

  modeloLogin = new loginModel();
  modeloUsuario = new UsuarioDTO();

  accesoDirecto: accesoDirecto[] = [];
  modeloModuloNew: listarModuloDTO[] = [];

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly loginService: SegLoginService,
    private readonly storageService: StorageService,
    private readonly userContextService: UserContextService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.formularioLogin = this.fb.group({
      login: new FormControl('', [Validators.required, Validators.minLength(4)]),
      clave: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  restauraClave() {
    this.router.navigate(['/restaura-clave']);
  }

  registrarse() {
    this.router.navigate(['/registrarse']);
  }

  login() {
    if (this.formularioLogin.invalid) {
      swal.fire("Login", "Complete todos los campos correctamente", 'warning');
      return;
    }

    this.modeloLogin.user = this.formularioLogin.value.login;
    this.modeloLogin.password = btoa(this.formularioLogin.value.clave); // base64

    const dialogRef = this.dialog.open(SEGCargaEsperaComponent, {
      disableClose: true,
      panelClass: 'fondo-carga',
    });

    this.subscription = this.loginService.login(this.modeloLogin)
      .subscribe({
        next: (response: ApiResponse<any>) => {
          this.apiReponse = response;

          if (response?.code === 200) {
            this.modeloUsuario = response.data;
            this.onObtienePermisosPorUsuario(this.modeloUsuario.idUsuario);
          } else {
            swal.fire('Algo salió mal', 'Inténtalo nuevamente', 'error');
          }
          dialogRef.close();
        },
        error: (error) => {
          const mensaje = error.error?.message || 'Error desconocido';
          swal.fire('Validar información', mensaje, 'error');
          dialogRef.close();
        }
      });
  }

  onObtienePermisosPorUsuario(idUsuario: number) {
    this.subscription = this.loginService.obtienePermisosPorUsuario(idUsuario)
      .subscribe({
        next: (res: ApiResponse<listarModuloDTO[]>) => {
          if (res?.code === 200) {
            this.setArmaMenuDinamico(res.data);
          } else {
            swal.fire('Algo salió mal', 'Inténtalo nuevamente', 'error');
          }
        },
        error: (error) => {
          const mensaje = error.error?.message || 'Error desconocido';
          swal.fire('Usuario sin accesos', mensaje, 'error');
        }
      });
  }

  setArmaMenuDinamico(modulos: listarModuloDTO[]) {
    const moduloMap = new Map<number, listarModuloDTO>();
    const menuRaiz: listarModuloDTO[] = [];
    this.accesoDirecto = [];

    modulos.forEach(modulo => {
      modulo.listarModuloDTO = [];

      if (modulo.urlModulo) {
        this.accesoDirecto.push({ idModulo: modulo.idModulo!, url: modulo.urlModulo });
      }

      moduloMap.set(modulo.idModulo!, modulo);
    });

    modulos.forEach(modulo => {
      if (modulo.idModulo2 === 0) {
        menuRaiz.push(modulo);
      } else {
        const padre = moduloMap.get(modulo.idModulo2!);
        padre?.listarModuloDTO?.push(modulo);
      }
    });

    this.modeloModuloNew = menuRaiz;
    this.storageService.setItem('menu', this.modeloModuloNew);
    this.storageService.setItem('accesoDirecto', this.accesoDirecto);

    this.onGuardarDatosUsuario(this.modeloUsuario);

    const primerPadre = this.modeloModuloNew.find(m => m.listarModuloDTO?.length);
    const primerHijoConUrl = primerPadre?.listarModuloDTO?.find(h => h.urlModulo);

    if (primerHijoConUrl?.urlModulo) {
      this.router.navigate(['/main', primerHijoConUrl.urlModulo.replace(/^\/+/, '')]);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onGuardarDatosUsuario(usuario: UsuarioDTO) {

    this.storageService.setItemEncrypt('idUsuario', usuario.idUsuario);
    this.storageService.setItemEncrypt('correo', usuario.correo); // 👈 ¿esto tiene valor?
    this.storageService.setItemEncrypt('estado', usuario.estado);
    this.storageService.setItemEncrypt('idPerfil', usuario.idPerfil);
    this.storageService.setItemEncrypt('idPersona', usuario.idPersona);
    this.storageService.setItemEncrypt('codigoCliente', usuario.codigoCliente); // 👈 ¿esto tiene valor?
    this.storageService.setItemEncrypt('numeroDocumento', usuario.numeroDocumento);
    this.storageService.setItemEncrypt('user', usuario.user);
    this.storageService.setItemEncrypt('usuario', usuario.usuario);

    const rol = (
      usuario.idPerfil === 1 ? 'admin' :
      usuario.idPerfil === 2 ? 'trabajador' :
      'cliente'
    ) as 'admin' | 'trabajador' | 'cliente';

    const userContext = {
      idUsuario: usuario.idUsuario,
      user: usuario.user ?? '',
      idPerfil: usuario.idPerfil ?? 0,
      rol: rol
    };

    this.userContextService.setUser(userContext);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
