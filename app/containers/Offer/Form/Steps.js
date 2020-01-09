/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  OFERTA_STATE,
  APROBACION_INMOBILIARIA_STATE,
  RECEPCION_GARANTIA_STATE,
  PRE_APROBACION_CREDITO_STATE,
} from 'containers/App/constants';
import {
  isAprobacionInmobiliariaState,
  isPendienteContacto,
  isWaitAprobacionInmobiliariaState,
} from '../helper';
import { isCreditType } from '../../Phases/FormaDePago/helper';

function SubSteps({ offer }) {
  const {
    AprobacionInmobiliariaState,
    PreAprobacionCreditoState,
    RecepcionGarantiaState,
    PayType,
    Credits = [],
  } = offer;
  const isCreditPayment = isCreditType(PayType);
  if (
    AprobacionInmobiliariaState === APROBACION_INMOBILIARIA_STATE[2] &&
    PreAprobacionCreditoState === PRE_APROBACION_CREDITO_STATE[2] &&
    RecepcionGarantiaState === RECEPCION_GARANTIA_STATE[1]
  )
    return null;
  return (
    <>
      <ul className="m-counter mt-3 " style={{ marginLeft: '9.6em' }}>
        <li className="m-counter-plus warning-magent">
          <Link
            to="/"
            className="m-counter-item"
            onClick={evt => evt.preventDefault()}
          >
            <span>IN</span>
          </Link>
        </li>
        <li
          className={`m-counter-plus ${
            AprobacionInmobiliariaState === APROBACION_INMOBILIARIA_STATE[2]
              ? 'success'
              : ''
          }`}
        >
          <Link
            to="/"
            className="m-counter-item"
            onClick={evt => evt.preventDefault()}
          >
            <span>Aprobar</span>
          </Link>
        </li>
      </ul>
      <ul className="m-counter mt-3 " style={{ marginLeft: '9.6em' }}>
        <li className="m-counter-plus warning-magent">
          <Link
            to="/"
            className="m-counter-item"
            onClick={evt => evt.preventDefault()}
          >
            <span>FI</span>
          </Link>
        </li>
        <li
          className={`m-counter-plus ${
            RecepcionGarantiaState === RECEPCION_GARANTIA_STATE[1]
              ? 'success'
              : ''
          }`}
        >
          <Link
            to="/"
            className="m-counter-item"
            onClick={evt => evt.preventDefault()}
          >
            <span>Recibo de Grantía</span>
          </Link>
        </li>
      </ul>
      <ul className="m-counter mt-3 " style={{ marginLeft: '9.6em' }}>
        <li className="m-counter-plus warning-magent">
          <Link
            to="/"
            className="m-counter-item"
            onClick={evt => evt.preventDefault()}
          >
            <span>AC</span>
          </Link>
        </li>
        <li
          className={`m-counter-plus ${
            !isPendienteContacto(offer) ? 'success' : ''
          }`}
        >
          <Link
            to="/"
            className="m-counter-item"
            onClick={evt => evt.preventDefault()}
          >
            <span>Contato con cliente</span>
          </Link>
        </li>
        {isCreditPayment && (
          <li
            className={`m-counter-plus ${
              PreAprobacionCreditoState === PRE_APROBACION_CREDITO_STATE[2] ||
              !isPendienteContacto(offer)
                ? 'success'
                : ''
            }`}
          >
            <Link
              to="/"
              className="m-counter-item"
              onClick={evt => evt.preventDefault()}
            >
              <span>Pre-Aprobacíon</span>
            </Link>
          </li>
        )}
        {!isCreditPayment && (
          <li
            className={`m-counter-plus ${
              isPendienteContacto(offer) ? '' : 'success'
            }`}
          >
            <Link
              to="/"
              className="m-counter-item"
              onClick={evt => evt.preventDefault()}
            >
              <span>Aprobacíon Formal</span>
            </Link>
          </li>
        )}
      </ul>
    </>
  );
}

SubSteps.propTypes = {
  offer: PropTypes.object,
};

function Steps({ offer }) {
  const { OfertaState } = offer;
  const Graph = {
    Node: [
      { Label: 'JP', Description: 'Oferta', Color: 'green' },
      {
        Label: 'IN, FI, AC',
        Description: 'Pendiente Aprobación',
        Color: isPendienteContacto(offer) ? 'white' : 'red',
      },
      { Label: 'AC', Description: 'Pendiente Control', Color: 'white' },
      { Label: '', Description: 'Promesa', Color: 'white' },
    ],
  };
  if (OfertaState !== OFERTA_STATE[0] && OfertaState !== OFERTA_STATE[4]) {
    Graph.Node[1].Color = 'green';
  }

  if (OfertaState === OFERTA_STATE[1]) {
    Graph.Node[2].Color = 'red';
  } else if (OfertaState === OFERTA_STATE[3]) {
    Graph.Node[2].Color = 'green';
  }

  if (OfertaState === OFERTA_STATE[4]) return null;

  let colorStep = 0;
  return (
    <nav className="breadcrumb-step">
      <ul className="m-counter">
        {Graph.Node &&
          Graph.Node.map(node => {
            colorStep += 1;
            colorStep = colorStep > 3 ? 2 : colorStep;
            let color = '';
            switch (node.Color) {
              case 'green':
                color = 'success';
                if (colorStep > 1) color += `-0${colorStep}`;
                break;
              case 'yellow':
              case 'orange':
              case 'red':
                color = 'caution';
                break;
              default:
                color = node.Color;
            }
            return (
              <li key={node.Description} className={`m-counter-plus ${color}`}>
                <Link
                  to="/"
                  onClick={evt => evt.preventDefault()}
                  className="m-counter-item"
                >
                  <span>{`${node.Description.trim()} ${
                    node.Label ? `[${node.Label}]` : ''
                  }`}</span>
                </Link>
              </li>
            );
          })}
      </ul>
      <SubSteps offer={offer} />
    </nav>
  );
}

Steps.propTypes = {
  offer: PropTypes.object,
};

export default Steps;
