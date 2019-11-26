/*
 *
 * Offer actions
 *
 */
import { isObject } from 'lodash';

import moment from 'components/moment';
import {
  GET_OFFER,
  GET_OFFER_ERROR,
  GET_OFFER_SUCCESS,
  SAVE_OFFER,
  SAVE_OFFER_ERROR,
  SAVE_OFFER_SUCCESS,
  GET_QUOTATION,
  GET_QUOTATION_ERROR,
  GET_QUOTATION_SUCCESS,
  UPDATE_OFFER,
  RESET_CONTAINER,
  SEND_TO_CONTROL,
  SEND_TO_CONTROL_ERROR,
  SEND_TO_CONTROL_SUCCESS,
  CANCEL_OFFER,
  CANCEL_OFFER_ERROR,
  CANCEL_OFFER_SUCCESS,
  CONTROL_REVIEW,
  CONTROL_REVIEW_ERROR,
  CONTROL_REVIEW_SUCCESS,
} from './constants';

export function resetContainer() {
  return {
    type: RESET_CONTAINER,
  };
}

const prepareBeforeSave = newValues => {
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

  values.PayType = (
    (window.preload.paymentUtils || []).find(
      payment =>
        payment.PayTypeID === values.PayType || payment.Name === values.PayType,
    ) || {}
  ).Name;
  values.DateFirmaPromesa = values.DateFirmaPromesa
    ? moment(values.DateFirmaPromesa).format()
    : '';

  if (values.PayType === 'Contado') {
    delete values.Empleador;
    delete values.CoEmpleador;
    delete values.Codeudor;
    delete values.EmpresaCompradora;
    delete values.CodeudorID;
  }

  if (values.OfertaID) {
    delete values.CotizacionID;
  }

  if (!values.ContactMethodTypeID) delete values.ContactMethodTypeID;
  values.Cliente = {
    ...values.Cliente,
    ComunaID: values.Cliente.ComunaID || '',
    BirthDate: values.Cliente.BirthDate || null,
  };
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
  values.Condition = (values.Condition || []).filter(
    condition => condition.Description.trim() !== '',
  );
  return values;
};

export function saveOffer(newValues, documents = false) {
  const values = prepareBeforeSave(newValues);
  return {
    type: SAVE_OFFER,
    values,
    documents,
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

export function sendToControl(newValues, documents = false) {
  const values = prepareBeforeSave(newValues);
  return {
    type: SEND_TO_CONTROL,
    values,
    documents,
  };
}

export function sendToControlError(error) {
  return {
    type: SEND_TO_CONTROL_ERROR,
    error,
  };
}

export function sendToControlSuccess(response) {
  return {
    type: SEND_TO_CONTROL_SUCCESS,
    response,
  };
}

export function controlReview(values) {
  return {
    type: CONTROL_REVIEW,
    values,
  };
}

export function controlReviewError(error) {
  return {
    type: CONTROL_REVIEW_ERROR,
    error,
  };
}

export function controlReviewSuccess(response) {
  return {
    type: CONTROL_REVIEW_SUCCESS,
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

export function getQuotation(CotizacionID) {
  return {
    type: GET_QUOTATION,
    CotizacionID,
  };
}

export function getQuotationError(error) {
  return {
    type: GET_QUOTATION_ERROR,
    error,
  };
}

export function getQuotationSuccess(response) {
  return {
    type: GET_QUOTATION_SUCCESS,
    response,
  };
}

export function updateOffer(data) {
  return {
    type: UPDATE_OFFER,
    data,
  };
}

export function cancelOffer(values) {
  return {
    type: CANCEL_OFFER,
    values,
  };
}

export function cancelOfferError(error) {
  return {
    type: CANCEL_OFFER_ERROR,
    error,
  };
}

export function cancelOfferSuccess(response) {
  return {
    type: CANCEL_OFFER_SUCCESS,
    response,
  };
}
