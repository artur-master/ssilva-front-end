/**
 *
 * Escritura Form
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Auth } from 'containers/App/helpers';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Log from 'components/Log';
import Button from 'components/Button';
import History from 'components/History';
import WithLoading from 'components/WithLoading';
const SyncMessage = WithLoading();

import saga from './saga';
import reducer from './reducer';
import { 
  getEscritura,
  aproveDateEscritura,
  checkPromesa,
} from './actions';
import makeSelectEscrituraForm from './selectors';
import Steps from './Steps';
import { ESCRITURA_STATE } from 'containers/App/constants';

import PhaseGeneral from 'containers/Phases/General';
import General from 'containers/Project/General';
import PhaseClient from 'containers/Phases/Client';
import PhaseInmueble from 'containers/Phases/Inmueble';
import PhaseFormaDePago from 'containers/Phases/FormaDePago';
import PhasePreCredito from 'containers/Phases/PreCredito';
import PhaseDocument from 'containers/Phases/Document';
import PhaseTimeline from 'containers/Phases/Promesa/Timeline';
import MunicipalReception from 'containers/Phases/Escritura/MunicipalReception';
import RevisionPromesa from 'containers/Phases/Escritura/RevisionPromesa';
import NotificacionComprado from 'containers/Phases/Escritura/NotificacionComprado';
import DatesEscrituracion from 'containers/Phases/Escritura/DatesEscrituracion';
import AprobaHipotecarios from 'containers/Phases/Escritura/AprobaHipotecarios';
import AprobaHipotecarios_1 from 'containers/Phases/Escritura/AprobaHipotecarios/AprobaHipotecarios_1';
import AprobaHipotecarios_2 from 'containers/Phases/Escritura/AprobaHipotecarios/AprobaHipotecarios_2';
import TitleReport from 'containers/Phases/Escritura/TitleReport';
import TitleReport_1 from 'containers/Phases/Escritura/TitleReport/TitleReport_1';
import Matriz from 'containers/Phases/Escritura/Matriz';
import Matriz_1 from 'containers/Phases/Escritura/Matriz/Matriz_1';
import Notary from 'containers/Phases/Escritura/Notary';

export function Form({ project, selector, dispatch }) {
  
  useInjectReducer({ key: 'escrituraform', reducer });
  useInjectSaga({ key: 'escrituraform', saga });
  
  const [isHistoryOpen, setHistoryOpen] = useState(false);

  useEffect(() => {
    if (project.ProyectoID) dispatch(getEscritura(project.ProyectoID));
  }, []);
  
  const entity = selector.escritura;
  
  if (!entity) return <SyncMessage loading />;
  // const onCancel = () =>
  //   dispatch(push(`/proyectos/${project.ProyectoID}/escrituras`));
  const { EscrituraState } = entity;
  
  return (
    <>
      <Steps state={EscrituraState} />
      <div className="row m-0">
        <Button
          className="col-auto mt-3 m-btn"
          onClick={() => { }}
        >
          Ver listado inmueble
        </Button>
        <h4 className="col p-0 font-21 mt-3">
          {/* {`${project.Name}`}
          <span className="general-phase">
            - Escritura
            <i className="icon icon-z-info" title="This is Escritura." />
          </span> */}
        </h4>
        <Button
          className="col-auto mt-3 m-btn-white m-btn-history"
          onClick={() => setHistoryOpen(true)}
        >
          Historial
        </Button>
      </div>
      {/* <!-- Title --> */}
      <div className="mt-2 d-flex align-items-end justify-content-between after-expands-2">
        <h4 className="font-21 color-regular mt-3 order-1">Go San Pablo</h4>
      </div>
      {/* <!-- Subtitle --> */}
      <h5 className="mb-3 font-18 d-flex align-items-center justify-content-between">
        <span className="line-height-1 color-success">Ingreso Fechas de Presentación de Recepción Municipal</span>
      </h5>
      { isHistoryOpen && (
        <>
          <PhaseGeneral
            initialValues={entity}
            canEdit={false}
          />
          <PhaseClient
            payType={entity.PayType}
            client={entity.Cliente}
            canEdit={false}
          />
          <PhaseInmueble
            initialValues={entity}
            canEdit={false}
          />
          <PhaseFormaDePago
            initialValues={entity}
            canEdit={false}
          />
          <PhasePreCredito
            isCollapse={false}
            initialValues={entity}
          />
          <PhaseDocument
            isCollapse={false}
            entity={entity}
            promesa={true}
          />
          <PhaseTimeline
            isCollapse={false}
            entity={entity}
            selector={selector}
          />
        </>
      )}
      { (EscrituraState == ESCRITURA_STATE.Recep_Mun) && 
        <MunicipalReception
          onSubmit={(value)=>dispatch(aproveDateEscritura(value, entity.EscrituraID))}
        /> 
      }
      { EscrituraState > ESCRITURA_STATE.Recep_Mun && (
        <RevisionPromesa 
          isCollapse={(EscrituraState == ESCRITURA_STATE.Fechas_Avisos) &&
                       Auth.isGerenteComercial()}
          initialValues={entity}
          onSubmit={(values)=>dispatch(checkPromesa(values, entity.EscrituraID))}
        />
      )}
      { EscrituraState > ESCRITURA_STATE.Fechas_Avisos && ( 
        <>
          <NotificacionComprado />
          <DatesEscrituracion />
          <AprobaHipotecarios />
          <AprobaHipotecarios_1 />
          <AprobaHipotecarios_2 />
          <TitleReport />
          <TitleReport_1 />
          <Matriz />
          <Matriz_1 />
          <Notary />
        </>
      )}
      {/* <Log logs={entity.Logs} limit={10} /> */}

      {entity.Logs && (
        <History
          logs={entity.Logs}
          onHide={()=>setHistoryOpen(false)}
          isOpen={isHistoryOpen}
          title={`${project.Name}`}
        />
      )}
    </>
  );
}

Form.propTypes = {
  project: PropTypes.object,
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectEscrituraForm(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Form);
