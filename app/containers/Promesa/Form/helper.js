/* eslint-disable array-callback-return */
import React from 'react';
import {
  RESERVA_STATE,
  APROBACION_INMOBILIARIA_STATE,
} from 'containers/App/constants';
import { Auth } from 'containers/App/helpers';
import { UserProject } from '../../Project/helper';



export const canReviewPromesa = promesa =>
  !window.project
    ? false
    : UserProject.in(window.project) &&
      Auth.hasOneOfPermissions(['Es asistente comercial']) &&
      promesa.PromesaState === RESERVA_STATE[1];

export const canUploadPromesa = promesa =>
  !window.project
    ? false
    : UserProject.in(window.project) &&
      Auth.hasOneOfPermissions(['Es vendedor']) &&
      (!promesa.PromesaState ||
        [RESERVA_STATE[0], RESERVA_STATE[3]].includes(promesa.PromesaState));


