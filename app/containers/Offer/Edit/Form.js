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
import model from '../model';

export function Form({ project, selector }) {
  const entity = selector.offer;
  const initialValues = model({ project, entity });
  return (
    <>
      <PhaseGeneral initialValues={initialValues} />
      <PhaseClient payType={entity.PayType} client={entity.Cliente} />
      <PhaseInmueble initialValues={initialValues} />
      <PhaseFormaDePago initialValues={initialValues} />
      <PhasePreCredito isCollapse={false} initialValues={initialValues} />
      <PhaseDocument
        isCollapse
        canUpload
        entity={initialValues}
        selector={{}}
      />
    </>
  );
}

Form.propTypes = {
  project: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  selector: PropTypes.object,
};

export default Form;
