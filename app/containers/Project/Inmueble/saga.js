import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { IMPORT_FILE, SAVE_ENTITIES } from './constants';
import {
  importFileSuccess,
  importFileError,
  saveEntitiesSuccess,
  saveEntitiesError,
} from './actions';
import { sagaFetchInmuebles } from '../../Common/Inmueble/saga';

function* sagaImportFile(action) {
  const requestURL = `${API_ROOT}/empresas-proyectos/proyectos-etapas-massive/${
    action.project.Etapa[0].EtapaID
  }/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'PATCH',
      body: action.data,
      headers: {
        'content-type': null,
      },
    });
    yield put(importFileSuccess(response));
  } catch (error) {
    yield put(importFileError(error));
  }
}

function* sagaSaveEntities(action) {
  const requestURL = `${API_ROOT}/empresas-proyectos/proyectos-etapas-massive/${
    action.project.Etapa[0].EtapaID
  }/save/`;
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ data: action.data }),
    });

    yield call(sagaFetchInmuebles, { ProyectoID: action.project.ProyectoID });
    yield put(saveEntitiesSuccess({ ...response }));
  } catch (error) {
    yield put(saveEntitiesError(error));
  }
}

export default function* projectSaga() {
  yield takeLatest(IMPORT_FILE, sagaImportFile);
  yield takeLatest(SAVE_ENTITIES, sagaSaveEntities);
}
