import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

const IntlFormatCurrency = props => {
  const intl = useIntl();
  const {
    className = '',
    style = {},
    value,
    currency = 'USD',
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
    currencyDisplay = 'symbol',
    ...rest
  } = props;
  if (value !== undefined)
    return (
      <span className={className} style={style}>
        {intl.formatNumber(value, {
          style: 'currency',
          currency,
          minimumFractionDigits,
          maximumFractionDigits,
          currencyDisplay,
          ...rest,
        })}
      </span>
    );

  return '-';
};

IntlFormatCurrency.propTypes = {
  value: PropTypes.number,
  prefix: PropTypes.string,
};

export default IntlFormatCurrency;
