/**
 *
 * Offer Form
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import WithLoading from 'components/WithLoading';
import { OFERTA_STATE } from 'containers/App/constants';
import Condition from './Condition';

const SyncMessage = WithLoading();
export function OfferConfirmActions({
  entity,
  selector,
  onCancel,
  onConfirm,
  onEdit,
  onDelete,
}) {
  const { loading } = selector;
  // entity.Condition = [{ Description: 'Observation 1' }, { Description: 'Observation 2' }];
  const [condition, setCondition] = useState([]);

  const onChangeCondition =(index, value)=> {
    condition[index] = {Description: value};
    setCondition([...condition]);
  }
  const onRemoveCondition =(index) => {
    condition.splice(index, 1);
    setCondition([...condition]); 
  }
  const onCheckCondition =()=> {
    if(condition.length){
      for(let i of condition){
        if(i.Description.trim() == ""){
          alert("Por favor agregue observación");
          return false;
        }
      }
    }
    return true;
  }

  return (
    <>
      <div className="d-flex after-expands-2 align-items-center">
        {entity.OfertaState !== OFERTA_STATE[2] && (
          <div className="d-flex align-items-center after-expands-2 font-14-rem order-3">
            <div className="d-flex align-items-center mr-3 ">
              <div className="checkbox-01 checkbox-medium">
                <span>
                  <input
                    type="checkbox"
                    // onChange={evt => {
                    //   // onConfirm('client', evt.currentTarget.checked);
                    // }}
                  />
                  {/* eslint-disable-next-line */}
                  <label />
                </span>
              </div>
              <span>
                <b>Revisé y confirmo Oferta</b>
              </span>
            </div>
            <div className="d-flex align-items-center mr-3 order-3">
              <div className="checkbox-01 checkbox-medium">
                <span>
                  <input
                    type="checkbox"
                    // onChange={evt => {
                    //   // onConfirm('client', evt.currentTarget.checked);
                    // }}
                  />
                  {/* eslint-disable-next-line */}
                  <label />
                </span>
              </div>
              <span>
                <b>Contacté al cliente</b>
              </span>
            </div>
            <Button
              disabled={loading}
              className="order-3 m-btn mr-2"
              onClick={()=>{
                if(onCheckCondition() == false) return;
                onConfirm(condition);
              }}
            >
              Continuar
            </Button>
          </div>
        )}
        {entity.OfertaState === OFERTA_STATE[2] && (
          <Button className="order-3 m-btn  mr-2 m-btn-pen" onClick={onEdit}>
            Modificación
          </Button>
        )}
        <Button
          disabled={loading}
          onClick={onCancel}
          className="order-3 m-btn mr-2"
          color="white"
        >
          Cancerlar
        </Button>
        <Button
          disabled={loading}
          className="order-3 m-btn m-btn-white m-btn-plus mr-2"
          onClick={() => {
            if(onCheckCondition() == false) return;
            setCondition([...condition, {Description: ""}]);
          }}
        >
          Agregar Observación
        </Button>
        <Button
          disabled={loading}
          onClick={onDelete}
          className="order-3 m-btn"
          color="white"
        >
          Rechazar
        </Button>
      </div>
      { condition.length > 0 &&
      <>
        <div className="d-block text-left m font-14-rem mb-3">
          <b>Neuva Observación</b>
        </div>
        { condition.map((item, index) => (
          <Condition
            key={String(index)}
            className="w-100 d-block mb-3"
            condition={item}
            onChange={(value)=> onChangeCondition(index,value)}
            onRemove={()=>onRemoveCondition(index)}
          />
        ))}
       </>
      }
      <SyncMessage {...selector} />
    </>
  );
}

OfferConfirmActions.propTypes = {
  entity: PropTypes.object,
  selector: PropTypes.object,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default OfferConfirmActions;
