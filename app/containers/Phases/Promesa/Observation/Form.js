/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import ExField from 'components/ExForm/ExField';
import Alert from 'components/Alert';

function PromesaObservationForm({ form }) {
  const { Condition = [] } = form.values;
  return (
    <>
      <div className="d-block text-left m font-14-rem mb-3">
        <b>Neuva Observación</b>
      </div>
      <ExField rows={5} type="textarea" className="mb-3" name="NewCondition" />
      {Condition.map((item, index) => (
        <Alert
          key={String(index)}
          onDismiss={() => {
            form.setFieldValue(
              'Condition',
              Condition.filter((co, i) => i !== index),
            );
          }}
          icon={item.IsApprove ? 'check' : 'alert'}
        >
          {item.Description}
        </Alert>
      ))}
    </>
  );
}

PromesaObservationForm.propTypes = {
  form: PropTypes.object,
};

export default PromesaObservationForm;
