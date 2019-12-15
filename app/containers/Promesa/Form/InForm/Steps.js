/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isAprobacionInmobiliariaState } from '../../helper';
import { APROBACION_INMOBILIARIA_STATE } from '../../../App/constants';

function InSteps({ promesa }) {
  const Graph = {
    Node: [
      { Label: 'V', Description: 'Promesa', Color: 'green' },
      {
        Label: 'I',
        Description: 'Pendiente Aprobador Inmobiliario',
        Color: 'orange',
      },
    ],
  };

  if (isAprobacionInmobiliariaState(promesa))
    Graph.Node[1] = {
      Label: 'I',
      Description: 'Aprobada Inmobiliario',
      Color: 'green',
    };

  if (promesa.AprobacionInmobiliariaState === APROBACION_INMOBILIARIA_STATE[3])
    Graph.Node[1] = {
      Label: 'I',
      Description: 'Aprobada Inmobiliario',
      Color: 'red',
    };

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
              case 'orange':
                color = 'caution';
                break;
              case 'red':
                color = 'warning-magent';
                break;
              default:
                color = '';
            }
            return (
              <li key={node.Description} className={`m-counter-plus ${color}`}>
                <Link
                  to="/"
                  onClick={evt => evt.preventDefault()}
                  className="m-counter-item"
                >
                  <span>{node.Description}</span>
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

InSteps.propTypes = {
  promesa: PropTypes.object,
};

export default InSteps;
