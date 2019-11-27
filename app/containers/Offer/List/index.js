/**
 *
 * Offer
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Helmet } from 'react-helmet';
import InitData from 'containers/Common/InitData';
import makeSelectInitProject from 'containers/Project/Init/selectors';
import WithLoading from 'components/WithLoading';
import ProjectMeta from 'containers/Common/ProjectMeta/Loadable';
import PageHeader from 'containers/Common/PageHeader';
import makeSelectOffers from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchOffers, searchOffers } from './actions';
import List from './List';
import Filter from './Filter';
import { Auth } from '../../App/helpers';
import InList from './InList';

const SyncMessage = WithLoading();

export function Offers({ match, selectorProject, selector, dispatch }) {
  const { project } = selectorProject;
  useInjectReducer({ key: 'offers', reducer });
  useInjectSaga({ key: 'offers', saga });

  useEffect(() => {
    if (match.params.id) dispatch(fetchOffers(match.params.id));
  }, []);

  // header
  const header = ['Proyectos'];
  if (project.Name) header.push(project.Name);

  return (
    <>
      <InitData Project={{ ProyectoID: match.params.id }} />
      <Helmet title={`Ofertas - ${project.Name || '...'}`} />
      <PageHeader header={header} />
      {!Auth.isInmobiliario() && (
        <>
          <ProjectMeta action="view" project={project} active="offer" />
          {selector.loading && <SyncMessage {...selector} />}
          {!selector.loading && selector.offers && (
            <>
              <Filter
                project={project}
                selector={selector}
                searchOffers={(txtSearch, status) =>
                  dispatch(searchOffers(txtSearch, status))
                }
              />
              <List {...selector} project={project} dispatch={dispatch} />
            </>
          )}
        </>
      )}

      {Auth.isInmobiliario() && (
        <>
          {selector.loading && <SyncMessage {...selector} />}
          {!selector.loading && selector.offers && (
            <>
              <h4 className="color-regular mt-3">
                {`${project.Name} - ${project.Symbol}`}
              </h4>
              <h5 className="mb-3 font-18 d-flex align-items-center justify-content-between">
                <span className="line-height-1">Oferta</span>
              </h5>
              <InList {...selector} project={project} dispatch={dispatch} />
            </>
          )}
        </>
      )}
    </>
  );
}

Offers.propTypes = {
  match: PropTypes.object,
  selectorProject: PropTypes.object,
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectOffers(),
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

export default compose(withConnect)(Offers);
