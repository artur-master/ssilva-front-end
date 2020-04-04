/**
 *
 * Reservation Upload Form
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ExField from 'components/ExForm/ExField';
import Alert from 'components/Alert';
import Button from 'components/Button';

function Conditions({ form, entity }) {
  const { Condition = [] } = entity;
  const [Conditions, setConditions] = useState();
  const [Issave, setIsave] = useState(false);
  
  useEffect(() => {
    setConditions(Condition);
  }, [entity]);
  useEffect(() => {
    if(form.values.Condition.length > 0 )
      setIsave(true);
  }, [form.values.Condition]);
  return (
    <>
      {form && form.values.Condition.length > 0 && (
        <>
          <div className="d-block text-left m font-14-rem mb-3">
            <b>Neuva Observación</b>
          </div>
          {form.values.Condition.map((item, index) => (
            <ExField
              key={String(index)}
              rows={2}
              type="textarea"
              className="mb-3"
              name={`Condition.${(index)}.Description`}
            />
          ))}
        </>
      )}
      {Conditions && Conditions.map(
        (item, index) => (
          <Alert
            key={String(index)}
            onDismiss={() => {
              setIsave(true);
              entity.Condition = Condition.filter(items => (items !== item));
              setConditions(entity.Condition);
            }}
          >
            {item.Description}
          </Alert>
        ),
      )}
      <div className="py-3 text-right">
        <Button
          disabled={!Issave}
          type="submit"
          onClick={() => {
            form.values.Condition.push(...entity.Condition);
          }}
        >
          Reservar con Observaciones
        </Button>
      </div>
    </>
  );
}

Conditions.propTypes = {
  form: PropTypes.object,
};

export default Conditions;
