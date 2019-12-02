/**
 *
 * Credit
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import WithLoading from 'components/WithLoading';
import makeSelectCredit from './selectors';
import reducer from './reducer';
import saga from './saga';
import CreditForm from './Form';
import {
  fetchIF,
  registerIF,
  registerSelectIF,
  resetContainer,
} from './actions';
import CreditView from './View';
const SyncMessage = WithLoading();
export function PhaseCredit({ canEdit, EntityID, selector, dispatch }) {
  useInjectReducer({ key: 'credit', reducer });
  useInjectSaga({ key: 'credit', saga });

  useEffect(() => {
    dispatch(fetchIF(EntityID));
    return () => dispatch(resetContainer());
  }, [EntityID]);
  if (selector.redirect === 'refresh') return <Redirect to={window.location} />;
  if (!selector.entities) return <SyncMessage {...selector} />;
  if (canEdit)
    return (
      <CreditForm
        selector={selector}
        onCancel={() =>
          dispatch(push(`/proyectos/${window.project.ProyectoID}/ofertas`))
        }
        onSubmit={values =>
          dispatch(
            registerIF(
              values.Credits.map(credit => ({
                ...credit,
                OfertaID: EntityID,
              })),
            ),
          )
        }
        onSelect={entity =>
          dispatch(registerSelectIF({ ...entity, OfertaID: EntityID }))
        }
      />
    );
  return (
    <CreditView
      entity={selector.entities.find(item => item.Result === 'Aprobada')}
    />
  );
}

PhaseCredit.propTypes = {
  canEdit: PropTypes.bool,
  EntityID: PropTypes.string,
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectCredit(),
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

export default compose(withConnect)(PhaseCredit);
