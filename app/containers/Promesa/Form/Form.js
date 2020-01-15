/**
 *
 * Promesa Form
 *
 */
import React, { useState } from 'react';
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
import PhaseFirmaOrNegociacionPromesa from 'containers/Phases/Promesa/FirmaOrNegociacion';
import PhaseFirmaDocumentsPromesa from 'containers/Phases/Promesa/FirmaDocuments';
import PhaseControlPromesa from 'containers/Phases/Promesa/ControlPromesa';
import PhaseTimeline from 'containers/Phases/Promesa/Timeline';
import Steps from './Steps';
import {
  controlPromesa,
  approveUploadConfeccionPromesa,
  uploadConfeccionPromesa,
  uploadFirmaDocumentsPromesa,
  sendPromesaToIn,
  signIn,
  legalize,
  sendCopy,
} from './actions';
import { canEditConfeccionPromesa } from '../helper';
export function Form({ selector, dispatch }) {
  const { project = {} } = window;
  const entity = selector.promesa;
  const initialValues = entity;

  const [uploadFirma, setUploadFirma] = useState(false);

  const onCancel = () =>
    dispatch(push(`/proyectos/${project.ProyectoID}/promesas`));

  const blockPromesa = () => {
    // confeccion
    if (
      [PROMESA_STATE[0], PROMESA_STATE[9], PROMESA_STATE[11]].includes(
        entity.PromesaState,
      )
    ) {
      if (
        (entity.PromesaState === PROMESA_STATE[9] && UserProject.isAC()) ||
        (entity.PromesaState === PROMESA_STATE[11] && UserProject.isPM())
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
    }

    // negociacion
    if (
      entity.PromesaState === PROMESA_STATE[1] &&
      UserProject.isVendor() &&
      !uploadFirma
    ) {
      return (
        <PhaseFirmaOrNegociacionPromesa
          entity={entity}
          selector={selector}
          onFirma={() => setUploadFirma(true)}
          onSubmit={values => {}}
        />
      );
    }

    // control promesa -- approve firma documents
    if (entity.PromesaState === PROMESA_STATE[12] && UserProject.isAC()) {
      return (
        <PhaseControlPromesa
          entity={entity}
          selector={selector}
          onControl={values =>
            dispatch(
              controlPromesa({
                PromesaID: entity.PromesaID,
                ...values,
              }),
            )
          }
        />
      );
    }

    // send to in
    if (
      [
        PROMESA_STATE[2],
        PROMESA_STATE[4],
        PROMESA_STATE[5],
        PROMESA_STATE[6],
        PROMESA_STATE[7],
        PROMESA_STATE[8],
      ].includes(entity.PromesaState)
    ) {
      return (
        <PhaseTimeline
          entity={entity}
          selector={selector}
          onCancel={onCancel}
          onSendToIn={values =>
            dispatch(
              sendPromesaToIn({ PromesaID: entity.PromesaID, ...values }),
            )
          }
          onSignIn={values =>
            dispatch(signIn({ PromesaID: entity.PromesaID, ...values }))
          }
          onLegalize={values =>
            dispatch(legalize({ PromesaID: entity.PromesaID, ...values }))
          }
          onSendCopy={values =>
            dispatch(sendCopy({ PromesaID: entity.PromesaID, ...values }))
          }
        />
      );
    }

    return (
      <PhaseFirmaDocumentsPromesa
        entity={entity}
        selector={selector}
        onCancel={() =>
          entity.PromesaState === PROMESA_STATE[1]
            ? setUploadFirma(false)
            : onCancel()
        }
        onSubmit={values =>
          dispatch(uploadFirmaDocumentsPromesa(entity.PromesaID, values))
        }
        canUpload={
          UserProject.isVendor() &&
          [PROMESA_STATE[1], PROMESA_STATE[12]].includes(entity.PromesaState)
        }
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
