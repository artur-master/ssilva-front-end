import moment from 'components/moment';
import { formatNumber } from 'containers/App/helpers';

export const SortPendingAction = (actions = {}) => {
  return actions.sort(function (a, b) {
    return new Date(b.Date) - new Date(a.Date);
  });
}
