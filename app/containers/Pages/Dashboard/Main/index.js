/**
 *
 * Dashboard 
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Empty from 'components/Empty';
import { ProjectMeta } from 'containers/Common/ProjectMeta';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import ControlUItem from './ControlUItem';
import TimeLog from './TimeLog';
import Thead from 'components/Table/Thead';
import DoGlobal from './DoGlobal';

export function MainContent( {selector, dispatch }) {
  // const { entities = [] } = selector;
  // const projects = entities.filter(entity => UserProject.in(entity));
  // if (projects.length < 1) return <Empty tag="h2" />;

  return (
    <div className="row">
      <div className="mt-4 col-md-8">
        <h3 className="font-21 color-regular">Control de Usuarios</h3>
        <Box>
          <table className="table table-responsive-sm table-fixed table-sm m-0 border-bottom">
            <Thead
              ths={[
                { field: 'UserID', label: 'Nombre', sortable: true },
                { field: 'Role', label: 'Rol', className: "pl-3", sortable: true },
                { field: 'Earring', label: 'Pendientes', sortable: true },
                { field: 'Overdue', label: 'Días atraso', sortable: true },
                { field: 'Average', label: 'Atraso promedio', className: "text-center", sortable: true },
                { field: '', label: '' },
              ]}
            // onQuery={onQuery}
            // query={query}
            />
            <tbody>
              <ControlUItem />
              <ControlUItem />
            </tbody>
          </table>
          <div className="p-3 d-flex justify-content-end">
            <a href="#" className="font-14-rem m-btn m-btn-white d-block">Ver Todo</a>
          </div>
        </Box>
        <ProjectMeta />
        <DoGlobal counter={selector.Counter} />
      </div>
      <TimeLog Logs={selector.Logs} />
    </div>
  );
}

MainContent.propTypes = {
  selector: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default MainContent;
