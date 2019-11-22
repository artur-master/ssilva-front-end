/**
 *
 * UserElement
 *
 */

import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'components/Modal';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from 'components/Button';
import makeSelectUser from './selectors';
import MainContainer from './index';
import { userFullname } from './helper';

const Element = ({
  query = {},
  component,
  selector,
  value,
  style = {},
  className = '',
  isInvalid = false,
  onSelect,
  openModal = false,
  disable = false,
}) => {
  const [isOpen, setIsOpen] = useState(openModal);
  const defaultComponent = () => {
    let text = 'Selecciona...';
    if (!selector.origin_users && selector.loading) text = <i>Cargando ...</i>;
    if (value) {
      const user = (selector.origin_users || []).find(
        u => u.UserID === value.UserID || u.UserID === value,
      );
      if (user) text = userFullname(user);
    }

    return (
      <div
        role="presentation"
        style={{ height: 31, ...style }}
        className={`btype shadow-sm icon icon-select-arrows right-icon ${className}`}
        onClick={() => (!disable ? setIsOpen(true) : null)}
      >
        <div
          className={`form-control form-control-sm ${
            isInvalid ? 'is-invalid' : ''
          }`}
          title={text}
        >
          {text}
        </div>
      </div>
    );
  };
  return (
    <>
      <Modal isOpen={isOpen} size="xl" scrollable>
        <ModalHeader>Seleccionar usuario</ModalHeader>
        <ModalBody>
          <div className="px-3">
            <MainContainer
              query={query}
              onSelect={user => {
                setIsOpen(false);
                onSelect(user);
              }}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="white" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      {component && component({ openUserElement: setIsOpen })}
      {!component && defaultComponent(selector)}
    </>
  );
};

Element.propTypes = {
  query: PropTypes.object,
  openModal: PropTypes.bool,
  selector: PropTypes.object,
  value: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  isInvalid: PropTypes.bool,
  disable: PropTypes.bool,
  component: PropTypes.func,
  onSelect: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
  selector: makeSelectUser(),
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

export default compose(
  withConnect,
  memo,
)(Element);
