/**
 *
 * Reservation Form
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
  canConfirmReservation,
  canEditReservation,
  canReviewReservation,
  canUploadReservation,
} from './helper';
import {
  cancelReservation,
  controlReview,
  saveReservation,
  sendToControl,
  updateReservation,
} from './actions';

export function Form({ project, selector, dispatch }) {
  const entity = selector.reservation;
  const isContado = isContadoPayment(entity.PayType);
  /* eslint-disable-next-line */
  const [step, setStep] = useState(entity.ReservaID ? 3 : isContado ? 2 : 1);

  const [confirmes, setConfirmes] = useState({
    general: false,
    client: false,
    inmueble: false,
    forma: false,
  });
  const canEdit = canEditReservation(entity);
  const canConfirm = canConfirmReservation(entity);
  const canUpload = canUploadReservation(entity);
  const canReview = canReviewReservation(entity);
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
        onUpdate={values => dispatch(updateReservation(values))}
      />
      <PhaseClient
        payType={entity.PayType}
        canEdit={canEdit}
        canConfirm={canConfirm}
        onConfirm={handleConfirm}
        onUpdate={Cliente => dispatch(updateReservation({ Cliente }))}
        client={entity.Cliente}
      />
      <PhaseInmueble
        canEdit={canEdit}
        canConfirm={canConfirm}
        onConfirm={handleConfirm}
        onUpdate={values => dispatch(updateReservation(values))}
        initialValues={initialValues}
      />
      <PhaseFormaDePago
        canEdit={canEdit}
        canConfirm={canConfirm}
        onConfirm={handleConfirm}
        initialValues={initialValues}
        onUpdate={values => dispatch(updateReservation(values))}
      />

      <PhasePreCredito
        canEdit={canEdit}
        showScreen={!initialValues.ReservaID ? 'form' : 'view'}
        isConfirmed={
          !Object.keys(confirmes).find(confirm => !confirmes[confirm])
        }
        initialValues={initialValues}
        step={step}
        dispatch={dispatch}
        onContinue={values => {
          setStep(step + 1);
          dispatch(updateReservation(values));
        }}
      />
      {(step === 3 || entity.ReservaID) && (
        <PhaseDocument
          isCollapse
          entity={initialValues}
          canUpload={canUpload}
          canReview={canReview}
          selector={selector}
          onCancel={Comment => {
            if (entity.ReservaID)
              dispatch(
                cancelReservation({ ReservaID: entity.ReservaID, Comment }),
              );
            else dispatch(push(`/proyectos/${project.ProyectoID}/reservas`));
          }}
          onSave={documents =>
            dispatch(
              saveReservation({ ...initialValues, ...entity }, documents),
            )
          }
          onSendControl={documents => {
            entity.Condition = documents.Condition;
            dispatch(sendToControl({ ...initialValues, ...entity }, documents));
          }}
          onControlReview={values =>
            dispatch(controlReview({ ...values, ReservaID: entity.ReservaID }))
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
