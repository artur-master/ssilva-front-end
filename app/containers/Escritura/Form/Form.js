/**
 *
 * Escritura Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { UserProject } from 'containers/Project/helper';
import ProjectPhases from 'containers/Common/ProjectPhases';
import InitData from 'containers/Common/InitData';
import Log from 'components/Log';
import Button from 'components/Button';
import History from 'components/History';
import Steps from './Steps';
import PhaseGeneral from 'containers/Phases/General';
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

export function Form({ selector, dispatch }) {
  const { project = {} } = window;
  const entity = selector.promesa;
  const initialValues = entity;
  
  const onCancel = () =>
    dispatch(push(`/proyectos/${project.ProyectoID}/escrituras`));
  
  let subtitle = '';

  const [isHistoryOpen, setHistoryOpen] = useState(false);
  const onHide = () => setHistoryOpen(false);

const [i, setI] = useState(0);

  return (
    <>
      <InitData User Client />
      <ProjectPhases project={project} active="escritura" />
      {/* <Steps escritura={{}} /> */}
      <Steps i={i}/>
      <div className="row m-0">
        <Button
          className="col-auto mt-3 m-btn"
          onClick={() => { }}
        >
          Ver listado inmueble
        </Button>
        <h4 className="col p-0 font-21 mt-3">
          {/* {`${project.Name} / ${entity.Folio}`} */}
          <span className="general-phase">
            - Escritura
            <i className="icon icon-z-info" title="This is Escritura." />
          </span>
        </h4>
        <Button
          className="col-auto mt-3 m-btn-white m-btn-history"
          // onClick={() => setHistoryOpen(true)}
          onClick={() => setI(i+1)}
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
      <PhaseGeneral
        initialValues={initialValues}
        canEdit={false}
      />
      <PhaseClient
        payType={entity.PayType}
        client={entity.Cliente}
        canEdit={false}
      />
      <PhaseInmueble
        initialValues={initialValues}
        canEdit={false}
      />
      <PhaseFormaDePago
        initialValues={initialValues}
        canEdit={false}
      />
      <PhasePreCredito
        isCollapse={false}
        initialValues={initialValues}
      />
      <PhaseDocument
        isCollapse={false}
        entity={initialValues}
        promesa={true}
      />
      <PhaseTimeline
        isCollapse={false}
        entity={entity}
        selector={selector}
      />
      <MunicipalReception />
      <RevisionPromesa />
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

      {/* <Log logs={entity.Logs} limit={10} /> */}

      {entity.Logs && (
        <History
          logs={entity.Logs}
          onHide={onHide}
          isOpen={isHistoryOpen}
          title={`${project.Name} / ${entity.Folio}`}
        />
      )}
    </>
  );
}

Form.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Form;
