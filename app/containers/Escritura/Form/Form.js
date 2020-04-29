/**
 *
 * Escritura Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

import { Auth } from 'containers/App/helpers';
import InitData from 'containers/Common/InitData';
import ProjectPhases from 'containers/Common/ProjectPhases';
import Log from 'components/Log';
import History from 'components/History';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
const SyncMessage = WithLoading();

import { 
  checkPromesa,
  notificarCompradores,
} from './actions';

import Steps from './Steps';
import { ESCRITURA_STATE } from 'containers/App/constants';

import PhaseGeneral from 'containers/Phases/General';
import PhaseClient from 'containers/Phases/Client';
import PhaseInmueble from 'containers/Phases/Inmueble';
import PhaseFormaDePago from 'containers/Phases/FormaDePago';
import PhasePreCredito from 'containers/Phases/PreCredito';
import PhaseDocument from 'containers/Phases/Document';
import PhaseTimeline from 'containers/Phases/Promesa/Timeline';
import RevisionPromesa from 'containers/Phases/Escritura/RevisionPromesa';
import NotificacionComprado from 'containers/Phases/Escritura/NotificacionComprado';
import AprobaHipotecarios from 'containers/Phases/Escritura/AprobaHipotecarios';
import AprobaHipotecarios_1 from 'containers/Phases/Escritura/AprobaHipotecarios/AprobaHipotecarios_1';
import AprobaHipotecarios_2 from 'containers/Phases/Escritura/AprobaHipotecarios/AprobaHipotecarios_2';
import TitleReport from 'containers/Phases/Escritura/TitleReport';
import Matriz from 'containers/Phases/Escritura/Matriz';
import Matriz_1 from 'containers/Phases/Escritura/Matriz/Matriz_1';
import Notary from 'containers/Phases/Escritura/Notary';

export function Form({ selector, project, dispatch }) 
{  
  // const [isHistoryOpen, setHistoryOpen] = useState(false);
  
  const entity_escritura = selector.escritura;
  const entity_promesa = selector.promesa;
  
  if (!entity_escritura || !entity_promesa) return <SyncMessage loading />;
  // const onCancel = () =>
  //   dispatch(push(`/proyectos/${project.ProyectoID}/escrituras`));
  
  const { EscrituraState } = entity_escritura;
  
  return (
    <>
      <InitData User Client />
      <ProjectPhases project={project} active="escritura" />
      <Steps state={EscrituraState} />
      <div className="row m-0">
        <Button
          className="col-auto mt-3 m-btn"
          onClick={() => dispatch(
            push(`/proyectos/${project.ProyectoID}/escrituras`)
          )}
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
      <div className="mt-2 d-flex align-items-end justify-content-between after-expands-2">
        <h4 className="font-21 color-regular mt-3 order-1">{project.Name}</h4>
      </div>      
      <h5 className="mb-3 font-18 d-flex align-items-center justify-content-between">
        <span className="line-height-1 color-success">Ingreso Fechas de Presentación de Recepción Municipal</span>
      </h5>
      {/* { isHistoryOpen && ( */}
        <>
          <PhaseGeneral
            initialValues={entity_promesa}
            canEdit={false}
          />
          <PhaseClient
            payType={entity_promesa.PayType}
            client={entity_promesa.Cliente}
            canEdit={false}
          />
          <PhaseInmueble
            initialValues={entity_promesa}
            canEdit={false}
          />
          <PhaseFormaDePago
            initialValues={entity_promesa}
            canEdit={false}
          />
          <PhasePreCredito
            isCollapse={false}
            initialValues={entity_promesa}
          />
          <PhaseDocument
            isCollapse={false}
            entity={entity_promesa}
            promesa={true}
          />
          <PhaseTimeline
            isCollapse={false}
            entity={entity_promesa}
            selector={selector}
          />
        </>
      {/* )} */}

      { EscrituraState > ESCRITURA_STATE.Recep_Mun && ( 
        <RevisionPromesa 
          isCollapse={(EscrituraState == ESCRITURA_STATE.Fechas_Avisos_GC) &&
                       Auth.isGerenteComercial()}
          initialValues={entity_escritura}
          onSubmit={(values)=>dispatch(checkPromesa(values, entity_escritura.EscrituraID))}
        />
      )}
      { EscrituraState == ESCRITURA_STATE.Fechas_Avisos_ES && ( 
        <NotificacionComprado 
          onSubmit={()=>dispatch(notificarCompradores(entity_escritura.EscrituraID))}
        />
      )}
      { parseInt(EscrituraState) > ESCRITURA_STATE.Fechas_Avisos && 
        EscrituraState !== ESCRITURA_STATE.Apr_Creditos_I && ( 
        <>
          <AprobaHipotecarios />
          <AprobaHipotecarios_1 />
          <AprobaHipotecarios_2 />
          <TitleReport />
          <Matriz />
          <Matriz_1 />
          <Notary />
        </>
      )}
      {/* <Log logs={entity.Logs} limit={10} /> */}

      {/* {entity.Logs && (
        <History
          logs={entity.Logs}
          onHide={()=>setHistoryOpen(false)}
          isOpen={isHistoryOpen}
          title={`${project.Name}`}
        />
      )} */}
    </>
  );
}

Form.propTypes = {
  selector: PropTypes.object,
  project: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Form;
