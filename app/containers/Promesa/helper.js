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
  promesa.PromesaState === PROMESA_STATE[0] ||
  promesa.PromesaState === PROMESA_STATE[9];

export const isPendingApproveConfeccionPromesa = promesa =>
  (UserProject.isAssistance() || UserProject.isPM()) &&
  promesa.PromesaState === PROMESA_STATE[9];
