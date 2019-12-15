/**
 *
 * Promesa Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import PhaseGeneral from 'containers/Phases/General';
import PhaseClient from 'containers/Phases/Client';
import PhaseInmueble from 'containers/Phases/Inmueble';
import PhaseFormaDePago from 'containers/Phases/FormaDePago';
import PhasePreCredito from 'containers/Phases/PreCredito';
import PhaseDocument from 'containers/Phases/Document';
import { push } from 'connected-react-router';
import ProjectPhases from 'containers/Common/ProjectPhases';
import model from '../../model';
import { confirmToClient, updatePromesa } from '../actions';
import PromesaConfirmObservation from './Observation';
import PromesaConfirmActions from './Actions';
import Steps from '../Steps';
import { getActionTitle } from '../../helper';

export function PromesaConfirm({ selector, dispatch }) {
  const { project = {} } = window;
  const entity = selector.promesa;
  const initialValues = model({ project, entity });

  return (
    <>
      <ProjectPhases project={project} active="promesa" />
      <Steps promesa={selector.promesa} />
      <h4 className="font-21 mt-3">{`${project.Name} / ${entity.Folio}`}</h4>
      <h5 className="mb-3 d-flex align-items-center justify-content-between">
        <span className="font-16-rem line-height-1 color-success">
          {getActionTitle(selector.promesa)}
        </span>
      </h5>
      <PromesaConfirmObservation
        entity={selector.promesa}
        onChange={Condition =>
          dispatch(
            updatePromesa({
              Condition,
            }),
          )
        }
      />
      <PhaseGeneral initialValues={initialValues} />
      <PhaseClient payType={entity.PayType} client={entity.Cliente} />
      <PhaseInmueble initialValues={initialValues} />
      <PhaseFormaDePago initialValues={initialValues} />
      <PhasePreCredito initialValues={initialValues} isCollapse={false} />
      <PhaseDocument entity={initialValues} isCollapse />
      <PromesaConfirmActions
        selector={selector}
        onCancel={() =>
          dispatch(push(`/proyectos/${project.ProyectoID}/promesas`))
        }
        onConfirm={() => {
          dispatch(
            confirmToClient({
              PromesaID: selector.promesa.PromesaID,
              Conditions: selector.promesa.Condition,
            }),
          );
        }}
      />
    </>
  );
}

PromesaConfirm.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func,
};

export default PromesaConfirm;
