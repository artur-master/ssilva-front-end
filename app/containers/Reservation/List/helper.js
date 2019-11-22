import { RESERVA_STATE } from 'containers/App/constants';
import { UserProject } from 'containers/Project/helper';
import { Auth } from 'containers/App/helpers';

export const initReports = () =>
  RESERVA_STATE.reduce(
    (acc, state) => {
      acc[state] = { Label: state, Count: 0 };
      return acc;
    },
    { All: { Label: 'Todas', Count: 0 } },
  );

export const getReports = (entities = []) =>
  entities.reduce((acc, item) => {
    acc.All.Count += 1;
    acc[item.ReservaState] = acc[item.ReservaState] || {
      Label: item.ReservaStateLabel,
      Count: 0,
    };
    acc[item.ReservaState].Label = item.ReservaStateLabel;
    acc[item.ReservaState].Count += 1;
    return acc;
  }, initReports());

export const canCreateReservation = () =>
  !window.project
    ? false
    : UserProject.in(window.project) &&
      Auth.hasOneOfPermissions(['Es vendedor']);
