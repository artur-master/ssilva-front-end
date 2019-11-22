import React, { useState } from 'react';
import { Input, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { Field as FormikField } from 'formik';

const RadioGroup = ({ options = [], required, ...props }) => {
  const [error, setError] = useState(false);
  return (
    <div className="row">
      <div className="d-flex">
        {options.map(option => (
          <FormikField
            validate={value => {
              if (
                required &&
                (value === undefined || value === '' || value === null)
              )
                return 'Este campo es requerido';
              return null;
            }}
            key={option.value}
            {...props}
          >
            {({ field: { name, value, ...field }, form }) => {
              if (form.touched[name] && form.errors[name])
                setError(form.errors[name]);
              if (!form.errors[name]) setError(false);
              return (
                <div className="radio col-auto d-flex align-items-center font-14-rem">
                  <div className="m-radio">
                    <Input
                      addon
                      type="radio"
                      name={name}
                      {...field}
                      value={option.value}
                      /* eslint-disable-next-line */
                      checked={value == option.value}
                    />
                    <Label />
                  </div>
                  <span className="ml-1 font-14-rem">
                    <b>{option.label}</b>
                  </span>
                </div>
              );
            }}
          </FormikField>
        ))}
      </div>
      {error && <div className="invalid-feedback d-block mr-3">{error}</div>}
    </div>
  );
};

RadioGroup.propTypes = {
  required: PropTypes.bool,
  name: PropTypes.string,
  options: PropTypes.array,
};

export default RadioGroup;
