/**
 *
 * Promesa Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import PhaseGeneral from 'containers/Phases/General';
import PhaseClient from 'containers/Phases/Client';
import PhaseInmueble from 'containers/Phases/Inmueble';
import PhaseFormaDePago from 'containers/Phases/FormaDePago';
import PhasePreCredito from 'containers/Phases/PreCredito';
import PhaseDocument from 'containers/Phases/Document';
import { UserProject } from 'containers/Project/helper';
import ProjectPhases from 'containers/Common/ProjectPhases';
import InitData from 'containers/Common/InitData';
import PhaseConfeccionPromesa from 'containers/Phases/Promesa/ConfeccionPromesa';
import PhaseApproveConfeccionPromesa from 'containers/Phases/Promesa/ApproveConfeccionPromesa';
import { PROMESA_STATE } from 'containers/App/constants';
import PhaseApproveControlPromesa from 'containers/Phases/Promesa/ApproveControlPromesa';
import PhaseRegisterSendToIN from 'containers/Phases/Promesa/RegisterSendToIN';
import Steps from './Steps';
import {
  approveControlPromesa,
  approveUploadConfeccionPromesa,
  uploadConfeccionPromesa,
} from './actions';
import { canEditConfeccionPromesa } from '../helper';
export function Form({ selector, dispatch }) {
  const { project = {} } = window;
  const entity = selector.promesa;
  const initialValues = entity;
  const onCancel = () =>
    dispatch(push(`/proyectos/${project.ProyectoID}/promesas`));

  const blockPromesa = () => {
    if (entity.PromesaState === PROMESA_STATE[2] && UserProject.isPM())
      return (
        <PhaseRegisterSendToIN
          entity={entity}
          selector={selector}
          onSubmit={values =>
            dispatch(
              approveControlPromesa({
                PromesaID: entity.PromesaID,
                ...values,
              }),
            )
          }
          onCancel={onCancel}
        />
      );
    if (entity.PromesaState === PROMESA_STATE[1] && UserProject.isVendor())
      return (
        <PhaseApproveControlPromesa
          entity={entity}
          selector={selector}
          onSubmit={values =>
            dispatch(
              approveControlPromesa({
                PromesaID: entity.PromesaID,
                ...values,
              }),
            )
          }
        />
      );
    if (
      entity.PromesaState === PROMESA_STATE[9] &&
      entity.DocumentFirmaComprador &&
      (UserProject.isAssistance() || UserProject.isPM())
    )
      return (
        <PhaseApproveConfeccionPromesa
          entity={entity}
          selector={selector}
          onSubmit={values =>
            dispatch(
              approveUploadConfeccionPromesa({
                PromesaID: entity.PromesaID,
                ...values,
              }),
            )
          }
        />
      );

    return (
      <PhaseConfeccionPromesa
        entity={entity}
        canUpload={canEditConfeccionPromesa(entity)}
        selector={selector}
        onSubmit={values =>
          dispatch(uploadConfeccionPromesa(entity.PromesaID, values))
        }
        onCancel={onCancel}
      />
    );
  };

  return (
    <>
      <InitData User Client />
      <ProjectPhases project={project} active="promesa" />
      <Steps promesa={selector.promesa} />
      <h4 className="font-21 mt-3">{`${project.Name} / ${entity.Folio}`}</h4>
      <h5 className="mb-3 d-flex align-items-center justify-content-between">
        <span className="font-16-rem line-height-1 color-success">
          {entity.PromesaState}
        </span>
      </h5>
      <PhaseGeneral initialValues={initialValues} />
      <PhaseClient payType={entity.PayType} client={entity.Cliente} />
      <PhaseInmueble initialValues={initialValues} />
      <PhaseFormaDePago initialValues={initialValues} />
      <PhasePreCredito isCollapse={false} initialValues={initialValues} />
      <PhaseDocument entity={initialValues} />

      {blockPromesa()}
    </>
  );
}

Form.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Form;
