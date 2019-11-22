/**
 *
 * Offer Doc Form
 *
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form as ExForm } from 'components/ExForm';
import reducer from './reducer';
import saga from './saga';
import makeSelectDocument from './selectors';
import {
  resetContainer,
  saveDocument,
  cancelOffer,
  reviewDocument,
} from './actions';
import Garantia from './Garantia';
import documents from './documents';
import CarpetaDigital from './CarpetaDigital';
import makeSelectInitProject from '../../../Project/Init/selectors';
export function OfferDocForm({ selectorProject, offer, selector, dispatch }) {
  useInjectReducer({ key: 'res_document', reducer });
  useInjectSaga({ key: 'res_document', saga });
  useEffect(() => () => dispatch(resetContainer()), []);
  const initialValues = documents.reduce(
    (acc, document) => {
      acc[document.documentoType] = null;
      return acc;
    },
    { Folio: offer.Folio, Comment: '', Condition: '' },
  );
  if (selector.success && selector.success === 'Cancel') {
    return (
      <Redirect
        to={`/proyectos/${selectorProject.project.ProyectoID}/reservas`}
      />
    );
  }
  return (
    <ExForm
      initialValues={initialValues}
      onSubmit={values => {
        const data = new FormData();
        Object.keys(values)
          .filter(type => values[type])
          .forEach(name => {
            data.append(name, values[name]);
          });
        dispatch(saveDocument(offer.OfertaID, data, values.Condition));
      }}
    >
      {form => (
        <>
          <Garantia offer={offer} />
          <CarpetaDigital
            form={form}
            selector={selector}
            offer={offer}
            onCancel={values => dispatch(cancelOffer(offer.OfertaID, values))}
            onControlReview={(Resolution, Comment) => {
              dispatch(
                reviewDocument({
                  OfertaID: offer.OfertaID,
                  Resolution,
                  Comment,
                }),
              );
            }}
          />
        </>
      )}
    </ExForm>
  );
}

OfferDocForm.propTypes = {
  selector: PropTypes.object,
  selectorProject: PropTypes.object,
  offer: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectDocument(),
  selectorProject: makeSelectInitProject(),
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

export default compose(withConnect)(OfferDocForm);
