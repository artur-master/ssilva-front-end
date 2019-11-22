/**
 *
 * ProjectMeta
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
export function ProjectPhases({ project = {}, active }) {
  if (!project.ProyectoID) return null;
  return (
    <>
      <ul className="proyect-navigation-menu row">
        <h3 className="title">Fases del proyecto</h3>

        <li
          className={`col-12 col-md ${active === 'quotation' ? 'active' : ''}`}
        >
          <Link to={`/proyectos/${project.ProyectoID}/cotizaciones`}>
            <span className="key">Cotizaciones</span>
            <span className="value badge badge-secondary">
              {project.Metadata.Count.Quotation}
            </span>
          </Link>
        </li>
        <li
          className={`col-12 col-md ${
            active === 'reservation' ? 'active' : ''
          }`}
        >
          <Link to={`/proyectos/${project.ProyectoID}/reservas`}>
            <span className="key">Reservas</span>
            <span className="value badge badge-secondary">
              {project.Metadata.Count.Reservation}
            </span>
          </Link>
        </li>
        <li className={`col-12 col-md ${active === 'offer' ? 'active' : ''}`}>
          <Link to={`/proyectos/${project.ProyectoID}/ofertas`}>
            <span className="key">Ofertas</span>
            <span className="value badge badge-secondary">
              {project.Metadata.Count.Offer}
            </span>
          </Link>
        </li>
        <li className="col-12 col-md">
          <a href="#top">
            <span className="key">Promesas</span>
            <span className="value badge badge-secondary">
              {project.Metadata.Count.Promesa}
            </span>
          </a>
        </li>
        <li className="col-12 col-md">
          <a href="#top">
            <span className="key">Escrituras</span>
            <span className="value badge badge-secondary">0</span>
          </a>
        </li>
      </ul>
    </>
  );
}

ProjectPhases.propTypes = {
  active: PropTypes.string,
  project: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default ProjectPhases;
