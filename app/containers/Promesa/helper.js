import { PROMESA_STATE } from 'containers/App/constants';

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

export const canEditPromesa = () => true;
