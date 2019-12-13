/**
 *
 * Offer Form
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
import { confirmToClient, updateOffer } from '../actions';
import OfferConfirmObservation from './Observation';
import OfferConfirmActions from './Actions';
import Steps from '../Steps';
import { getActionTitle } from '../../helper';

export function OfferConfirm({ selector, dispatch }) {
  const { project = {} } = window;
  const entity = selector.offer;
  const initialValues = model({ project, entity });

  return (
    <>
      <ProjectPhases project={project} active="offer" />
      <Steps offer={selector.offer} />
      <h4 className="font-21 mt-3">{`${project.Name} / ${entity.Folio}`}</h4>
      <h5 className="mb-3 d-flex align-items-center justify-content-between">
        <span className="font-16-rem line-height-1 color-success">
          {getActionTitle(selector.offer)}
        </span>
      </h5>
      <OfferConfirmObservation
        entity={selector.offer}
        onChange={Condition =>
          dispatch(
            updateOffer({
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
      <OfferConfirmActions
        selector={selector}
        onCancel={() =>
          dispatch(push(`/proyectos/${project.ProyectoID}/ofertas`))
        }
        onConfirm={() => {
          dispatch(
            confirmToClient({
              OfertaID: selector.offer.OfertaID,
              Conditions: selector.offer.Condition,
            }),
          );
        }}
      />
    </>
  );
}

OfferConfirm.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func,
};

export default OfferConfirm;
