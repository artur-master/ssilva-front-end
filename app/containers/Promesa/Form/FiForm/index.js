/**
 *
 * Promesa Form
 *
 */
import React from 'react';
import { push } from 'connected-react-router';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import PhaseGeneral from 'containers/Phases/General';
import PhaseClient from 'containers/Phases/Client';
import PhaseInmueble from 'containers/Phases/Inmueble';
import PhaseFormaDePago from 'containers/Phases/FormaDePago';
import PhasePreCredito from 'containers/Phases/PreCredito';
import PhaseDocument from 'containers/Phases/Document';
import {
  RECEPCION_GARANTIA_STATE,
  OFERTA_STATE,
} from 'containers/App/constants';
import ProjectPhases from 'containers/Common/ProjectPhases';
import Button from 'components/Button';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import WithLoading from 'components/WithLoading';
import FiSteps from './Steps';
import { recepcionGarantia } from './Garantia/actions';
import makeSelectPromesaGarantia from './Garantia/selectors';
import { isPendienteContacto } from '../../helper';
import PromesaGarantia from './Garantia';

const SyncMessage = WithLoading();

export function PromesaFiForm({ selector, selectorGarantia, dispatch }) {
  const { project = {} } = window;
  const entity = selector.promesa;
  const onGarantia =
    entity.PromesaState !== OFERTA_STATE[4] &&
    entity.RecepcionGarantiaState === RECEPCION_GARANTIA_STATE[0]
      ? () => dispatch(recepcionGarantia(entity.PromesaID))
      : false;

  const onRefund =
    entity.PromesaState === OFERTA_STATE[4] &&
    entity.RecepcionGarantiaState === RECEPCION_GARANTIA_STATE[1]
      ? () => dispatch(recepcionGarantia(entity.PromesaID, true))
      : false;

  const onCancel = () =>
    dispatch(push(`/proyectos/${project.ProyectoID}/promesas`));

  if (selectorGarantia.success[entity.PromesaID]) {
    return <Redirect to={window.location} />;
  }

  return (
    <>
      <PromesaGarantia />
      <ProjectPhases project={project} active="promesa" />
      <FiSteps promesa={selector.promesa} />
      <h4 className="font-21 mt-3">{`${project.Name} / ${entity.Folio}`}</h4>
      <h5 className="mb-3 d-flex align-items-center justify-content-between">
        <span className="font-16-rem line-height-1 color-success">
          {isPendienteContacto(entity) ? 'Pendiente Contacto' : 'Promesa'}
        </span>

        <div className="d-flex align-items-center justify-content-end mr-3 order-3">
          {onGarantia &&
            (!isPendienteContacto(entity) && (
              <Button
                disabled={isPendienteContacto(entity)}
                loading={selectorGarantia.loading[entity.PromesaID]}
                onClick={onGarantia}
              >
                Recibí Garantía
              </Button>
            ))}

          {onRefund && (
            <Button
              disabled={isPendienteContacto(entity)}
              loading={selectorGarantia.loading[entity.PromesaID]}
              onClick={onRefund}
            >
              Devolución Garantía
            </Button>
          )}
          <Button
            loading={selectorGarantia.loading[entity.PromesaID]}
            color="white"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        </div>
      </h5>
      <SyncMessage
        error={selectorGarantia.error[entity.PromesaID]}
        success={selectorGarantia.success[entity.PromesaID]}
      />
      <PhaseGeneral initialValues={entity} />
      <PhaseClient payType={entity.PayType} client={entity.Cliente} />
      <PhaseInmueble initialValues={entity} />
      <PhaseFormaDePago initialValues={entity} />
      <PhasePreCredito initialValues={entity} />
      <PhaseDocument
        entity={entity}
        isCollapse
        onGarantia={isPendienteContacto(entity) ? false : onGarantia}
      />
    </>
  );
}

PromesaFiForm.propTypes = {
  selector: PropTypes.object,
  selectorGarantia: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selectorGarantia: makeSelectPromesaGarantia(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PromesaFiForm);
