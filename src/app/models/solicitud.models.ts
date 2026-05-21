export interface Solicitud {
  id: number;
  fecha: string;
  montoSolicitado: number;
  ingresos: number;
  egresos: number;
  fechaRecepcion: string;
  clienteId: number;
  productoId: number;
  estadoId: number;
  asesorId: number;
}