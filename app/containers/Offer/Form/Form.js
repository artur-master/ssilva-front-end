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
import { PRE_APROBACION_CREDITO_STATE } from 'containers/App/constants';
import { UserProject } from 'containers/Project/helper';
import ProjectPhases from 'containers/Common/ProjectPhases';
import InitData from 'containers/Common/InitData';
import PhaseObservation from 'containers/Phases/Observation';
import model from '../model';
import {
  canApproveConfeccionPromesa,
  canEditOffer,
  getActionTitle,
  isPendienteContacto,
  isPendienteAprobacion,
} from '../helper';
import Steps from './Steps';
import ApproveConfeccionPromesa from './ApproveConfeccionPromesa';
import { approveConfeccionPromesa } from './actions';
import FormActions from './FormActions';
import Button from 'components/Button';
import History from 'components/History';

export function Form({ selector, selectorCredit, dispatch }) {
  const { project = {} } = window;
  const entity = selector.offer;
  const initialValues = model({ project, entity });
  const onEdit = () =>
    dispatch(
      push(
        `/proyectos/${project.ProyectoID}/oferta/editar?OfertaID=${
        initialValues.OfertaID
        }`,
      ),
    );

  const onCancel = () =>
    dispatch(push(`/proyectos/${project.ProyectoID}/ofertas`));

  const onWithdraw = () => console.log("onWithdraw");
/*Commented by Artur
  const controlAction = (
    <ApproveConfeccionPromesa
      selector={selector}
      onControl={values =>
        dispatch(
          approveConfeccionPromesa({
            ...values,
            OfertaID: initialValues.OfertaID,
          }),
        )
      }
      onEdit={onEdit}
    />
  );
*/
  //Added by Artur
  const [isHistoryOpen, setHistoryOpen] = useState(false);
  //Added by Artur
  return (
    <>
      <InitData User Client />
      <ProjectPhases project={project} active="offer" />
      <Steps
        offer={{ ...selector.offer, Credits: selectorCredit.entities || [] }}
      />
      <div className="row m-0">
        <h4 className="col p-0 font-21 mt-3">
          {`${project.Name} / ${entity.Folio}`}
          <span className="general-phase"> - Oferta
            <i className="icon icon-z-info" title="This is Oferta."/>
          </span>
        </h4>
        <Button
          className="col-auto mt-3 m-btn-white m-btn-history"
          onClick={() => setHistoryOpen(true)}
        >
          Historial
        </Button>
        {(UserProject.isPM() || UserProject.isVendor()) &&
          <Button
            className="col-auto mt-3 m-btn m-btn-pen"
            onClick={onEdit}
          >
            Modificación
          </Button>
        }
      </div>
      <h5 className="mb-3 d-flex align-items-center justify-content-between">
        <span className="font-16-rem line-height-1 color-success">
          {getActionTitle(selector.offer)}
        </span>
      </h5>
      {UserProject.isLegal() && <PhaseObservation entity={initialValues} />}
      <PhaseGeneral initialValues={initialValues} />
      <PhaseClient payType={entity.PayType} client={entity.Cliente} />
      <PhaseInmueble initialValues={initialValues} />
      <PhaseFormaDePago initialValues={initialValues} />
      <PhasePreCredito
        initialValues={initialValues}
        canEditCredit={
          initialValues.OfertaID &&
          initialValues.PreAprobacionCreditoState ===
          PRE_APROBACION_CREDITO_STATE[1] &&
          UserProject.isAC() &&
          !isPendienteContacto(initialValues)
        }
        isPendienteAprobacion={isPendienteAprobacion(initialValues)}
      />
      <PhaseDocument entity={initialValues} />
      {/* {canApproveConfeccionPromesa(initialValues) && controlAction} */}
      {canApproveConfeccionPromesa(initialValues) && 
        <ApproveConfeccionPromesa
          selector={selector}
          onControl={values =>
            dispatch(
              approveConfeccionPromesa({
                ...values,
                OfertaID: initialValues.OfertaID,
              }),
            )
          }
          onEdit={onEdit}
        />
      }
      {!canApproveConfeccionPromesa(initialValues) && (
        <FormActions
          onCancel={onCancel}
          onWithdraw={onWithdraw}
          canWithdraw={UserProject.isPM()}
        />
      )}

      {/* Added by Artur */}
      {selector.offer && (
        <History logs={selector.offer.Logs}
          onHide={()=>setHistoryOpen(false)}
          isOpen={isHistoryOpen}
          title={`${project.Name} / ${entity.Folio}`}
        />
      )}
    </>
  );
}

Form.propTypes = {
  selector: PropTypes.object,
  selectorCredit: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Form;
