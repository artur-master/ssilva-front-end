/**
 *
 * ProjectMeta
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from 'containers/Common/PageHeader';
import ProjectPhases from 'containers/Common/ProjectPhases';

export function ProjectMeta({ project = {}, active }) {
  // header
  const header = ['Proyectos'];

  if (project.Name) header.push(project.Name);

  return (
    <>
      <PageHeader header={header} />
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
                  UF <b>223.450</b>
                </span>
                <figure className="progress-card green">
                  <progress className="" value="44" max="100" />
                  <span className="key">Meta</span>
                  <span className="value">
                    UF <b>500.000</b>
                  </span>
                </figure>
              </div>
            </article>
            <article className="dash-card col-lg-6 col-12">
              <div className="box">
                <span className="sub-title">Llevamos</span>
                <span className="title">
                  Promesas <b>100</b>
                </span>
                <figure className="progress-card yellow">
                  <progress className="" value="35" max="100" />
                  <span className="key">Meta</span>
                  <span className="value">
                    <b>4.000</b>
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
