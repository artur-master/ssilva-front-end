/**
 *
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FACTURA_STATE } from 'containers/App/constants';
import WithLoading from 'components/WithLoading';
import makeSelectFactura from './selectors';
import { paidFactura, resumeFactura } from './actions';

const SyncMessage = WithLoading();

function FacturaButton({ factura, selector, dispatch }) {
  return (
    <>
      <div className="order-3">
        <SyncMessage
          error={selector.error[factura.FacturaID]}
          success={selector.success[factura.FacturaID]}
        />
      </div>
      <Button
        className="order-3 m-btn-white m-btn-download"
        disabled={selector.loading[factura.FacturaID]}
        onClick={() => dispatch(resumeFactura(factura))}
      >
        Resumen Facturación
      </Button>
      {factura.FacturaState === FACTURA_STATE[0] &&
        (!selector.success[factura.FacturaID] && (
          <Button
            className="order-3"
            disabled={selector.loading[factura.FacturaID]}
            onClick={() => dispatch(paidFactura(factura))}
          >
            Facturación
          </Button>
        ))}
      {(factura.FacturaState === FACTURA_STATE[1] ||
        selector.success[factura.FacturaID]) && (
        <Button className="order-3" disabled>
          Pagada
        </Button>
      )}
    </>
  );
}

FacturaButton.propTypes = {
  factura: PropTypes.object,
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectFactura(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FacturaButton);
