/**
 *
 * Create Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Ban from 'components/Ban';
import { Auth } from 'containers/App/helpers';
import QuotationForm from 'containers/Quotation/Form/Loadable';

export function QuotationPage({ match }) {
  if (!Auth.hasOneOfPermissions(['Es vendedor', 'Es asistente comercial']))
    return <Ban />;
  return <QuotationForm match={match} />;
}

QuotationPage.propTypes = {
  match: PropTypes.object,
};

export default QuotationPage;
