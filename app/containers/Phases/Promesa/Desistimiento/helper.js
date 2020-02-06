import {
  PROMESA_STATE,
  PROMESA_DESISTIMIENTO_STATE,
  PROMESA_RESILIACION_STATE,
  PROMESA_RESOLUCION_STATE,
  PROMESA_MODIFICACION_STATE,
} from 'containers/App/constants';
import { UserProject } from 'containers/Project/helper';
import { Auth } from 'containers/App/helpers';

export const beforeSigning = promesa =>
  [
    PROMESA_STATE[0],
    PROMESA_STATE[1],
    PROMESA_STATE[9],
    PROMESA_STATE[10],
    PROMESA_STATE[11],
    PROMESA_STATE[12],
    PROMESA_STATE[13],
    PROMESA_STATE[14],
    PROMESA_STATE[15],
  ].includes(promesa.PromesaState);

export const afterSigning = promesa =>
  [
    PROMESA_STATE[2],
    PROMESA_STATE[3],
    PROMESA_STATE[4],
    PROMESA_STATE[5],
    PROMESA_STATE[6],
    PROMESA_STATE[7],
  ].includes(promesa.PromesaState);

export const canDesistimiento = promesa =>
  ((UserProject.isVendor() || UserProject.isPM()) && beforeSigning(promesa)) ||
  (UserProject.isPM() &&
    promesa.PromesaState === PROMESA_STATE[16] &&
    promesa.PromesaDesistimientoState === PROMESA_DESISTIMIENTO_STATE[0]);

export const canResiliacion = promesa =>
  ((UserProject.isVendor() || UserProject.isPM()) && afterSigning(promesa)) ||
  ((promesa.PromesaState === PROMESA_STATE[17] &&
    (UserProject.isPM() &&
      promesa.PromesaResiliacionState === PROMESA_RESILIACION_STATE[0])) ||
    (Auth.isGerenteComercial() &&
      promesa.PromesaResiliacionState === PROMESA_RESILIACION_STATE[1]) ||
    (UserProject.isInmobiliario() &&
      promesa.PromesaResiliacionState === PROMESA_RESILIACION_STATE[2]));

export const canResolucion = promesa =>
  ((UserProject.isVendor() || UserProject.isPM()) && afterSigning(promesa)) ||
  ((promesa.PromesaState === PROMESA_STATE[17] &&
    (UserProject.isPM() &&
      promesa.PromesaResolucionState === PROMESA_RESOLUCION_STATE[0])) ||
    (Auth.isGerenteComercial() &&
      promesa.PromesaResolucionState === PROMESA_RESOLUCION_STATE[1]) ||
    (UserProject.isInmobiliario() &&
      promesa.PromesaResolucionState === PROMESA_RESOLUCION_STATE[2]));

export const canModificacion = promesa =>
  ((UserProject.isVendor() || UserProject.isPM()) && afterSigning(promesa)) ||
  (UserProject.isPM() &&
    promesa.PromesaState === PROMESA_STATE[19] &&
    promesa.PromesaModificacionState === PROMESA_MODIFICACION_STATE[0]);

export const showDesistimiento = promesa =>
  canDesistimiento(promesa) ||
  canResiliacion(promesa) ||
  canResolucion(promesa) ||
  canModificacion(promesa);

export const canConfeccionResiliacion = promesa =>
  !showDesistimiento(promesa) &&
  promesa.PromesaState === PROMESA_STATE[17] &&
  UserProject.isPM() &&
  promesa.PromesaResiliacionState === PROMESA_RESILIACION_STATE[3];

export const canConfeccionResolucion = promesa =>
  !showDesistimiento(promesa) &&
  promesa.PromesaState === PROMESA_STATE[18] &&
  UserProject.isPM() &&
  promesa.PromesaResolucionState === PROMESA_RESOLUCION_STATE[3];

export const canConfeccionFirma = promesa =>
  !showDesistimiento(promesa) &&
  promesa.PromesaState === PROMESA_STATE[17] &&
  UserProject.isVendor() &&
  promesa.PromesaResiliacionState === PROMESA_RESILIACION_STATE[4];

export const canConfeccion = promesa =>
  !canConfeccionFirma(promesa) &&
  (canConfeccionResiliacion(promesa) || canConfeccionResolucion(promesa));

export const showConfeccion = promesa =>
  !showConfeccionFirma(promesa) &&
  ((promesa.PromesaState === PROMESA_STATE[17] &&
    promesa.DocumentResiliacion) ||
    (promesa.PromesaState === PROMESA_STATE[18] && promesa.DocumentResolucion));

export const showConfeccionFirma = promesa =>
  promesa.PromesaState === PROMESA_STATE[17] &&
  (promesa.DocumentResiliacionFirma ||
    (UserProject.isVendor() &&
      promesa.PromesaResiliacionState === PROMESA_RESILIACION_STATE[4]));
