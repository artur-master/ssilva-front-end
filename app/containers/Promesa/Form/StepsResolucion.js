/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  PROMESA_REFUND_STATE,
  PROMESA_RESOLUCION_STATE,
} from 'containers/App/constants';

function StepsResolucion({ promesa }) {
  const Graph = {
    Node: [
      { Label: '', Description: 'Resolución', Color: 'green' },
      { Label: 'JP, GC, IN', Description: 'Aprobaciónes', Color: 'white' },
      {
        Label: 'JP',
        Description: 'Confección de resolución',
        Color: 'white',
      },
      {
        Label: 'FI',
        Description: 'Devolución garantía',
        Color: 'white',
      },
    ],
  };

  switch (promesa.PromesaResolucionState) {
    case PROMESA_RESOLUCION_STATE[3]:
      Graph.Node[1].Color = 'green';
      Graph.Node[2].Color = 'yellow';
      Graph.Node[3].Color = 'white';
      break;
    case PROMESA_REFUND_STATE[0]:
      Graph.Node[1].Color = 'green';
      Graph.Node[2].Color = 'green';
      Graph.Node[3].Color = 'yellow';
      break;
    case PROMESA_REFUND_STATE[1]:
      Graph.Node[1].Color = 'green';
      Graph.Node[2].Color = 'green';
      Graph.Node[3].Color = 'green';
      break;
    default:
      Graph.Node[1].Color = 'yellow';
      Graph.Node[2].Color = 'white';
      Graph.Node[3].Color = 'white';
      break;
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
                  <span>{`${node.Description.trim()} ${
                    node.Label ? `(${node.Label})` : ''
                  }`}</span>
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

StepsResolucion.propTypes = {
  promesa: PropTypes.object,
};

export default StepsResolucion;
