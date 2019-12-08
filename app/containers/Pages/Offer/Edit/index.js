/**
 *
 * Create Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Ban from 'components/Ban';
import { Auth } from 'containers/App/helpers';
import OfferEditForm from 'containers/Offer/Edit';

export function EditOfferPage({ match, location }) {
  if (
    !Auth.hasOneOfPermissions([
      'Es vendedor',
      'Es asistente comercial',
      'Consulta proyectos',
    ])
  )
    return <Ban />;
  return <OfferEditForm match={match} location={location} />;
}

EditOfferPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
};

export default EditOfferPage;
