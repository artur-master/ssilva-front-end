/**
 *
 * CommercialData
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, BoxContent, BoxHeader } from 'components/Box';
import { FormGroup, Label } from 'components/ExForm';
import WithLoading from 'components/WithLoading';
import Button from 'components/Button';
import { getCommercialFields } from '../fields';
import GeneralReview from '../GeneralApprove/GeneralReview';

const SyncMessage = WithLoading();

function CommercialView({
  canEdit,
  selectorProject,
  selector,
  preload,
  onEdit,
}) {
  const { project = {} } = selectorProject;
  const fields = getCommercialFields(project);
  return (
    <Box collapse>
      <BoxHeader>
        <b>DATOS COMERCIALES</b>
        {canEdit && (
          <Button className="order-3 m-btn-pen" onClick={onEdit}>
            Editar
          </Button>
        )}
      </BoxHeader>
      <BoxContent>
        <SyncMessage {...selector} />
        {project && (
          <div className="row p-0 m-0 color-regular">
            {fields.map(({ label, name, view }) => (
              <FormGroup key={name} className="col-md-6 my-2">
                <Label className="pt-0" style={{ width: '13.5em' }}>
                  {name !== 'ComunaID' ? label : ''}
                </Label>
                <span className="font-14-rem ml-2">
                  {view ? view(project, preload) : project[name]}
                </span>
              </FormGroup>
            ))}
          </div>
        )}
      </BoxContent>
      <GeneralReview dataType="commercial" />
    </Box>
  );
}

CommercialView.propTypes = {
  canEdit: PropTypes.bool,
  preload: PropTypes.object,
  selectorProject: PropTypes.object,
  selector: PropTypes.object,
  onEdit: PropTypes.func,
};

export default CommercialView;
