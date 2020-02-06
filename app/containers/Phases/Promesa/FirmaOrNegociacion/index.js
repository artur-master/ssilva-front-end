/**
 *
 * Reservation Upload Form
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader, BoxFooter } from 'components/Box';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
import { getFileName } from 'containers/App/helpers';
import { Form as ExForm } from 'components/ExForm';
import { PROMESA_STATE } from 'containers/App/constants';
import PromesaObservationForm from '../Observation/Form';

const SyncMassage = WithLoading();

export function PhaseFirmaOrNegociacionPromesa({
  selector,
  entity,
  onSubmit,
  onFirma,
}) {
  const initialValues = {
    Condition: entity.Condition || [],
    openComment: false,
    openCondition: false,
    Comment: '',
    Resolution: '',
  };
  return (
    <ExForm initialValues={initialValues} onSubmit={onSubmit}>
      {form => {
        const { Condition = [], NewCondition = '' } = form.values;
        return (
          <>
            <Box>
              <BoxHeader>
                <b>PROMESA</b>
              </BoxHeader>
              <BoxContent>
                <div className="d-flex align-items-center">
                  <span className="font-14-rem mr-3">Promesa</span>
                  <span className="font-14-rem mx-2">
                    {getFileName(entity.DocumentPromesa)}
                  </span>
                  <a
                    href={entity.DocumentPromesa}
                    target="_blank"
                    download
                    className="font-14-rem mx-2 btn-arrow"
                  >
                    <b>Ver Promesa</b>
                  </a>
                </div>
              </BoxContent>
              <BoxFooter>
                <div className="d-flex justify-content-end">
                  {entity.PromesaState === PROMESA_STATE[1] && (
                    <Button disabled={selector.loading} onClick={onFirma}>
                      Firmar
                    </Button>
                  )}
                  <Button
                    disabled={selector.loading}
                    className="m-btn-white m-btn-plus"
                    onClick={() => {
                      const newValue = NewCondition.trim();
                      if (newValue !== '') {
                        Condition.push({ Description: newValue });
                      }
                      form.setValues({
                        Condition,
                        NewCondition: '',
                        openComment: false,
                        openCondition: true,
                        Comment: '',
                      });
                    }}
                  >
                    Agregar Observación
                  </Button>
                  <Button
                    disabled={selector.loading}
                    color="white"
                    onClick={() =>
                      form.setValues({
                        ...form.values,
                        openComment: true,
                        openCondition: false,
                      })
                    }
                  >
                    Recharza Promesa
                  </Button>
                </div>
                {form.values.openCondition && (
                  <div className="p-0">
                    <PromesaObservationForm form={form} />
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
        );
      }}
    </ExForm>
  );
}

PhaseFirmaOrNegociacionPromesa.propTypes = {
  entity: PropTypes.object,
  selector: PropTypes.object,
  onSubmit: PropTypes.func,
  onFirma: PropTypes.func,
};

export default PhaseFirmaOrNegociacionPromesa;
