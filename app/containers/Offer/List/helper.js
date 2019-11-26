import { OFERTA_STATE } from 'containers/App/constants';

export const initReports = () =>
  OFERTA_STATE.reduce(
    (acc, state) => {
      acc[state] = { Label: state, Count: 0 };
      return acc;
    },
    { All: { Label: 'Todas', Count: 0 } },
  );

export const getReports = (entities = []) =>
  entities.reduce((acc, item) => {
    acc.All.Count += 1;
    acc[item.OfertaState] = acc[item.OfertaState] || {
      Label: item.OfertaStateLabel,
      Count: 0,
    };
    acc[item.OfertaState].Label = item.OfertaStateLabel;
    acc[item.OfertaState].Count += 1;
    return acc;
  }, initReports());
