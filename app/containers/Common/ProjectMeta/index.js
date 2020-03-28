/**
 *
 * ProjectMeta
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';

import ProjectPhases from 'containers/Common/ProjectPhases';
import { Auth } from 'containers/App/helpers';
import { fetchReservations } from 'containers/Reservation/List/actions';
import { fetchPromesas } from 'containers/Promesa/List/actions';
import reservationReducer from 'containers/Reservation/List/reducer';
import reservationSaga from 'containers/Reservation/List/saga';
import reducer from 'containers/Promesa/List/reducer';
import saga from 'containers/Promesa/List/saga';
import makeSelectReservations from 'containers/Reservation/List/selectors';
import makeSelectPromesas from 'containers/Promesa/List/selectors';
import { Calculate_Meta } from './helper';
import { numberFormat } from 'containers/App/helpers';

export function ProjectMeta({ project = {}, dispatch, promesas, reservations, selector, active }) {
  if (Auth.isInmobiliario()) return null;

  useInjectReducer({ key: 'reservations', reducer: reservationReducer});
  useInjectSaga({ key: 'reservations', saga: reservationSaga});
  const { ProyectoID } = project;
  useEffect(() => {
    if (ProyectoID && !reservations.loading){
      dispatch(fetchReservations(ProyectoID));
    }
  }, [dispatch, ProyectoID]);

  useInjectReducer({ key: 'promesas', reducer });
  useInjectSaga({ key: 'promesas', saga });
  useEffect(() => {
    if(project.ProyectoID && !promesas.loading){
      dispatch(fetchPromesas(project.ProyectoID));
    }
  }, [dispatch, ProyectoID])

  const reserva_meta = 
    reservations.reservations ?
      Calculate_Meta(
        reservations.reservations.filter(
          reserva=> reserva.ReservaState==="Oferta"
        )
      ): '';

  const promesa_meta = 
    promesas.promesas ?
      Calculate_Meta(
        promesas.promesas.filter(
          promesas=> promesas.PromesaState==="Escritura"
        )      
      ): '';

  return (
    <>
      <div className="heading row justify-content-between">
        <h2 className="title-01 col-auto">Metas {project.Name}</h2>
      </div>

      <div className="mt-3">
        <ul className="dash-card-container">
          <div className="row">
            <article className="dash-card col-lg-6 col-12">
              <div className="box">
                <span className="sub-title">Llevamos</span>
                <span className="title">
                  UF <b>{numberFormat(reserva_meta.sum)}</b>
                </span>
                <figure className="progress-card green">
                  <progress className="" value={reserva_meta.valpro} max="100" />
                  <span className="key">Meta</span>
                  <span className="value">
                    UF <b>{numberFormat(reserva_meta.total)}</b>
                  </span>
                </figure>
              </div>
            </article>
            <article className="dash-card col-lg-6 col-12">
              <div className="box">
                <span className="sub-title">Llevamos</span>
                <span className="title">
                  Promesas <b>{numberFormat(promesa_meta.sum)}</b>
                </span>
                <figure className="progress-card yellow">
                  <progress className="" value={promesa_meta.valpro} max="100" />
                  <span className="key">Meta</span>
                  <span className="value">
                    <b>{numberFormat(promesa_meta.total)}</b>
                  </span>
                </figure>
              </div>
            </article>
          </div>
        </ul>
      </div>

      <ProjectPhases project={project} active={active} />
    </>
  );
}

ProjectMeta.propTypes = {
  active: PropTypes.string,
  project: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  reservations: PropTypes.object,
  promesas: PropTypes.object,
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  reservations: makeSelectReservations(),
  promesas: makeSelectPromesas(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
export default compose(withConnect)(ProjectMeta);
