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
import model from '../model';
import Steps from './Steps';
import ApproveConfeccionPromesa from './ApproveConfeccionPromesa';
import { approveConfeccionPromesa, uploadConfeccionPromesa } from './actions';
import FormActions from './FormActions';
import { canEditConfeccionPromesa } from '../helper';
import { PROMESA_STATE } from '../../App/constants';
export function Form({ selector, dispatch }) {
  const { project = {} } = window;
  const entity = selector.promesa;
  const initialValues = entity;
  const onCancel = () =>
    dispatch(push(`/proyectos/${project.ProyectoID}/promesas`));
  return (
    <>
      <InitData User Client />
      <ProjectPhases project={project} active="promesa" />
      <Steps promesa={selector.promesa} />
      <h4 className="font-21 mt-3">{`${project.Name} / ${entity.Folio}`}</h4>
      <h5 className="mb-3 d-flex align-items-center justify-content-between">
        <span className="font-16-rem line-height-1 color-success" />
      </h5>
      <PhaseGeneral initialValues={initialValues} />
      <PhaseClient payType={entity.PayType} client={entity.Cliente} />
      <PhaseInmueble initialValues={initialValues} />
      <PhaseFormaDePago initialValues={initialValues} />
      <PhasePreCredito isCollapse={false} initialValues={initialValues} />
      <PhaseDocument isCollapse={false} entity={initialValues} />
      {UserProject.isLegal() && (
        <PhaseConfeccionPromesa
          entity={entity}
          canUpload={canEditConfeccionPromesa(entity)}
          selector={selector}
          onSubmit={values =>
            dispatch(uploadConfeccionPromesa(entity.PromesaID, values))
          }
          onCancel={onCancel}
        />
      )}
      {(UserProject.isAssistance() || UserProject.isPM()) &&
        (entity.PromesaState === PROMESA_STATE[9] && (
          <PhaseApproveConfeccionPromesa
            entity={entity}
            canUpload={canEditConfeccionPromesa(entity)}
            selector={selector}
            onSubmit={values =>
              dispatch(uploadConfeccionPromesa(entity.PromesaID, values))
            }
            onCancel={onCancel}
          />
        ))}
    </>
  );
}

Form.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Form;
