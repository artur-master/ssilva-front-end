import React from 'react';
import {
  APROBACION_INMOBILIARIA_STATE,
  OFERTA_STATE,
  PRE_APROBACION_CREDITO_STATE,
  RECEPCION_GARANTIA_STATE,
} from 'containers/App/constants';
import { UserProject } from 'containers/Project/helper';
import { Auth } from 'containers/App/helpers';

export const initReports = () =>
  OFERTA_STATE.reduce(
    (acc, state) => {
      acc[state] = { Label: state, Count: 0 };
      return acc;
    },
    {
      All: { Label: 'Todas', Count: 0 },
      'Pendiente Contacto': { Label: 'Todas', Count: 0 },
    },
  );

export const getReports = (entities = []) =>
  entities.reduce((acc, item) => {
    acc.All.Count += 1;
    let key = item.OfertaState;
    if (
      item.OfertaState === OFERTA_STATE[0] &&
      item.AprobacionInmobiliariaState === APROBACION_INMOBILIARIA_STATE[0]
    )
      key = 'Pendiente Contacto';

    acc[key] = acc[key] || {
      Label: item.OfertaStateFormat[0].Label,
      Count: 0,
    };
    acc[key].Label = item.OfertaStateFormat[0].Label;
    acc[key].Count += 1;
    return acc;
  }, initReports());

export const formatOffer = offer => {
  const OfertaStateFormat = [
    {
      Label: offer.OfertaState,
      Color: '',
    },
  ];
  switch (offer.OfertaState) {
    case OFERTA_STATE[0]:
      if (isPendienteContacto(offer)) {
        OfertaStateFormat[0] = {
          Label: 'Pendiente Contacto',
          Color: 'badge-warning',
        };
      } else {
        OfertaStateFormat[0].Color = 'badge-caution';
        OfertaStateFormat.push({
          Label: 'IN',
          Color: isAprobacionInmobiliariaState(offer)
            ? 'badge-success'
            : 'badge-danger',
        });
        OfertaStateFormat.push({
          Label: 'FI',
          Color:
            offer.RecepcionGarantiaState === RECEPCION_GARANTIA_STATE[1]
              ? 'badge-success'
              : 'badge-danger',
        });
        OfertaStateFormat.push({
          Label: 'AC',
          Color:
            offer.PreAprobacionCreditoState ===
              PRE_APROBACION_CREDITO_STATE[0] ||
            offer.PreAprobacionCreditoState === PRE_APROBACION_CREDITO_STATE[2]
              ? 'badge-success'
              : 'badge-danger',
        });
      }
      break;
    case 'Pendiente legal':
      OfertaStateFormat[0].Color = 'badge-caution';
      break;
    case 'Rechazada por legal':
      OfertaStateFormat[0].Color = 'badge-danger';
      break;
    case 'Cancelada':
      OfertaStateFormat[0].Color = 'badge-warning';
      break;
    default:
      OfertaStateFormat[0].Color = 'badge-caution';
      break;
  }
  return {
    ...offer,
    OfertaStateFormat,
  };
};

export const isPendienteContacto = offer =>
  offer.OfertaState === OFERTA_STATE[0] &&
  offer.AprobacionInmobiliariaState === APROBACION_INMOBILIARIA_STATE[0];

export const isWaitAprobacionInmobiliariaState = offer =>
  offer.AprobacionInmobiliariaState === APROBACION_INMOBILIARIA_STATE[1];

export const isAprobacionInmobiliariaState = offer =>
  offer.AprobacionInmobiliariaState === APROBACION_INMOBILIARIA_STATE[2];

export const isRejectAprobacionInmobiliariaState = offer =>
  offer.AprobacionInmobiliariaState === APROBACION_INMOBILIARIA_STATE[3];

export const canConfirmOffer = offer =>
  isPendienteContacto(offer) &&
  UserProject.in(window.project) &&
  UserProject.isPM(window.project);

export const getActionTitle = (offer = {}) => {
  const { Graph } = offer;
  if (Auth.isInmobiliario())
    return <span className="color-caution-03">Confirmar Oferta</span>;

  if (canConfirmOffer(offer))
    return <span className="color-warning-magent">Confirmar Oferta</span>;
  if (Graph) {
    if (Graph.Node) {
      const node = Graph.Node.find(
        item => item.Color === 'red' || item.Color === 'white',
      );
      if (node) return node.Description.trim();
      return 'Oferta';
    }
  }
  return 'Crear oferta';
};
