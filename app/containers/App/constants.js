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
  'Arquitecto',
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
];
