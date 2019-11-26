/* eslint-disable array-callback-return */
import React from 'react';
import { RESERVA_STATE } from 'containers/App/constants';
import { Auth } from 'containers/App/helpers';
import { UserProject } from '../../Project/helper';

export const currentResevationStep = (offer = {}) => {
  const { OfertaID, OfertaState } = offer;

  // 1. create new (general)
  if (!OfertaID) return 1;

  // 2. Have oferta but dont send to control
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

export const canReviewOffer = offer =>
  !window.project
    ? false
    : UserProject.in(window.project) &&
      Auth.hasOneOfPermissions(['Es asistente comercial']) &&
      offer.OfertaState === RESERVA_STATE[1];

export const canUploadOffer = offer =>
  !window.project
    ? false
    : UserProject.in(window.project) &&
      Auth.hasOneOfPermissions(['Es vendedor']) &&
      (!offer.OfertaState ||
        [RESERVA_STATE[0], RESERVA_STATE[3]].includes(
          offer.OfertaState,
        ));

export const canEditOffer = offer =>
  !window.project
    ? false
    : UserProject.in(window.project) &&
      Auth.hasOneOfPermissions(['Es vendedor']) &&
      (!offer.OfertaID ||
        [RESERVA_STATE[0]].includes(offer.OfertaState));

export const canConfirmOffer = offer =>
  !window.project
    ? false
    : UserProject.in(window.project) &&
      Auth.hasOneOfPermissions(['Es vendedor']) &&
      !offer.OfertaID;

export const getActionTitle = (offer = {}) => {
  const { Graph } = offer;
  if (offer.OfertaState === RESERVA_STATE[3])
    return <span className="color-warning-magent">Confirmar </span>;
  if (Graph) {
    if (Graph.Node) {
      const node = Graph.Node.find(item => item.Color === 'red');
      if (node)
        return node.Description.trim() === 'Pendiente información/Rechazada'
          ? 'Pendiente información'
          : node.Description;
      return offer.OfertaState;
    }
  }
  return 'Crear oferta';
};
