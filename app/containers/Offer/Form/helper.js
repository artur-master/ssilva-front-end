/* eslint-disable array-callback-return */
import { RESERVA_STATE } from 'containers/App/constants';
import { Auth } from 'containers/App/helpers';

export const currentResevationStep = (offer = {}) => {
  const { OfertaID, OfertaState } = offer;

  // 1. create new (general)
  if (!OfertaID) return 1;

  // 2. Have reserva but dont send to control
  if (OfertaID && OfertaState === RESERVA_STATE[0]) return 2;

  // 3. Oferta send to control
  if (OfertaID && OfertaState === RESERVA_STATE[1]) return 3;

  // 4. Oferta cancel
  if (OfertaID && OfertaState === RESERVA_STATE[4]) return 4;

  // 5. Oferta oferta
  if (OfertaID && OfertaState === RESERVA_STATE[2]) return 5;

  // 5. Oferta rechazada
  if (OfertaID && OfertaState === RESERVA_STATE[3]) return 6;

  return 1;
};

export const calculateRenta = (reserva = {}) => {
  const Cliente = reserva.Cliente || {};
  const Codeudor = reserva.Codeudor || {};
  const { Extra = { Values: {} } } = Cliente;
  const CoExtra = Codeudor.Extra || { Values: {} };
  if (Codeudor.Extra && !Codeudor.Extra.Values) Codeudor.Extra.Values = {};
  const Renta =
    (Extra.Values.LiquidIncome || 0) +
    (Extra.Values.VariableSalary || 0) +
    (Extra.Values.Honoraries || 0) +
    (Extra.Values.RealStateLeasing || 0) +
    (Extra.Values.Retirements || 0) +
    (Extra.Values.Pension || 0);
  const CoRenta =
    (CoExtra.Values.LiquidIncome || 0) +
    (CoExtra.Values.VariableSalary || 0) +
    (CoExtra.Values.Honoraries || 0) +
    (CoExtra.Values.RealStateLeasing || 0) +
    (CoExtra.Values.Retirements || 0) +
    (CoExtra.Values.Pension || 0);
  return {
    Renta,
    CoRenta,
    SumRenta: Renta + CoRenta,
  };
};

export const canReviewOffer = offer =>
  Auth.isPM() && offer.OfertaState === RESERVA_STATE[1];

export const canUploadOffer = offer =>
  Auth.isVendor() && offer.OfertaState === RESERVA_STATE[0];

export const canEditOffer = offer =>
  Auth.isVendor() &&
  (!offer.OfertaID || offer.OfertaState === RESERVA_STATE[0]);

export const canConfirmOffer = offer => Auth.isVendor() && !offer.OfertaID;

export const getActionTitle = (offer = {}) => {
  const { Graph } = offer;
  if (Graph) {
    if (Graph.Node) {
      const node = Graph.Node.find(item => item.Color === 'red');
      if (node) return node.Description;
      return offer.OfertaState;
    }
  }
  return 'Crear reserva';
};
