/**
 *
 * ExAseguradoras
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { getIn } from 'formik';
import Element from 'containers/Common/Aseguradora/Element';
import ExField from './ExField';

const ExAseguradoras = props => {
  const { style = {} } = props;
  let className = props.className || '';

  return (
    <ExField
      {...props}
      component={(field, form) => {
        if (props.required && !field.value) className += 'caution';

        const getInTouched = getIn(form.touched, field.name);
        const getInErrors = getIn(form.errors, field.name);
        return (
          <div
            style={{
              width: style.width || '11.65em',
            }}
          >
            <Element
              value={field.value}
              onSelect={user =>
                form ? form.setFieldValue(field.name, user.AseguradoraID) : ''
              }
              {...props}
              className={className}
              isInvalid={!!(getInTouched && getInErrors)}
            />
            {getInTouched && getInErrors && (
              <div className="invalid-feedback d-block m-0">{getInErrors}</div>
            )}
          </div>
        );
      }}
    />
  );
};

ExAseguradoras.propTypes = {
  className: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.object,
};

export default ExAseguradoras;
