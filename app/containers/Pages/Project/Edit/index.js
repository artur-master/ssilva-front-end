/**
 *
 * Create Project
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Project from 'containers/Project';

export function EditProjectPage({ match, location }) {
  const user = parseInt(queryString.parse(location.search).user);
  return <Project action="edit" match={match} user={user} />;
}

EditProjectPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(EditProjectPage);
