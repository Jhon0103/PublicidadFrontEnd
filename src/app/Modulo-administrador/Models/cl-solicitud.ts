export class solicitudDTO {
  idSolicitud: number;
  proyecto: string;
  descripcion: string;
  idTipoSolicitud: number;
  fechaEstimadaUsuario?: string;
  fechaEstimadaEntrega?: string;
  idEstadoSolicitud: number;
  comentarios: string;
  idUsuario: number;

  tipoSolicitud: string;
  estado: string;
  fechaCrea?: string;
  usuario : string;

  constructor() {
    this.idSolicitud = 0;
    this.proyecto = '';
    this.descripcion = '';
    this.idTipoSolicitud = 0;
    this.idEstadoSolicitud = 0;
    this.comentarios = '';
    this.idUsuario = 0;

    // campos del join
    this.tipoSolicitud = '';
    this.estado = '';
    this.usuario = '';
  }
}
export class tipoSolicitud{
  idTipoSolicitud! : number;
  tipoSolicitud! : string;
  descripcion! : string;
}

export class listaEstado{
  idEstadoSolicitud! : number;
  estado! : string;
}

export class SolicitudDashboardDTO {
  totalSolicitudes!: number;
  aprobadas!: number;
  rechazadas!: number;
  solicitudesPorTipo!: SolicitudPorTipoDTO[];
  solicitudesPorFecha!: SolicitudPorFechaDTO[];
}

export class SolicitudPorTipoDTO {
  idTipoSolicitud!: number;
  nombreTipo!: string;
  cantidad!: number;
}

export class SolicitudPorFechaDTO {
  fecha!: string;   // formato ISO o yyyy-MM-dd
  cantidad!: number;
}
