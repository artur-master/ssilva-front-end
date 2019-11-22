/**
 *
 * Create Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Ban from 'components/Ban';
import { Auth } from 'containers/App/helpers';
import OfferForm from 'containers/Offer/Form';

export function EditOfferPage({ match, location }) {
  if (!Auth.hasOneOfPermissions(['Es vendedor', 'Es asistente comercial']))
    return <Ban />;
  return <OfferForm match={match} location={location} />;
}

EditOfferPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
};

export default EditOfferPage;
