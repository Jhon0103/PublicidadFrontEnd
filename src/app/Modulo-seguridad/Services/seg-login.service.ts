import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { listarModuloDTO, loginModel, RegistroUsuarioDTO, UsuarioDTO } from '../Models/seg-login.model';
import { ApiResponse } from 'src/assets/Model/globals-constants.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SegLoginService {

  constructor(private http: HttpClient) { }
  private apiURL_Usuario = environment.url_api + 'Usuario';

  public login(usuario: loginModel): Observable<ApiResponse<UsuarioDTO>> {
    return this.http.post<ApiResponse<UsuarioDTO>>(this.apiURL_Usuario + '/validarUsuario', usuario);
  }

  public obtienePermisosPorUsuario(idUsuario: number): Observable<ApiResponse<listarModuloDTO[]>> {
    return this.http.get<ApiResponse<listarModuloDTO[]>>(this.apiURL_Usuario + `/listarUsuarioModulo?idUsuario=`+idUsuario);
  }
  public crearUsuario(usuario : RegistroUsuarioDTO): Observable<ApiResponse<RegistroUsuarioDTO>> {
    return this.http.post<ApiResponse<RegistroUsuarioDTO>>(this.apiURL_Usuario + '/crearUsuario', usuario);
  }
  public subirArchivo(id:number,formData: FormData){
    return this.http.post(`${this.apiURL_Usuario}/uploadFile?id=`+id, formData, { reportProgress: true });
  }
}
