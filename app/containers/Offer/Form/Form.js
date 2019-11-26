/**
 *
 * Offer Form
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
import { isContadoPayment } from 'containers/App/helpers';
import model from '../model';
import {
  canConfirmOffer,
  canEditOffer,
  canReviewOffer,
  canUploadOffer,
} from './helper';
import {
  cancelOffer,
  controlReview,
  saveOffer,
  sendToControl,
  updateOffer,
} from './actions';

export function Form({ project, selector, dispatch }) {
  const entity = selector.offer;
  const isContado = isContadoPayment(entity.PayType);
  /* eslint-disable-next-line */
  const [step, setStep] = useState(entity.OfertaID ? 3 : isContado ? 2 : 1);

  const [confirmes, setConfirmes] = useState({
    general: false,
    client: false,
    inmueble: false,
    forma: false,
  });
  const canEdit = canEditOffer(entity);
  const canConfirm = canConfirmOffer(entity);
  const canUpload = canUploadOffer(entity);
  const canReview = canReviewOffer(entity);
  const initialValues = model({ project, entity });
  const handleConfirm = (data, confirm) => {
    setConfirmes({
      ...confirmes,
      [data]: confirm,
    });
  };
  return (
    <>
      <PhaseGeneral
        onConfirm={handleConfirm}
        initialValues={initialValues}
        canEdit={canEdit}
        canConfirm={canConfirm}
        onUpdate={values => dispatch(updateOffer(values))}
      />
      <PhaseClient
        payType={entity.PayType}
        canEdit={false}
        canConfirm={false}
        onConfirm={handleConfirm}
        onUpdate={Cliente => dispatch(updateOffer({ Cliente }))}
        client={entity.Cliente}
      />
      <PhaseInmueble
        canEdit={false}
        canConfirm={false}
        onConfirm={handleConfirm}
        onUpdate={values => dispatch(updateOffer(values))}
        initialValues={initialValues}
      />
      <PhaseFormaDePago
        canEdit={false}
        canConfirm={false}
        onConfirm={handleConfirm}
        initialValues={initialValues}
        onUpdate={values => dispatch(updateOffer(values))}
      />

      <PhasePreCredito
        canEdit={false}
        isConfirmed={
          !Object.keys(confirmes).find(confirm => !confirmes[confirm])
        }
        initialValues={initialValues}
        step={step}
        dispatch={dispatch}
        onContinue={values => {
          setStep(step + 1);
          dispatch(updateOffer(values));
        }}
      />
      {(step === 3 || entity.OfertaID) && (
        <PhaseDocument
          entity={initialValues}
          canUpload={canUpload}
          canReview={canReview}
          selector={selector}
          onCancel={Comment => {
            if (entity.OfertaID)
              dispatch(cancelOffer({ OfertaID: entity.OfertaID, Comment }));
            else dispatch(push(`/proyectos/${project.ProyectoID}/ofertas`));
          }}
          onSave={documents =>
            dispatch(saveOffer({ ...initialValues, ...entity }, documents))
          }
          onSendControl={documents => {
            entity.Condition = documents.Condition;
            dispatch(sendToControl({ ...initialValues, ...entity }, documents));
          }}
          onControlReview={values =>
            dispatch(controlReview({ ...values, OfertaID: entity.OfertaID }))
          }
        />
      )}
    </>
  );
}

Form.propTypes = {
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  selector: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Form;
