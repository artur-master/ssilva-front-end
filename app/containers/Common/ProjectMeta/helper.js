import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { formatNumber } from 'containers/App/helpers';

export const calculate = ( datas ) => {
    let total = 0, cost = 0;
    datas.forEach(meta_data => {
        const { Inmuebles=[] } = meta_data;
        const price = Inmuebles.reduce((acc, item) => acc + item.Price, 0);
        const discount = Inmuebles.reduce(
            (acc, item) => acc + ((item.Discount || 0) / 100) * item.Price,
            0,
        );
        cost += price - discount;
        total += price;
    });
    const percent = total ? 100*cost/total : 0;
    
    return {
      total: formatNumber(total), 
      cost: formatNumber(cost), 
      percent: formatNumber(percent)
    };
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
