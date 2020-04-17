/**
 *
 * Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ESCRITURA_STATE } from 'containers/App/constants';

// function SubSteps({ escritura }) {
//   return (
//     <ul className="m-counter mt-3" style={{ marginLeft: '9.6em' }}>
//       <li className="m-counter-plus success">
//         <Link to="/" onClick={evt => evt.preventDefault()}>
//           <span>Confección Promesa</span>
//         </Link>
//       </li>
//       <li className="m-counter-plus">
//         <Link to="/" onClick={evt => evt.preventDefault()}>
//           <span>Pendiente Control</span>
//         </Link>
//       </li>
//     </ul>
//   );
// }

// SubSteps.propTypes = {
//   escritura: PropTypes.object,
// };

function Steps({i=0}) {
  const state_arr = [0,1,2,2.1,2.2,2.3,2.4,2.5,3.1,3.2,4,5.1,5.2,5.3,5.5,6.1,6.2,6.3,6.4,6.5,6.6,6.7,6.8,7];
  
  const state = 2.1;

  return (
    <nav class="second-breadcrumb">
      <ul>
        <li className={`item br-remove-right 
                    ${(state == ESCRITURA_STATE.Recep_Mun) ?
            "color-caution" : (state > ESCRITURA_STATE.Recep_Mun) ? "color-success" : ""}`}
        >
          <div class="number">
            <span>1</span>
          </div>
          <div class="text">
            <span class="title">Recep. Mun.</span>
            <span class="subtitle">GER. COMERCIAL</span>
          </div>
          <span class="triangle">►</span>
        </li>

        <li className={`item br-remove-left 
                    ${(state == ESCRITURA_STATE.Fechas_Avisos) ?
            "color-caution" : (state > ESCRITURA_STATE.Fechas_Avisos) ? "color-success" : ""}`}
        >
          <div class="number">
            <span>2</span>
          </div>
          <div class="text">
            <span class="title">Fechas y Avisos</span>
            <span class="subtitle">ESCRIT.</span>
          </div>
          <span class="triangle">►</span>
        </li>
        
        <div class="ml-1">
          <div class="d-flex">
            <li className={`item br-remove-right 
                      ${(parseInt(state) == ESCRITURA_STATE.A_Comercial) ?
                      "color-caution" : (parseInt(state) > ESCRITURA_STATE.A_Comercial) ? "color-success" : ""}`}
            >
              <div class="number">
                <span>3</span>
              </div>
              <div class="number ml-1">
                <span>A</span>
              </div>
              <div class="text">
                <span class="title">A. Comercial</span>
                <span class="subtitle">ESCRIT.</span>
              </div>
              <span class="triangle">►</span>
            </li>

            <li className={`item br-remove-left 
                      ${(parseInt(state) == ESCRITURA_STATE.ETitulo_Tasacion) ?
                "color-caution" : (parseInt(state) > ESCRITURA_STATE.ETitulo_Tasacion) ? "color-success" : ""}`}
            >
              <div class="number">
                <span>4</span>
              </div>
              <div class="text">
                <span class="title">E.Título y Tasación</span>
                <span class="subtitle">ESCRIT.</span>
              </div>
              <span class="triangle">►</span>
            </li>
          </div>
          <div class="mt-3 d-flex">
            <li className={`item w-100
                      ${(state > ESCRITURA_STATE.A_Comercial && parseInt(state) == ESCRITURA_STATE.A_Comercial) ?
                      "color-caution" : (parseInt(state) > ESCRITURA_STATE.A_Comercial) ? "color-success" : ""}`}
            >
              <div class="number">
                <span>3</span>
              </div>
              <div class="number ml-1">
                <span>B</span>
              </div>
              <div class="text">
                <span class="title">Apr. Créditos</span>
                <span class="subtitle">ASIS. COMERCIAL</span>
              </div>
              <span class="triangle">►</span>
            </li>
          </div>
        </div>

        <li className={`item ml-1 br-remove-right
                      ${(state == ESCRITURA_STATE.Matrices_Escrit) ?
                      "color-caution" : (state > ESCRITURA_STATE.Matrices_Escrit) ? "color-success" : ""}`}
        >
          <div class="number">
            <span>5</span>
          </div>
          <div class="text">
            <span class="title">Matrices Escrit.</span>
            <span class="subtitle">LEGAL</span>
          </div>
          <span class="triangle">►</span>
        </li>

        <li className={`item br-remove-right br-remove-left 
                      ${(parseInt(state) == ESCRITURA_STATE.Rev_Escrit) ?
                      "color-caution" : (parseInt(state) > ESCRITURA_STATE.Rev_Escrit) ? "color-success" : ""}`}
        >
          <div class="number">
            <span>6</span>
          </div>
          <div class="text">
            <span class="title">Rev. Escrit.</span>
            <span class="subtitle">ESCRIT.</span>
          </div>
          <span class="triangle">►</span>
        </li>

        <li className={`item br-remove-left 
                      ${(parseInt(state) == ESCRITURA_STATE.Notaria) ?
                      "color-caution" : (parseInt(state) > ESCRITURA_STATE.Notaria) ? "color-success" : ""}`}
        >
          <div class="number">
            <span>7</span>
          </div>
          <div class="text">
            <span class="title">Notaría</span>
            <span class="subtitle">ESCRIT.</span>
          </div>
          <span class="triangle">►</span>
        </li>
      </ul>
    </nav>
  );
}

Steps.propTypes = {
  // escritura: PropTypes.object,
};

export default Steps;
