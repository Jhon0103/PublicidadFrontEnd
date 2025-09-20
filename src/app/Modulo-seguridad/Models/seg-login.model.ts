export interface menuListaDTO{
    text:string;
    icon:string;
    routerLink: string;
    children: menuListaDTO[];

}
export class loginModel
{
    user?: string;
    password?: string;

    constructor()
    {
        this.user = '';
        this.password = '';
    }
}

export class UsuarioDTO
{
    codigoCliente?: string = "";
    correo?: string ="";
    estado?: boolean = false;
    idPerfil?: number = 0;
    idPersona?: number = 0;
    idUsuario: number = 0;
    numeroDocumento?: string = '';
    password?: string = "";
    user?: string = "";
    usuario?: string = "";
}

export class accesoDirecto{
    idModulo?:number;
    codigoAccesoDirecto?:string;
    url?:string;
}

export class listarModuloDTO
{
    esPadre?: boolean;
    icono?: string;
    idModulo?:number;
    idModulo2?:number;
    nivel?:number;
    modulo?:string;
    orden?:number;
    urlModulo?:string;
    listarModuloDTO?: listarModuloDTO[];
}
export interface UsuarioContext {
  idUsuario: number;
  user: string;
  idPerfil: number;
  rol: 'admin' | 'trabajador' | 'cliente';
  // puedes agregar más campos si usas otros
}
export const defaultUser: UsuarioContext = {
  idUsuario: 0,
  user: '',
  idPerfil: 0,
  rol: 'cliente' // o un valor por defecto válido
};

export class RegistroUsuarioDTO {
  // Datos del usuario
  idUsuario : number
  user: string;
  password: string;
  nombreUsuario: string;
  numeroDocumento: string;
  correo: string;
  estado: boolean;

  // Datos personales
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  celular: string;
  idTipoDocumento: number;
  contacto: string;
  codigoCliente?: number;

  // Datos empresa
  esEmpresa: boolean;
  razonSocial?: string;
  ruc?: string;
  partidaRegistral?: boolean;
  nombreArchivoPartida?: string;
  archivoPartida?: File;

  constructor() {
    this.idUsuario = 0;
    this.user = '';
    this.password = '';
    this.nombreUsuario = '';
    this.numeroDocumento = '';
    this.correo = '';
    this.estado = true;

    this.nombres = '';
    this.apellidoPaterno = '';
    this.apellidoMaterno = '';
    this.fechaNacimiento = '';
    this.celular = '';
    this.idTipoDocumento = 1;
    this.contacto = '';
    this.codigoCliente = undefined;

    this.esEmpresa = false;
    this.razonSocial = '';
    this.ruc = '';
    this.partidaRegistral = false;
    this.nombreArchivoPartida = '';
    this.archivoPartida = undefined;
  }
}
