import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import 'air-datepicker';
import 'air-datepicker/dist/js/i18n/datepicker.es';
import { Field as FormikField } from 'formik';
import moment from 'components/moment';
export const DatePickerInput = ({
  onSelect,
  value,
  values,
  name,
  className = '',
  isInvalid = false,
  range = false,
  ...props
}) => {
  useEffect(() => {
    const $el = $(`[name="${name}_date"]`);
    const datepicker = $el
      .datepicker({
        language: 'es',
        dateFormat: 'dd M. yyyy',
        autoClose: true,
        range,
        multipleDates: range,
        multipleDatesSeparator: ' - ',
        onSelect,
      })
      .data('datepicker');
    if (datepicker) {
      if (values && range) {
        datepicker.selectDate([new Date(values[0]), new Date(values[1])]);
      } else if (value) {
        datepicker.selectDate(new Date(value));
      }
    }
  }, [value]);
  /* eslint-disable */
  if (props.required && (value == '' || value === null))
    className += ' caution';
  /* eslint-enable */
  return (
    <div className={`btype shadow-sm ${className}`}>
      <input
        readOnly
        className={`form-control form-control-sm  ${
          isInvalid ? 'is-invalid' : ''
        }`}
        name={`${name}_date`}
        type="text"
        {...props}
      />
    </div>
  );
};

DatePickerInput.propTypes = {
  isInvalid: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  className: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  values: PropTypes.array,
  name: PropTypes.string,
  range: PropTypes.bool,
};

const DatePicker = ({ name, style, ...props }) => (
  <FormikField
    name={name}
    {...props}
    validate={value => {
      if (props.required && !value) return 'Este campo es requerido';
      return null;
    }}
  >
    {({ field, form, meta }) => {
      const isInvalid = meta.touched && meta.error;
      return (
        <div style={style}>
          <DatePickerInput
            name={name}
            {...props}
            isInvalid={isInvalid}
            onSelect={(fd, date) => {
              form.setFieldValue(name, moment(date).format());
            }}
            value={field.value}
          />
          {isInvalid && (
            <div className="invalid-feedback d-block m-0">{meta.error}</div>
          )}
        </div>
      );
    }}
  </FormikField>
);

DatePicker.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
};

export default DatePicker;
