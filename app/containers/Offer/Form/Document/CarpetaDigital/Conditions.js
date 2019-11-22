/**
 *
 * Offer Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

function CarpetaDigitalCondition({ conditions }) {
  return (
    <>
      {conditions.map(condition => (
        <div className="px-3" key={condition.ConditionID}>
          <div className="background-color-warning mt-2 px-2 font-18 rounded-lg">
            <table className="table table-responsive-md table-borderless">
              <tbody>
                <tr>
                  <td>
                    <i className="icon icon-alert color-warning-icon" />
                  </td>
                  <td className="w-100">
                    <span className="font-14-rem">
                      <b>{condition.Description}</b>
                    </span>
                  </td>
                  <td>
                    <button type="button" className="close" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
}

CarpetaDigitalCondition.propTypes = {
  conditions: PropTypes.array,
};

export default CarpetaDigitalCondition;
