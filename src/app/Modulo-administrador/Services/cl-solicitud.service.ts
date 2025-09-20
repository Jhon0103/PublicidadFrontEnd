import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SolicitudDashboardDTO, solicitudDTO, tipoSolicitud } from '../Models/cl-solicitud';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/assets/Model/globals-constants.model';

@Injectable({
  providedIn: 'root'
})
export class ClSolicitudService {
  ip:string='';

  constructor(private http: HttpClient) { }

    private SolicitudController = environment.url_api + 'Solicitud';

    listarSolicitud(fechaIni: string, fechaFin: string, idUsuario : number): Observable<ApiResponse<solicitudDTO[]>> {
      return this.http.get<ApiResponse<solicitudDTO[]>>(`${this.SolicitudController}/listarSolicitud?fechaIni=${fechaIni}&fechaFin=${fechaFin}&idUsuario=${idUsuario}`);
    }
    listarSolicitudCliente(fechaIni: string, fechaFin: string, idUsuario : number): Observable<ApiResponse<solicitudDTO[]>> {
      return this.http.get<ApiResponse<solicitudDTO[]>>(`${this.SolicitudController}/listarSolicitudCliente?fechaIni=${fechaIni}&fechaFin=${fechaFin}&idUsuario=${idUsuario}`);
    }
    insertarSolicitud(solicitud: solicitudDTO): Observable<ApiResponse<any>> {
      return this.http.post<ApiResponse<any>>(`${this.SolicitudController}/insertarSolicitud`, solicitud);
    }
    actualizaSolicitudCliente(solicitud: solicitudDTO): Observable<ApiResponse<any>> {
      return this.http.post<ApiResponse<any>>(`${this.SolicitudController}/actualizaSolicitudCliente`, solicitud);
    }
    actualizaSolicitud(solicitud: solicitudDTO): Observable<ApiResponse<any>> {
      return this.http.post<ApiResponse<any>>(`${this.SolicitudController}/actualizaSolicitud`, solicitud);
    }
    listarTipoSolicitud(): Observable<ApiResponse<tipoSolicitud[]>> {
      return this.http.get<ApiResponse<tipoSolicitud[]>>(`${this.SolicitudController}/listarTipoSolicitud`);
    }
    obtenerDashboard(fechaIni: string, fechaFin: string): Observable<ApiResponse<SolicitudDashboardDTO>> {
      return this.http.get<ApiResponse<SolicitudDashboardDTO>>(
        `${this.SolicitudController}/obtenerDashboard?fechaIni=${fechaIni}&fechaFin=${fechaFin}`
      );
    }
}
