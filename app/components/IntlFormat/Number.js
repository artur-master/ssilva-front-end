import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';

const IntlFormatNumber = props => (
  <span>
    {!props.value && '-'}
    {props.value && (
      <>
        {props.prefix || ' '}
        <FormattedNumber {...props} />
      </>
    )}
  </span>
);

IntlFormatNumber.propTypes = {
  value: PropTypes.number,
  prefix: PropTypes.string,
};

export default IntlFormatNumber;
