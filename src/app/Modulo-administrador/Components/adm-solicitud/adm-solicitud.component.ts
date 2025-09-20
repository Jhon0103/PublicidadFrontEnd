import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { solicitudDTO } from '../../Models/cl-solicitud';
import { ClSolicitudService } from '../../Services/cl-solicitud.service';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'src/assets/Model/globals-constants.model';
import { StorageService } from 'src/app/Modulo-seguridad/Services/storage.service';

@Component({
  selector: 'app-adm-solicitud',
  templateUrl: './adm-solicitud.component.html',
  styleUrls: ['./adm-solicitud.component.css']
})
export class AdmSolicitudComponent implements OnInit {

  dataSource = new MatTableDataSource<solicitudDTO>();
  fechaInicio!: string;
  fechaFin!: string;
  idUsuario! : number;

  constructor(
    private solicitudService: ClSolicitudService,
    private storageService: StorageService,
    private router: Router,
  ) { }
  subscription!: Subscription;
  columnasMostrar: string[] = [
    'proyecto',
    'tipoSolicitud',
    'usuario',
    'estado',
    'fechaCrea',
    'comentarios',
    'acciones'
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {

    this.idUsuario=this.storageService.getItemDecrypt('idUsuario');
    const hoy = new Date();
    const ayer = new Date();
    ayer.setDate(hoy.getDate() - 1);

    this.fechaInicio = this.formatearFecha(ayer);
    this.fechaFin = this.formatearFecha(hoy);

    this.listarSolicitud();
  }

  private formatearFecha(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const day = String(fecha.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  listarSolicitud(): void {
    if (this.fechaInicio && this.fechaFin) {
      this.subscription = this.solicitudService.listarSolicitud(this.fechaInicio, this.fechaFin, this.idUsuario)
      .subscribe({
        next: (res: ApiResponse<solicitudDTO[]>) => {
          if (res?.code === 200 || res.data) {
            this.dataSource.data = res.data;
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
  }


  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  verDetalle(solicitud: solicitudDTO) {
    this.router.navigate(['/main/adm-solicitud-nuevo'], {
      state: { solicitud }
    });
  }
  /** Limpia el filtro de la tabla */
clearFilter(): void {
  this.dataSource.filter = '';
}

}
