import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserContextService } from 'src/app/Modulo-seguridad/Services/user-context.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClPerfilService {
  ip:string='';

  constructor(private http: HttpClient,
    private userContextService: UserContextService) { }
    getIPAddress()
    {
      this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
        //console.log(res.ip);
        this.ip = res.ip;
      });

    }

    private apiURL = environment.url_api + 'ClientePerfil';
    private apiURL_Operacion = environment.url_api + 'Operacion';
    private apiURL_dash = environment.url_api + 'Dashboard';

    public subirArchivo(id:number,formData: FormData){
      return this.http.post(`${this.apiURL_Operacion}/uploadFile?id=`+id, formData, { reportProgress: true });
    }

    public descargaArchivo(id:number, documento:string) {
      //return this.http.get<listaCuentaBanco[]>(`${this.apiURL}/descargar?id=`+id + '&Documento='+documento);
      return this.http.get(`${this.apiURL_Operacion}/descargar?id=${id}&Documento=${documento}`, {responseType: 'blob'});
    }

}
