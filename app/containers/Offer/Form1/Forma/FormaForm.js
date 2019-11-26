/**
 *
 * Forma Form
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Modal, ModalFooter, ModalHeader, ModalBody } from 'components/Modal';

import FormaDePagoForm from 'containers/Phases/FormaDePago/Form';

function FormaForm({ form, onHide, isOpen }) {
  return (
    <>
      <Modal isOpen={isOpen} size="xl" scrollable>
        <ModalHeader>Editar Cuotas</ModalHeader>
        <ModalBody className="p-3">
          <FormaDePagoForm form={form} />
        </ModalBody>
        <ModalFooter>
          <Button className="ml-2" color="white" onClick={onHide}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

FormaForm.propTypes = {
  isOpen: PropTypes.bool,
  form: PropTypes.object,
  onHide: PropTypes.func,
};

export default FormaForm;
