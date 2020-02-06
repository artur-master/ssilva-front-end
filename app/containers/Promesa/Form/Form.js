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
import PhaseReviewNegociacionPromesa from 'containers/Phases/Promesa/ReviewNegociacionPromesa';
import PromesaObservation from 'containers/Phases/Promesa/Observation/index';
import FacturaButton from 'containers/Phases/Factura/Buttons';
import Factura from 'containers/Phases/Factura';
import Desistimiento from 'containers/Phases/Promesa/Desistimiento';
import PromesaRefundGarantia from 'containers/Phases/Promesa/RefundGarantia';
import RefundGrantiaButton from 'containers/Phases/Promesa/RefundGarantia/Buttons';
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
  sendToReviewNegociacion,
  updatePromesa,
  reviewNegociacion,
  generateFactura,
} from './actions';
import { canEditConfeccionPromesa, canRefund } from '../helper';
import StepsDesistimento from './StepsDesistimiento';
import StepsResiliacion from './StepsResiliacion';
import StepsResolucion from './StepsResolucion';
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
      [
        PROMESA_STATE[0],
        PROMESA_STATE[1],
        PROMESA_STATE[9],
        PROMESA_STATE[10],
        PROMESA_STATE[11],
        PROMESA_STATE[13],
        PROMESA_STATE[14],
      ].includes(entity.PromesaState)
    ) {
      // AC & PM approve confeccion
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

      // PM review negociacion
      if (entity.PromesaState === PROMESA_STATE[13] && UserProject.isPM())
        return (
          <PhaseReviewNegociacionPromesa
            entity={entity}
            selector={selector}
            onSubmit={() =>
              dispatch(
                reviewNegociacion({
                  PromesaID: entity.PromesaID,
                  Condition: entity.Condition,
                }),
              )
            }
            onCancel={onCancel}
          />
        );
      if (!(entity.PromesaState === PROMESA_STATE[1] && UserProject.isVendor()))
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
        PROMESA_STATE[3],
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
          onGenerateFactura={() =>
            dispatch(generateFactura({ PromesaID: entity.PromesaID }))
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

    // V firma or negociacion
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
          onSubmit={values =>
            dispatch(
              sendToReviewNegociacion({
                PromesaID: entity.PromesaID,
                ...values,
              }),
            )
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
  let stepsComponent = '';
  let subtitle = '';

  switch (selector.promesa.PromesaState) {
    case PROMESA_STATE[16]:
      stepsComponent = <StepsDesistimento promesa={selector.promesa} />;
      subtitle = entity.PromesaDesistimentoState || entity.PromesaState;
      break;
    case PROMESA_STATE[17]:
      stepsComponent = <StepsResiliacion promesa={selector.promesa} />;
      subtitle = entity.PromesaResiliacionState || entity.PromesaState;
      break;
    case PROMESA_STATE[18]:
      stepsComponent = <StepsResolucion promesa={selector.promesa} />;
      subtitle = entity.PromesaResolucionState || entity.PromesaState;
      break;
    default:
      stepsComponent = <Steps promesa={selector.promesa} />;
      subtitle = entity.PromesaState;
  }

  return (
    <>
      <InitData User Client />
      <ProjectPhases project={project} active="promesa" />
      {stepsComponent}
      <h4 className="font-21 mt-3">{`${project.Name} / ${entity.Folio}`}</h4>
      <h5 className="mb-3 d-flex align-items-center after-expands-2">
        <span className="font-16-rem line-height-1 color-success">
          {subtitle}
        </span>
        {canRefund(entity) && (
          <>
            <PromesaRefundGarantia />
            <RefundGrantiaButton promesa={entity} />
          </>
        )}
        {UserProject.isLegal() && entity.Factura && (
          <>
            <Factura />
            <FacturaButton factura={entity.Factura} />
          </>
        )}
      </h5>
      <PromesaObservation
        entity={entity}
        selector={selector}
        onChange={Condition => dispatch(updatePromesa({ Condition }))}
      />
      <PhaseGeneral initialValues={initialValues} />
      <PhaseClient payType={entity.PayType} client={entity.Cliente} />
      <PhaseInmueble initialValues={initialValues} />
      <PhaseFormaDePago initialValues={initialValues} />
      <PhasePreCredito isCollapse={false} initialValues={initialValues} />
      <PhaseDocument entity={initialValues} />

      {blockPromesa()}
      <Desistimiento promesa={entity} />
    </>
  );
}

Form.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Form;
