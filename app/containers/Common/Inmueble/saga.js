import { all, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { FETCH_ENTITIES } from './constants';
import { fetchEntitiesSuccess, fetchEntitiesError } from './actions';

export function* sagaFetchInmuebles(action) {
  try {
    const [restrictions, inmuebles] = yield all([
      call(
        request,
        `${API_ROOT}/empresas-proyectos/proyectos/${
          action.ProyectoID
        }/restrictions/`,
      ),
      call(
        request,
        `${API_ROOT}/empresas-proyectos/proyectos-etapas/?q=${
          action.ProyectoID
        }`,
      ),
    ]);
    yield put(fetchEntitiesSuccess({ restrictions, inmuebles }));
  } catch (error) {
    yield put(fetchEntitiesError(error));
  }
}

export default function* inmuebleSaga() {
  yield takeLatest(FETCH_ENTITIES, sagaFetchInmuebles);
}
