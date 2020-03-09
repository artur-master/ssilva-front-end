import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field as FormikField, getIn } from 'formik';
import { numberFormat, formatNumber } from 'containers/App/helpers';
import ExField from './ExField';

const NumberInput = ({ className = '', label, ...props }) => (
  <ExField
    validate={value => {
      /* eslint-disable-next-line */
      if (props.required && (value === '' || value === null))
        return 'Este campo es requerido';
      return null;
    }}
    {...props}
    component={(field, form) => {
      const [isEditing, setIsEditing] = useState(false);
      const getInTouched = getIn(form.touched, field.name);
      const getInErrors = getIn(form.errors, field.name);
      return (
        <div style={props.style}>
          <div className={`btype shadow-sm ${className.includes('caution') ? 'caution' : ''}`}>
            {isEditing ? (
              <input
                type="number"
                {...props}
                value={field.value}
                onChange={evt => {
                  form.setFieldValue(props.name, evt.currentTarget.value);
                }}
                onBlur={() => { setIsEditing(false) }}
                className={`w-100 form-control form-control-sm ${className}`}
              />
            ) : (
                <input
                  type="text"
                  {...props}
                  value={field.value ? numberFormat(field.value) : ''}
                  onFocus={() => { setIsEditing(true) }}
                  readOnly
                  className={`w-100 form-control form-control-sm ${className}`}
                />)}
            {/* eslint-disable-next-line */}
            <label />
            <div className="font-14-rem">{label}</div>
          </div>
          {getInTouched && getInErrors && (
            <div className="invalid-feedback d-block m-0">{getInErrors}</div>
          )}
        </div>
      );
    }}
  />
);

NumberInput.propTypes = {
  name: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default NumberInput;