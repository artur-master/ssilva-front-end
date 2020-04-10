/**
 *
 * ProjectMeta
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProjectPhases from 'containers/Common/ProjectPhases';
import { Auth } from 'containers/App/helpers';
import { fetchProjectMeta } from './helper';

export function ProjectMeta({ project = {}, active }) {
  if (Auth.isInmobiliario()) return null;

  const { ProyectoID } = project;

  const [metas, setMetas] = useState({
    promesas: 0,
    firmadoPromesas: 0,
    totalPrice: 0, 
    firmadoPrice: 0
  }); 

  useEffect(() => {
    if (!ProyectoID) return;
    fetchProjectMeta(ProyectoID).then(res => setMetas(res));
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
                  UF <b>{metas.firmadoPrice}</b>
                </span>
                <figure className="progress-card green">
                  <progress max="100" 
                    value={metas.totalPrice ? 100*metas.firmadoPrice/metas.totalPrice : 0} 
                  />
                  <span className="key">Meta</span>
                  <span className="value">
                    UF <b>{metas.totalPrice}</b>
                  </span>
                </figure>
              </div>
            </article>
            <article className="dash-card col-lg-6 col-12">
              <div className="box">
                <span className="sub-title">Llevamos</span>
                <span className="title">
                  Promesas <b>{metas.firmadoPromesas}</b>
                </span>
                <figure className="progress-card yellow">
                  <progress max="100"
                    value={metas.promesas ? 100*metas.firmadoPromesas/metas.promesas : 0}
                  />
                  <span className="key">Meta</span>
                  <span className="value">
                    <b>{metas.promesas}</b>
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