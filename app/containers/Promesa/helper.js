import { PROMESA_STATE } from 'containers/App/constants';
import { UserProject } from '../Project/helper';

export const initReports = () =>
  PROMESA_STATE.reduce(
    (acc, state) => {
      acc[state] = { Label: state, Count: 0 };
      return acc;
    },
    {
      All: { Label: 'Todas', Count: 0 },
    },
  );

export const getReports = (entities = []) =>
  entities.reduce((acc, item) => {
    acc.All.Count += 1;
    const key = item.PromesaState;
    acc[key] = acc[key] || {
      Label: key,
      Count: 0,
    };
    acc[key].Label = key;
    acc[key].Count += 1;
    return acc;
  }, initReports());

export const canEditConfeccionPromesa = promesa =>
  UserProject.isLegal() &&
  [PROMESA_STATE[0], PROMESA_STATE[9]].includes(promesa.PromesaState);

export const isPendingApproveConfeccionPromesa = promesa =>
  (UserProject.isAC() || UserProject.isPM()) &&
  promesa.PromesaState === PROMESA_STATE[9];

export const canEditPromesa = promesa => true;
