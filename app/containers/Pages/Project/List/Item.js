/* eslint-disable jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid */
/**
 *
 * ProjectItem
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import ProgressBar from 'components/ProgressBar';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';

import { fetchProjectMeta } from 'containers/Common/ProjectMeta/helper';

const Item = ({ project, dispatch }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { ProyectoID } = project;
  const [metas, setMetas] = useState({
    promesas: 0,
    firmadoPromesas: 0,
    totalPrice: 0, 
    firmadoPrice: 0
  });  

  useEffect(() => {
    fetchProjectMeta(ProyectoID).then(res => setMetas(res));
  }, []);

  return (
    <article className="proyect-item-box col-sm-6 col-xl-4 px-2">
      <div className="box shadow-sm">
        <h4 className="d-flex align-items-center justify-content-between">
          <span
            role="presentation"
            className="pointer"
            onClick={() =>
              dispatch(push(`/proyectos/${project.ProyectoID}/cotizaciones`))
            }
          >
            {project.Symbol} - {project.Name}
          </span>
          <Dropdown
            isOpen={dropdownOpen}
            toggle={() => setDropdownOpen(!dropdownOpen)}
          >
            <DropdownToggle
              tag="a"
              className="icon icon-dots main_color ml-1"
            />
            <DropdownMenu right positionFixed>
              <DropdownItem
                tag="a"
                onClick={() => {
                  dispatch(push(`/proyectos/${project.ProyectoID}`));
                }}
              >
                Ver Info proyecto
              </DropdownItem>
              <DropdownItem
                tag="a"
                onClick={() =>
                  dispatch(push(`/proyectos/${project.ProyectoID}/editar`))
                }
              >
                Editar Proyecto
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </h4>
        <div className="content">
          <span className="statement">Metas proyecto</span>
          <div className="graphics">
            <div className="row">
              <span className="title col-5">
                UF <b>{metas.firmadoPrice}</b>
              </span>
              <div className="col-7">
                <ProgressBar
                  title="de"
                  percent={metas.totalPrice ? 100*metas.firmadoPrice/metas.totalPrice : 0}
                  label={
                    <>
                      UF <b>{metas.totalPrice}</b>
                    </>
                  }
                />
              </div>
            </div>
            <div className="row">
              <span className="title col-5">
                Promesas <b>{metas.firmadoPromesas}</b>
              </span>
              <div className="col-7">
                <ProgressBar
                  title="de"
                  percent={metas.promesas ? 100*metas.firmadoPromesas/metas.promesas : 0}
                  label={
                    <>
                      <b>{metas.promesas}</b>
                    </>
                  }
                />
              </div>
            </div>
          </div>
          <ul className="proyect-links">
            <li className="row justify-content-between">
              <span className="col-auto">Reservas</span>
              <Link
                to={`/proyectos/${project.ProyectoID}/reservas`}
                className="col-auto icon icon-arrow-complete icon-right"
              >
                Ver reservas
              </Link>
            </li>
            <li className="row justify-content-between">
              <span className="col-auto">Ofertas</span>
              <Link
                to={`/proyectos/${project.ProyectoID}/ofertas`}
                className="col-auto icon icon-arrow-complete icon-right"
              >
                Ver ofertas
              </Link>
            </li>
            <li className="row justify-content-between">
              <span className="col-auto">Promesas</span>
              <Link
                to={`/proyectos/${project.ProyectoID}/promesas`}
                className="col-auto icon icon-arrow-complete icon-right"
              >
                Ver promesas
              </Link>
            </li>
            <li className="row justify-content-between">
              <span className="col-auto">Escrituración</span>
              <Link
                to={`/proyectos/${project.ProyectoID}/escrituras`}
                className="col-auto icon icon-arrow-complete icon-right"
              >
                Ver escrituración
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
};

Item.propTypes = {
  project: PropTypes.object,
  dispatch: PropTypes.func,
};

export default Item;
