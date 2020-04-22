/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const { API_ROOT } = process.env;

export const FETCH_PRELOAD_DATA = 'app/containers/App/FETCH_PRELOAD_DATA';
export const FETCH_PRELOAD_DATA_ERROR =
  'app/containers/App/FETCH_PRELOAD_DATA_ERROR';
export const FETCH_PRELOAD_DATA_SUCCESS =
  'app/containers/App/FETCH_PRELOAD_DATA_SUCCESS';

export const LOGOUT = 'app/containers/App/LOGOUT';

export const PERMISSIONS = [
  'Administra roles',
  'Administra usuarios',
  'Administra inmobiliarias',
  'Es representante inmobiliario',
  'Consulta roles',
  'Consulta usuarios',
  'Consulta inmobiliarias',
  'Es jefe de proyectos',
  'Es vendedor',
  'Es asistente comercial',
  'Consulta parámetros',
  'Administra parámetros',
  'Administra proyectos',
  'Aprueba proyectos',
  'Monitorea proyectos',
  'Es aprobador inmobiliario',
  'Consulta proyectos',
  'Administra clientes',
  'Consulta clientes',
  'Aprueba inmuebles',
  'Recepciona garantias',
  'Aprueba confeccion promesa',
  'Confecciona maquetas',
];

export const USER_PROYECTO_TYPE = [
  'Representante',
  'Jefe de Proyecto',
  'Vendedor',
  'Asistente Comercial',
  'Aprobador',
  'Marketing',
  'Legal',
  'Finanza',
  'Autorizador',
];

export const PROYECTO_DOCUMENT_STATE = ['Pendiente', 'Agregado'];

export const PROYECTO_APPROVAL_STATE = [
  'Pendiente, falta información',
  'Pendiente, falta aprobación legal',
  'Pendiente, falta aprobación gerencia',
  'Aprobado',
];

export const PROYECTO_LOG_TYPE = [
  'Creación',
  'Aprobación legal',
  'Modificación',
  'Modificación restricciones',
  'Cancelación',
  'Rechazo legal',
  'Confección Plan De Medios',
  'Confección Borrador Promesa',
  'Ingreso Comisiones',
  'Aprobación gerencia',
  'Rechazo gerencia',
  'Inicio de Ventas',
];

export const RESERVA_STATE = [
  'Pendiente información',
  'Pendiente control',
  'Oferta',
  'Rechazada',
  'Cancelada',
];

export const OFERTA_STATE = [
  'Pendiente aprobaciones',
  'Pendiente legal',
  'Rechazada por legal',
  'Promesa',
  'Cancelada',
  'Modificado',
];

export const APROBACION_INMOBILIARIA_STATE = [
  'Pendiente jefe de proyecto',
  'Pendiente aprobador inmobiliario',
  'Aprobada',
  'Rechazada',
];

export const PRE_APROBACION_CREDITO_STATE = [
  'No aplica',
  'Pendiente asistente comercial',
  'Aprobada',
  'Rechazada',
];

export const RECEPCION_GARANTIA_STATE = [
  'Pendiente recepcion en finanzas',
  'Aprobada',
  'Refund',
];

export const PROMESA_STATE = [
  'Pendiente confección', // #0 -> #9
  'Pendiente firma comprador', // #1 -> #20 or #1->#13
  'Pendiente envío a inmobiliaria', // # 2 -> #3
  'Pendiente factura', // #3 -> 4
  'Pendiente firma inmobiliaria', // #4 -> #5 or #6
  'Pendiente legalizacion', // #5 -> #6
  'Pendiente envio de copias', // # 6 -> #7 or #8
  'Pendiente escrituracion', // # 7
  'Escritura', // #8
  'Pendiente AC aprobación de maqueta', // #9 -> #11
  'Promesa modificada', // #10 -> #0
  'Pendiente JP aprobación de maqueta', // #11 -> #1
  'Pendiente aprobación AC', // #12 -> #2
  'Pendiente revisión negociación', // #13 -> #14     send condition to JP review
  'Pendiente negociación inmobiliaria', // # 14 -> 15 or 1     wait IN approve condition. If reject -> #15, if approve -> #1
  'Rechazada Inmobiliaria', // #15
  'Desistimiento', // # 16 -> PROMESA_DESISTIMIENTO_STATE + PROMESA_REFUND_STATE
  'Resciliación', // # 17 -> PROMESA_RESCILIACION_STATE + PROMESA_REFUND_STATE
  'Resolución', // #18 -> PROMESA_RESOLUCION_STATE + PROMESA_REFUND_STATE
  'Modificación', // #19 -> PROMESA_MODIFICACION_STATE + PROMESA_REFUND_STATE
  'Envío a cliente', // #20 -> #12
];

export const PROMESA_DESISTIMIENTO_STATE = ['Pendiente aprobación'];

export const PROMESA_RESCILIACION_STATE = [
  'Pendiente JP aprobación',
  'Pendiente GC aprobación',
  'Pendiente IN aprobación',
  'Pendiente confección de resciliación',
  'Pendiente firma de resciliación',
];

export const PROMESA_RESOLUCION_STATE = [
  'Pendiente JP aprobación',
  'Pendiente GC aprobación',
  'Pendiente IN aprobación',
  'Pendiente confección de resolución',
];

export const PROMESA_MODIFICACION_STATE = [];

export const PROMESA_REFUND_STATE = ['Pendiente devolución garantía', 'Refund'];

export const REQUIRED_DOCUMENTS = [
  'DocumentCotizacion',
  'DocumentPagoGarantia',
  'DocumentFotocopiaCarnet',
];

export const VENTA_LOG_TYPE = [
  'Creacion reserva',
  'Reserva a control',
  'Aprobacion reserva',
  'Rechazo reserva',
  'Cancelacion reserva',
  'Modificacion reserva',
  'Creacion oferta',
  'Envio aprobacion inmobiliaria',
  'Aprobacion oferta',
  'Rechazo oferta',
  'Recepcion garantia',
  'Envio oferta a confeccion promesa',
  'Aprobacion confeccion promesa',
  'Rechazo confeccion promesa',
  'Cancelacion oferta',
  'Modificacion oferta',
  'Creacion cotizacion',
  'Creacion promesa',
  'Aprobacion maqueta',
  'Rechazo maqueta',
  'Aprobacion promesa',
  'Rechazo promesa',
  'Registro envio promesa a inmobiliaria',
  'Registro firma de inmobiliaria',
  'Legalizacion promesa',
  'Envio copias',
  'Modificacion promesa(Antes de firma comprador)',
  'Modificacion promesa(Despues de firma comprador)',
  'Rechazo Modificacion oferta',
  'Aprobacion Modificacion oferta',
  'Refund garantia',
  'AC Aprobacion maqueta',
  'Envio a negociación',
  'Envio negociación a inmobiliaria',
  'Aprobacion a negociación',
  'Rechazo a negociación',
  'Register Desistimiento',
  'Aprobacion Desistimiento',
  'Envío promesa a cliente',
];

export const FACTURA_INMUEBLE_TYPE = [
  'Promesa',
  'Escritura',
  'Cierre de gestion',
];

export const FACTURA_INMUEBLE_STATE = ['Pendiente factura', 'Facturado'];

export const FACTURA_STATE = ['Pendiente pago', 'Pagada'];

export const ESCRITURA_STATE = {
  Recep_Mun: 0,
  Fechas_Avisos: 1,
  Fechas_Avisos_GC: 1.1,
  Fechas_Avisos_ES: 1.2,
  A_Comercial: 2,
  Apr_Creditos_I: 2.1,
  Apr_Creditos_II: 2.2,
  Apr_Creditos_III: 2.3,
  Apr_Creditos_IV: 2.4,
  Apr_Creditos_V: 2.5,
  ETitulo_Tasacion: 3,
  ETitulo_Tasacion_I: 3.1,
  ETitulo_Tasacion_II: 3.2,
  Matrices_Escrit: 4,
  Rev_Escrit: 5,
  Rev_Escrit_I: 5.1,
  Rev_Escrit_II: 5.2,
  Rev_Escrit_III: 5.3,
  Rev_Escrit_III: 5.5,
  Notaria: 6,
  Notaria_I: 6.1,
  Notaria_II: 6.2,
  Notaria_III: 6.3,
  Notaria_IV: 6.4,
  Notaria_V: 6.5,
  Notaria_VI: 6.6,
  Notaria_VII: 6.7,
  Notaria_VIII: 6.8,
  Success: 7
}