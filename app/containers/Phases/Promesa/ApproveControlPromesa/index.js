/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
import { getFileName } from 'containers/App/helpers';
import { Form as ExForm } from 'components/ExForm';
import Conditions from 'containers/Phases/Conditions';

const SyncMassage = WithLoading();

export function PhaseApproveControlPromesa({ selector, entity, onSubmit }) {
  const initialValues = {
    Condition: entity.Condition || [],
    openComment: false,
    Comment: '',
    Resolution: '',
  };
  return (
    <ExForm initialValues={initialValues} onSubmit={onSubmit}>
      {form => (
        <>
          <Box>
            <BoxHeader>
              <b>PROMESA</b>
            </BoxHeader>
            <BoxContent>
              <div className="d-flex align-items-center">
                <span className="font-14-rem mr-3">Promesa</span>
                <span className="font-14-rem mx-2">
                  {getFileName(entity.DocumentFirmaComprador)}
                </span>
                <Link
                  to={entity.DocumentFirmaComprador}
                  target="_blank"
                  download
                  className="font-14-rem mx-2 btn-arrow"
                >
                  <b>Ver Promesa</b>
                </Link>
              </div>
            </BoxContent>
            <BoxFooter>
              <div className="d-flex justify-content-end">
                <Button
                  disabled={selector.loading}
                  onClick={() => {
                    form.setFieldValue('Resolution', true);
                    form.submitForm();
                  }}
                >
                  Firmar
                </Button>
                <Button
                  disabled={selector.loading}
                  className="m-btn-white m-btn-plus"
                  onClick={() => {
                    const { Condition = [] } = form.values;
                    if (
                      Condition.length < 1 ||
                      Condition[Condition.length - 1].Description.trim() !== ''
                    ) {
                      Condition.push({ Description: '' });
                      form.setValues({
                        Condition,
                        openComment: false,
                        Comment: form.values.Comment,
                      });
                    } else {
                      form.setFieldValue('openComment', false);
                    }
                  }}
                >
                  Agregar Observación
                </Button>
                <Button
                  disabled={selector.loading}
                  color="white"
                  onClick={() => form.setFieldValue('openComment', true)}
                >
                  Recharza Promesa
                </Button>
              </div>
              {form.values.Condition.length > 0 && !form.values.openComment && (
                <div className="p-0">
                  <Conditions form={form} />
                  <div className="py-3 text-right">
                    <Button
                      className="m-btn"
                      type="submit"
                      onClick={() => {
                        form.setFieldValue('Resolution', true);
                        form.submitForm();
                      }}
                      disabled={selector.loading}
                    >
                      Envia a JP
                    </Button>
                  </div>
                </div>
              )}
              {form.values.openComment && (
                <div className="py-3 ">
                  <span className="d-block text-left font-14-rem">
                    <b>Comentarios (En caso de Rechazo)</b>
                  </span>
                  <div className="py-3 ">
                    <textarea
                      className="w-100 d-block rounded-lg shadow-sm"
                      rows="5"
                      value={form.values.Comment}
                      onChange={evt =>
                        form.setFieldValue(
                          'Comment',
                          evt.currentTarget.value.trim(),
                        )
                      }
                    />
                  </div>
                  <Button
                    disabled={selector.loading}
                    onClick={() => {
                      form.setFieldValue('Resolution', false);
                      form.submitForm();
                    }}
                  >
                    Recharza Promesa
                  </Button>
                </div>
              )}
            </BoxFooter>
          </Box>
          <div className="py-3">
            <SyncMassage {...selector} />
          </div>
        </>
      )}
    </ExForm>
  );
}

PhaseApproveControlPromesa.propTypes = {
  entity: PropTypes.object,
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default PhaseApproveControlPromesa;
