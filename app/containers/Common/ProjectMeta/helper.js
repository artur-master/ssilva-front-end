import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { calculates } from 'containers/Phases/FormaDePago/helper';

export const calculate = ( meta_data={} ) => {
    if(!meta_data.length) return {"total": 0, "sum": 0, 'valpro': 0};
    let sum = 0;
    let total_sum = 0;
    for(const i in meta_data){
      const {total, discount} = calculates(meta_data[i]);
      sum += (total-discount);
      total_sum += total;
    }
    return {"total": total_sum, "sum": sum, 'valpro': (100*sum/total_sum)};
};

export const fetchAllReservations = projectId => {
    const requestURL = `${API_ROOT}/ventas/reservas/?q=${projectId}`;
    return request(requestURL)
           .then(res => calculate(
             res.filter(reserva=> reserva.ReservaState==="Oferta")
           ));
}

export const fetchAllPromesas = projectId => {
  const requestURL = `${API_ROOT}/ventas/promesas/?q=${projectId}`;  
  return request(requestURL)
         .then(res => calculate(
          res.filter(promesas=> promesas.PromesaState==="Escritura")
         ));
}
