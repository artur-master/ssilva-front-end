/**
 *
 * Project
 *
 */
import React from 'react';

import PropTypes from 'prop-types';
import { List, Item } from 'components/List';
import { getFileName } from 'containers/App/helpers';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

export function Promise({ entity }) {
  const { project = {} } = window;
  const { Documentos = {} } = project;
  let maquetaWord;
  let maquetaPdf;
  if (entity.Cliente.IsCompany) {
    maquetaWord = Documentos.company_word;
    maquetaPdf = Documentos.company_pdf;
  } else if (entity.PayType === 'Contado') {
    maquetaWord = Documentos.counter_word;
    maquetaPdf = Documentos.counter_pdf;
  } else {
    maquetaWord = Documentos.credit_word;
    maquetaPdf = Documentos.credit_pdf;
  }
  return (
    <List>
      <Item>
        <div className="color-regular order-1" style={{ width: '22em' }}>
          <b>Maqueta Promesa Word</b>
        </div>
        <span className="font-14-rem order-3 mr-3">
          <em>{getFileName(maquetaWord.url)}</em>
        </span>
        <UncontrolledDropdown className="order-3">
          <DropdownToggle
            tag="a"
            className="icon icon-dots color-main font-21"
          />
          <DropdownMenu right>
            <DropdownItem tag="a" target="_blank" href={maquetaWord.url}>
              Ver documento
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Item>
      <Item className="border-top">
        <div className="color-regular order-1" style={{ width: '22em' }}>
          <b>Maqueta Promesa Pdf</b>
        </div>
        <span className="order-1 italic-gray">Firmado</span>
        <span className="font-14-rem order-3 mr-3">
          <em>{getFileName(maquetaPdf.url)}</em>
        </span>
        <UncontrolledDropdown className="order-3">
          <DropdownToggle
            tag="a"
            className="icon icon-dots color-main font-21"
          />
          <DropdownMenu right>
            <DropdownItem tag="a" target="_blank" href={maquetaPdf.url}>
              Ver documento
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Item>
    </List>
  );
}

Promise.propTypes = {
  entity: PropTypes.object,
};

export default Promise;
