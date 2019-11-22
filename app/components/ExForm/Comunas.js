/**
 *
 * Comunas
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ExField from 'components/ExForm/ExField';
import { makeSelectPreload } from 'containers/App/selectors';

const Comunas = ({ preload, ...props }) => (
  <ExField type="select" {...props}>
    <option>Selecciona una Comuna...</option>
    {preload.local.map(local => (
      <optgroup key={local.RegionID} label={local.Name}>
        {local.provincias.map(provincia => (
          <React.Fragment key={provincia.ProvinciaID}>
            {provincia.comunas.map(comuna => (
              <option key={comuna.ComunaID} value={comuna.ComunaID}>
                {comuna.Name}
              </option>
            ))}
          </React.Fragment>
        ))}
      </optgroup>
    ))}
  </ExField>
);

Comunas.propTypes = {
  preload: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

const mapStateToProps = createStructuredSelector({
  preload: makeSelectPreload(),
});

const withConnect = connect(
  mapStateToProps,
  () => ({}),
);

export default compose(withConnect)(Comunas);
