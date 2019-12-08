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
import { Helmet } from 'react-helmet';
import InitData from 'containers/Common/InitData';
import PageHeader from 'containers/Common/PageHeader';

export function OfferPage({ match, location }) {
  const { project = {} } = window;
  return (
    <>
      <Helmet title={`Oferta - ${project.Name || '...'}`} />
      <PageHeader header={['Proyectos', project.Name || '...']} />
      <InitData
        Project={{ ProyectoID: match.params.id }}
        Inmueble={{ ProyectoID: match.params.id }}
        InstitucionFinanciera
      />
      <OfferForm match={match} location={location} />
    </>
  );
}

OfferPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
};

export default OfferPage;
