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
} from 'containers/App/constants';
import { isAprobacionInmobiliariaState, isPendienteContacto } from '../helper';

function SubSteps({ offer }) {
  const { OfertaState, AprobacionInmobiliariaState } = offer;
  return (
    <ul className="m-counter mt-3" style={{ marginLeft: '9.6em' }}>
      <li
        className={`m-counter-plus ${
          isPendienteContacto(offer) ? 'caution' : 'success'
        }`}
      >
        <Link to="/" onClick={evt => evt.preventDefault()}>
          <span>Pendiente Contacto [JP]</span>
        </Link>
      </li>
      <li
        className={`m-counter-plus ${
          isAprobacionInmobiliariaState(offer) ? 'success-02' : 'white'
        }`}
      >
        <Link to="/" onClick={evt => evt.preventDefault()}>
          <span>Aprobación inmobiliaria [IN]</span>
        </Link>
      </li>
      <li className="m-counter-plus">
        <Link
          to="/"
          onClick={evt => evt.preventDefault()}
          className="m-counter-item"
        >
          <span>Preaprobación crédito [AC]</span>
        </Link>
      </li>
      <li className="m-counter-plus">
        <Link
          to="/"
          onClick={evt => evt.preventDefault()}
          className="m-counter-item"
        >
          <span>Recepción de garantía [FI]</span>
        </Link>
      </li>
    </ul>
  );
}

SubSteps.propTypes = {
  offer: PropTypes.object,
};

function Steps({ offer }) {
  const { OfertaState } = offer;
  const Graph = {
    Node: [
      { Label: 'AC', Description: 'Oferta', Color: 'green' },
      {
        Label: 'JP, IN, AC, FI',
        Description: 'Pendiente Información',
        Color: 'red',
      },
      { Label: 'LG', Description: 'Pendiente Control', Color: 'white' },
      { Label: 'LG', Description: 'Promesa', Color: 'white' },
    ],
  };
  if (OfertaState !== OFERTA_STATE[0] && OfertaState !== OFERTA_STATE[4]) {
    Graph.Node[1].Color = 'green';
  }

  if (OfertaState === OFERTA_STATE[2]) {
    Graph.Node[2].Color = 'red';
  } else if (OfertaState === OFERTA_STATE[3]) {
    Graph.Node[2].Color = 'green';
  }

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
                  <span>{`${node.Description.trim()} [${node.Label}]`}</span>
                </Link>
              </li>
            );
          })}
      </ul>
      {/* <SubSteps offer={offer} /> */}
    </nav>
  );
}

Steps.propTypes = {
  offer: PropTypes.object,
};

export default Steps;
