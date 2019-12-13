/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { OFERTA_STATE } from 'containers/App/constants';

function Steps({ offer }) {
  const Graph = {
    Node: [
      { Label: 'AC', Description: 'Modificar Oferta', Color: 'green' },
      {
        Label: 'JP',
        Description: 'Pendiente Aprobación',
        Color: 'red',
      },
      { Label: '', Description: 'Pendiente Control', Color: 'white' },
      { Label: '', Description: 'Promesa', Color: 'white' },
    ],
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
                  <span>{node.Description.trim()}</span>
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

Steps.propTypes = {
  offer: PropTypes.object,
};

export default Steps;
