/**
 *
 * ClientList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import {
  Table,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
} from 'reactstrap';
import Thead from 'components/Table/Thead';
import { Auth } from 'containers/App/helpers';
import { PERMISSIONS } from 'containers/App/constants';

const List = ({
  canEdit = true,
  selector,
  onQuery,
  onCreate,
  onEdit,
  onView,
  onSelect,
}) => {
  const { clients, query = {} } = selector;
  const canManage =
    Auth.hasOneOfPermissions([PERMISSIONS[17], PERMISSIONS[18]]) && canEdit;
  const { selected = [] } = query;
  const ths = [
    { field: 'Name', label: 'Nombres', sortable: true },
    { field: 'Rut', label: 'RUT', sortable: true },
    { field: 'Comuna', label: 'Comuna', sortable: true },
    {},
  ];
  if (onSelect) {
    ths.push({});
  }
  return (
    <div>
      <div className="d-flex align-items-end justify-content-between after-expands-2">
        <h4 className="font-21 color-regular mt-3 order-1">Clientes</h4>
        <div
          className="search-filter icon icon-search order-3"
          style={{ maxWidth: 200 }}
        >
          <Input
            className="form-control form-control-sm"
            type="text"
            onChange={evt => onQuery({ textSearch: evt.currentTarget.value })}
            placeholder="Escribe lo que deseas buscar..."
          />
        </div>
        {canManage && (
          <Button className="m-btn-plus order-3 mr-3" onClick={onCreate}>
            Agregar cliente
          </Button>
        )}
      </div>
      <div className="mt-3 table-responsive-md background-color-white rounded shadow-sm py-3">
        <Table size="sm" className="m-0">
          <Thead onQuery={onQuery} query={query} ths={ths} />
          <tbody>
            {clients &&
              clients.map(client => (
                <tr
                  key={client.UserID}
                  className="align-middle-group border-bottom"
                >
                  <td className="pl-3 no-whitespace">
                    <span className="font-14-rem">
                      <b>{`${client.Name} ${client.LastNames}`}</b>
                    </span>
                  </td>
                  <td className="no-whitespace">
                    <span className="font-14-rem">{client.Rut}</span>
                  </td>
                  <td className="no-whitespace">
                    <span className="font-14-rem">
                      {client.Comuna && client.Comuna.Name}
                    </span>
                  </td>
                  <td className="no-whitespace text-right pr-3">
                    <UncontrolledDropdown>
                      <DropdownToggle
                        tag="a"
                        className="icon icon-dots main_color ml-1"
                      />
                      <DropdownMenu right>
                        <DropdownItem tag="a" onClick={() => onView(client)}>
                          Ver datos
                        </DropdownItem>
                        {canManage && (
                          <DropdownItem tag="a" onClick={() => onEdit(client)}>
                            Editar
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                  {onSelect && (
                    <td className="no-whitespace text-right" width="1%">
                      {selected.includes(client.UserID) && 'Seleccionada'}
                      {!selected.includes(client.UserID) && (
                        <Button size="sm" onClick={() => onSelect(client)}>
                          Selecciona
                        </Button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

List.propTypes = {
  canEdit: PropTypes.bool,
  selector: PropTypes.object,
  onQuery: PropTypes.func,
  onCreate: PropTypes.func,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
  onSelect: PropTypes.func,
};

export default List;
