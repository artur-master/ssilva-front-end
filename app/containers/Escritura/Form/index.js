/* eslint-disable no-unused-vars */
/**
 *
 * Escritura Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
// import queryString from 'query-string';
// import { UserProject } from 'containers/Project/helper';
import InitData from 'containers/Common/InitData';
import ProjectPhases from 'containers/Common/ProjectPhases';
import WithLoading from 'components/WithLoading';
const SyncMessage = WithLoading();
import Form from './Form';

export function EscrituraForm({ match, location }) {
  const { project = {} } = window;
  // const query = queryString.parse(location.search);

  const header = ['Proyectos'];
  if (project.Name) header.push(project.Name);

  if (!project) return <SyncMessage loading />;

  return (
    <>  
      <InitData
        Project={{ ProyectoID: match.params.id }}
        User
      />
      <ProjectPhases project={project} active="escritura" />
      <Form project={project} />
    </>
  );
}

EscrituraForm.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
};

export default EscrituraForm;
