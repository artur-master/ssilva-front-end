/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { PROMESA_STATE } from 'containers/App/constants';

function SubSteps({ promesa }) {
  return (
    <ul className="m-counter mt-3" style={{ marginLeft: '9.6em' }}>
      <li className="m-counter-plus success">
        <Link to="/" onClick={evt => evt.preventDefault()}>
          <span>Confección Promesa</span>
        </Link>
      </li>
      <li className="m-counter-plus">
        <Link to="/" onClick={evt => evt.preventDefault()}>
          <span>Pendiente Control</span>
        </Link>
      </li>
    </ul>
  );
}

SubSteps.propTypes = {
  promesa: PropTypes.object,
};

function Steps({ promesa }) {
  const Graph = {
    Node: [
      { Label: '', Description: 'Confección Promesa', Color: 'green' },
      { Label: '', Description: 'Pendiente Control', Color: 'white' },
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
                  <span>{`${node.Description.trim()} ${
                    node.Label ? `[${node.Label}]` : ''
                  }`}</span>
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}

Steps.propTypes = {
  promesa: PropTypes.object,
};

export default Steps;
