/**
 *
 * ProjectMeta
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProjectPhases from 'containers/Common/ProjectPhases';
import { Auth } from 'containers/App/helpers';
import { formatNumber } from 'containers/App/helpers';
import { fetchAllReservations, fetchAllPromesas } from './helper';

export function ProjectMeta({ project = {}, active }) {
  if (Auth.isInmobiliario()) return null;

  const { ProyectoID } = project;  
  const [reserva, setReserva] = useState({total:0, cost:0, percent:0});
  const [promesa, setPromesa] = useState({total:0, cost:0, percent:0});

  useEffect(() => {
    if (!ProyectoID) return;
    fetchAllReservations(ProyectoID).then(res => setReserva(res));
    fetchAllPromesas(ProyectoID).then(res => setPromesa(res));
  }, [ProyectoID]);

  return (
    <>
      <div className="heading row justify-content-between">
        <h2 className="title-01 col-auto">Metas {project.Name}</h2>
      </div>

      <div className="mt-3">
        <ul className="dash-card-container">
          <div className="row">
            <article className="dash-card col-lg-6 col-12">
              <div className="box">
                <span className="sub-title">Llevamos</span>
                <span className="title">
                  UF <b>{reserva.cost}</b>
                </span>
                <figure className="progress-card green">
                  <progress className="" value={reserva.percent} max="100" />
                  <span className="key">Meta</span>
                  <span className="value">
                    UF <b>{reserva.total}</b>
                  </span>
                </figure>
              </div>
            </article>
            <article className="dash-card col-lg-6 col-12">
              <div className="box">
                <span className="sub-title">Llevamos</span>
                <span className="title">
                  Promesas <b>{promesa.cost}</b>
                </span>
                <figure className="progress-card yellow">
                  <progress className="" value={promesa.percent} max="100" />
                  <span className="key">Meta</span>
                  <span className="value">
                    <b>{promesa.total}</b>
                  </span>
                </figure>
              </div>
            </article>
          </div>
        </ul>
      </div>

      <ProjectPhases project={project} active={active} />
    </>
  );
}

ProjectMeta.propTypes = {
  active: PropTypes.string,
  project: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default ProjectMeta;