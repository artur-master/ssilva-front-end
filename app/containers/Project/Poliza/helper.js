import { Auth } from 'containers/App/helpers';
import { UserProject } from '../helper';

export const canUpdate = (project = {}) =>
  (UserProject.isAssistance(project) || UserProject.isPM(project)) &&
  Auth.canManageProject();

export const mustUpdate = (project = {}) => {
  const { Aseguradora = {} } = project;

  return (
    !Aseguradora.AseguradoraID &&
    (UserProject.isAssistance(project) ||
      UserProject.isPM(project) ||
      Auth.isGerenteComercial())
  );
};

export const isEmpty = (project = {}) => {
  const { Aseguradora = {} } = project;

  return !Aseguradora.AseguradoraID;
};
