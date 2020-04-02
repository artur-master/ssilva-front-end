import { all, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { FETCH_ENTITIES, UPLOAD_BLUEPRINT, SELECT_ENTITY } from './constants';
import { fetchEntitiesSuccess, fetchEntitiesError, sucessUpload, errorUpload } from './actions';
import { routerActions } from 'connected-react-router';

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

export function* uploadblueFiles(action) {
  const data = new FormData();
  let value_check = false;
  Object.keys(action.values).forEach(key => {
    const value = action.values[key];
    const entity = action.entities.find(ent => (ent.BluePrint === value.name));    
    if(entity){
      data.append(entity.InmuebleID, value);
      value_check = true;
    }
  });
  if(value_check){
    const requestURL = `${API_ROOT}/empresas-proyectos/inmuebles/`;
    try {
      const response = yield call(request, requestURL, {
        method: 'POST',
        body: data,
        headers: {
          'content-type': null,
        }
      });
      yield put(sucessUpload(response));
    } catch (error) {
      yield put(errorUpload(error));
    }
  }
  yield put(errorUpload('nothing to upload'));
}

export default function* inmuebleSaga() {
  yield takeLatest(FETCH_ENTITIES, sagaFetchInmuebles);
  yield takeLatest(UPLOAD_BLUEPRINT, uploadblueFiles);
}
