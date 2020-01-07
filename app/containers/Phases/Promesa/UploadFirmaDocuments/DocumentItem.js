/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 *
 * Project
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Field as FormikField, getIn } from 'formik';
import { getFileName } from 'containers/App/helpers';
import { FormGroup, Label } from 'components/ExForm';

function DocumentItem({ name, label, canUpload }) {
  return (
    <FormikField
      name={name}
      validate={value => {
        if (!value) return 'Este campo es requerido';
        return null;
      }}
    >
      {({ field, form: { touched, errors, setFieldValue } }) => {
        const getInTouched = getIn(touched, field.name);
        const getInErrors = getIn(errors, field.name);
        const { value } = field;

        if (!value || value.name) {
          return (
            <FormGroup>
              <Label style={{ width: '6em' }}>{label}</Label>
              <div
                className="custom-file custom-input-file order-3"
                style={{ height: 'auto' }}
                title="Examinar..."
              >
                <input
                  name={field.name}
                  className={
                    getInTouched && getInErrors
                      ? 'is-invalid custom-file-input'
                      : 'custom-file-input'
                  }
                  disabled={!canUpload}
                  onChange={event => {
                    setFieldValue(field.name, event.target.files[0]);
                  }}
                  type="file"
                />
                <label
                  className="custom-file-label font-14-rem shadow-sm text-nowrap overflow-hidden"
                  style={{ textOverflow: 'ellipsis' }}
                >
                  <b>
                    {!value && 'Examinar...'}
                    {value && !value.name && value}
                    {value && value.name}
                  </b>
                </label>
                {getInTouched && getInErrors && (
                  <div className="invalid-feedback d-block m-0">
                    {getInErrors}
                  </div>
                )}
              </div>
            </FormGroup>
          );
        }
        return (
          <FormGroup>
            <Label style={{ width: '6em' }}>{label}</Label>
            <span className="font-14-rem mx-2">{getFileName(value)}</span>
            <Link
              to={value}
              target="_blank"
              download
              className="font-14-rem mx-2 btn-arrow"
            >
              <b>Ver Promesa</b>
            </Link>
            {canUpload && (
              <button
                type="button"
                className="close mb-1"
                onClick={() => setFieldValue(field.name, null)}
              >
                <span aria-hidden="true">×</span>
              </button>
            )}
          </FormGroup>
        );
      }}
    </FormikField>
  );
}

DocumentItem.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  canUpload: PropTypes.bool,
};

export default DocumentItem;
