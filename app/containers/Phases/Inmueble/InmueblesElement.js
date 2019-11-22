import React from 'react';
import { FormattedNumber } from 'react-intl';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import ExField from 'components/ExForm/ExField';
import { inmuebleLabel } from 'containers/Common/Inmueble/helper';

const InmueblesElement = ({ values, onSelect }) => {
  const handleRemove = inmueble => {
    const required = (inmueble.Restrictions || []).reduce((acc, item) => {
      if (item.InmuebleInmuebleType === 'Required') acc.push(item.InmuebleBID);
      return acc;
    }, []);
    onSelect(
      values.Inmuebles.filter(
        item =>
          item.InmuebleID !== inmueble.InmuebleID &&
          !required.includes(item.InmuebleID),
      ),
    );
  };
  return (
    <FieldArray
      name="Inmuebles"
      // eslint-disable-next-line no-unused-vars
      render={({ remove, replace }) => (
        <>
          {values.Inmuebles &&
            values.Inmuebles.map((inmueble, index) => (
              <tr className="align-middle-group" key={inmueble.InmuebleID}>
                <td className="expand">
                  <div className="background-color-tab border p-3 position-relative">
                    <h5 className="d-block font-16 main_color">
                      <b>{inmuebleLabel(inmueble)}</b>
                    </h5>
                    <div className="d-flex align-items-center justify-content-between mt-1">
                      <span className="">
                        <b>Descuentos</b>
                      </span>
                      <div className="search-filter shadow-sm mx-2">
                        <ExField
                          className="flex-fill"
                          name={`Inmuebles.${index}.Discount`}
                          type="number"
                          min={0}
                          max={inmueble.MaximunDiscount || 100}
                          style={{ width: '11.5em' }}
                          onChange={evt => {
                            const maxDiscount = inmueble.MaximunDiscount || 100;
                            let percent = evt.currentTarget.value;
                            if (
                              parseFloat(evt.currentTarget.value) > maxDiscount
                            )
                              percent = maxDiscount;
                            if (
                              parseFloat(evt.currentTarget.value) < 0 ||
                              Number.isNaN(evt.currentTarget.value)
                            )
                              percent = 0;

                            replace(index, {
                              ...inmueble,
                              Discount: percent,
                            });
                          }}
                        />
                      </div>
                      <span className="italic-gray">
                        Límite {inmueble.MaximunDiscount || 100}%
                      </span>
                    </div>
                    {!inmueble.isRequiredRestriction && (
                      <button
                        type="button"
                        className="close close-absolute"
                        aria-label="Close"
                        onClick={() => handleRemove(inmueble)}
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    )}
                  </div>
                </td>
                <td className="sub-table">
                  <dl>
                    <dt>
                      <b>Valor UF</b>
                    </dt>
                    <dd>
                      <b name={`Inmuebles.${index}.Price`}>
                        <FormattedNumber value={inmueble.Price} />
                      </b>
                    </dd>
                    <dt>Descuentos UF</dt>
                    <dd>
                      {inmueble.Discount > 0 && <b>-</b>}
                      <b name={`Inmuebles.${index}.DiscountValue`}>
                        <FormattedNumber
                          value={(inmueble.Discount / 100) * inmueble.Price}
                        />
                      </b>
                    </dd>
                  </dl>
                </td>
              </tr>
            ))}
        </>
      )}
    />
  );
};

InmueblesElement.propTypes = {
  values: PropTypes.object,
  onSelect: PropTypes.func,
};
export default InmueblesElement;
