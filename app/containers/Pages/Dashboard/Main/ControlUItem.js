/**
 *
 * Dashboard Control User Item
 *
 */

import React from 'react';

export function ControlUItem() {

  return (
    <tr className="align-middle-group no-whitespace">
      <td className="pl-3">
        <span className="font-14-rem color-regular">Boyd Hicks</span>
      </td>
      <td className="pl-3">
        <span className="font-14-rem color-regular">Jefe de Proyectos</span>
      </td>
      <td className="pl-3">
        <span className="font-14-rem color-regular">7</span>
      </td>
      <td className="pl-3">
        <span className="font-14-rem color-regular">8</span>
      </td>
      <td className="pl-3">
        <span className="font-14-rem color-regular">1.1</span>
      </td>
      <td className="px-3">
        <div className="dropdown dropleft text-right">
          <a className="icon icon-dots color-main font-21" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"></a>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <a className="dropdown-item" href="#">Ver detalles</a>
          </div>
        </div>
      </td>
    </tr>
  );
}

// MainContent.propTypes = {
//   selector: PropTypes.object,
//   dispatch: PropTypes.func.isRequired,
// };

export default ControlUItem;
