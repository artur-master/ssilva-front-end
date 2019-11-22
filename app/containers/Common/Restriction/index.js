/**
 *
 * Restriction
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Modal, ModalBody, ModalFooter, ModalHeader } from 'components/Modal';
import Button from 'components/Button';
import { makeSelectPreload } from 'containers/App/selectors';
import WithLoading from 'components/WithLoading';
import makeSelectRestriction from './selectors';
import List from './List';
import RestrictionsForm from './Form';
import {
  deleteRestriction,
  resetContainer,
  saveRestriction,
  setRestriction,
} from './actions';
const SyncMessage = WithLoading();
export function Restriction({
  viewOnly = false,
  isOpen = false,
  selector,
  preload,
  onHide,
  dispatch,
}) {
  const { entities, loading, ...restSelector } = selector;
  useEffect(() => () => dispatch(resetContainer()), [isOpen]);
  return (
    <>
      <Modal
        isOpen={isOpen}
        size="xl"
        scrollable
        id="seleccion_restrictions_modal"
      >
        <ModalHeader>Restrictions</ModalHeader>
        <ModalBody className="p-3">
          <List
            viewOnly={viewOnly}
            entities={entities}
            editRestriction={values => dispatch(setRestriction(values))}
            deleteRestriction={values => dispatch(deleteRestriction(values))}
          />
          {!viewOnly && (
            <RestrictionsForm
              selector={selector}
              preload={preload}
              setRestriction={values => dispatch(setRestriction(values))}
              saveRestriction={() => dispatch(saveRestriction())}
            />
          )}
          <SyncMessage {...restSelector} />
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={loading}
            onClick={() => {
              dispatch(setRestriction(false));
              onHide();
            }}
            type="reset"
            color="white"
          >
            Volver
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

Restriction.propTypes = {
  viewOnly: PropTypes.bool,
  isOpen: PropTypes.bool,
  selector: PropTypes.object,
  preload: PropTypes.object,
  onHide: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectRestriction(),
  preload: makeSelectPreload(),
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

export default compose(withConnect)(Restriction);
