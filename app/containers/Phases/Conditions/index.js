/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import ExField from 'components/ExForm/ExField';
import Alert from 'components/Alert';

function Conditions({ form }) {
  const { Condition = [] } = form.values;
  const lengthCond = Condition.length;
  return (
    <>
      {Condition.length > 0 && (
        <>
          <div className="d-block text-left m font-14-rem mb-3">
            <b>Neuva Observación</b>
          </div>
          <ExField
            rows={5}
            type="textarea"
            className="mb-3"
            name={`Condition.${lengthCond - 1}.Description`}
          />
        </>
      )}
      {Condition.filter((item, index) => index < lengthCond - 1).map(
        (item, index) => (
          <Alert
            key={String(index)}
            onDismiss={() => {
              form.setFieldValue(
                'Condition',
                Condition.filter((co, i) => i !== index),
              );
            }}
          >
            {item.Description}
          </Alert>
        ),
      )}
    </>
  );
}

Conditions.propTypes = {
  form: PropTypes.object,
};

export default Conditions;
