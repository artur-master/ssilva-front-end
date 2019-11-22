/*
 *
 * Offer actions
 *
 */
import { isObject } from 'lodash';

import {
  GET_OFFER,
  GET_OFFER_ERROR,
  GET_OFFER_SUCCESS,
  SAVE_OFFER,
  SAVE_OFFER_ERROR,
  SAVE_OFFER_SUCCESS,
  UPDATE_OFFER,
  RESET_CONTAINER,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

export function saveOffer(newValues) {
  const values = { ...newValues };

  if (values.Cliente.IsCompany) {
    delete values.Empleador;
    delete values.CoEmpleador;
    delete values.Codeudor;
  } else {
    delete values.EmpresaCompradora;
  }

  if (!values.CodeudorID) {
    delete values.Codeudor;
    delete values.CoEmpleador;
  }

  if (values.OfertaID) {
    delete values.CotizacionID;
  }

  if (!values.ContactMethodTypeID) delete values.ContactMethodTypeID;

  if (values.Patrimony) {
    Object.keys(values.Patrimony).forEach(item => {
      const Patrimony = values.Patrimony[item];
      if (isObject(Patrimony)) {
        if (Patrimony.PagosMensuales === '')
          values.Patrimony[item] = {
            PagosMensuales: 0,
            Pasivos: 0,
          };
        values.Patrimony[item].Saldo =
          values.Patrimony[item].Pasivos -
          values.Patrimony[item].PagosMensuales;
      } else if (Patrimony === '') {
        values.Patrimony[item] = 0;
      }
    });
  }

  return {
    type: SAVE_OFFER,
    values,
  };
}

export function saveOfferError(error) {
  return {
    type: SAVE_OFFER_ERROR,
    error,
  };
}

export function saveOfferSuccess(response) {
  return {
    type: SAVE_OFFER_SUCCESS,
    response,
  };
}

export function getOffer(OfertaID) {
  return {
    type: GET_OFFER,
    OfertaID,
  };
}

export function getOfferError(error) {
  return {
    type: GET_OFFER_ERROR,
    error,
  };
}

export function getOfferSuccess(response) {
  return {
    type: GET_OFFER_SUCCESS,
    response,
  };
}

export function updateOffer(data) {
  return {
    type: UPDATE_OFFER,
    data,
  };
}
