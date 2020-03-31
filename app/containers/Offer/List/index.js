/**
 *
 * Offer
 *
 */

import React, { useEffect, useState } from 'react';
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
import { fetchOffers, searchOffers, queryOffers } from './actions';
import List from './List';
import Filter from './Filter';
import { Auth } from '../../App/helpers';
import InList from './InList';
import FiList from './FiList';
import {fetchAllPromesas} from '../helper'
import OfferGarantia from '../Form/FiForm/Garantia';

import { fetchPromesas } from 'containers/Promesa/List/actions';
import makeSelectPromesas from 'containers/Promesa/List/selectors';
import ProjectPhases from 'containers/Common/ProjectPhases';
const SyncMessage = WithLoading();

export function Offers({ match, selectorProject, selector, promesas, dispatch }) {
  
  const { project } = selectorProject;
  const [promesa, setPromesa] = useState({promesa:[]});
  useInjectReducer({ key: 'offers', reducer });
  useInjectSaga({ key: 'offers', saga });

  useEffect(() => {
    if (match.params.id && !selector.loading){
      dispatch(fetchOffers(match.params.id));
      fetchAllPromesas(match.params.id).then(res => setPromesa(res));
    }
  }, []);

  // header
  const header = ['Proyectos'];
  if (project.Name) header.push(project.Name);

  return (
    <>
      <InitData Project={{ ProyectoID: match.params.id }} />
      <Helmet title={`Ofertas - ${project.Name || '...'}`} />
      <PageHeader header={header} />
      {!(Auth.isInmobiliario() || Auth.isFinanza()) && (
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
              <List {...selector} project={project}
                onQuery={query => dispatch(queryOffers(query))}
                promesas={promesa} dispatch={dispatch}
              />
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
              <OfferGarantia />
              <h5 className="mb-3 font-18 d-flex align-items-center justify-content-between">
                <span className="line-height-1">Oferta</span>
              </h5>
            <ProjectPhases project={project} active="offer" />
            <Filter
                project={project}
                selector={selector}
                searchOffers={(txtSearch, status) =>
                  dispatch(searchOffers(txtSearch, status))
                }
              />
              <InList {...selector} project={project} dispatch={dispatch} />
            </>
          )}
        </>
      )}
      {Auth.isFinanza() && (
        <>
          {selector.loading && <SyncMessage {...selector} />}
          {!selector.loading && selector.offers && (
            <>
              <ProjectMeta action="view" project={project} active="offer" />
              <h4 className="color-regular mt-3">
                {`${project.Name} - ${project.Symbol}`}
              </h4>
              <OfferGarantia />
              <Filter
                project={project}
                selector={selector}
                searchOffers={(txtSearch, status) =>
                  dispatch(searchOffers(txtSearch, status))
                }
              />
              <FiList
                offers={selector.offers}
                project={project}
                query={selector.query}
                onQuery={query => dispatch(queryOffers(query))}
                dispatch={dispatch}
              />
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
  promesas: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selector: makeSelectOffers(),
  selectorProject: makeSelectInitProject(),
  promesas: makeSelectPromesas(),
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
