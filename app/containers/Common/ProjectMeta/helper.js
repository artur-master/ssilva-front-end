import request from 'utils/request';
import { API_ROOT } from 'containers/App/constants';
import { formatNumber } from 'containers/App/helpers';
import moment from 'components/moment';

export const calculate = ( datas ) => {    
  let totalPrice = 0, 
      firmadoPrice = 0,
      totalPromesas = 0,
      firmadoPromesas = 0;
  datas.forEach(meta_data => {
    totalPromesas++;
    const { Inmuebles=[] } = meta_data;
    const price = Inmuebles.reduce((acc, item) => acc + item.Price, 0);
    totalPrice += price;
    if(meta_data.PromesaState==="Escritura"){
      firmadoPromesas++;
      firmadoPrice += price;
    }      
  });
  
  return {
    promesas: totalPromesas,
    firmadoPromesas: firmadoPromesas,
    totalPrice: formatNumber(totalPrice), 
    firmadoPrice: formatNumber(firmadoPrice)
  };
};

export const fetchProjectMeta = (projectId='') => {
  let requestURL = '';
  if(projectId==="")
    requestURL = `${API_ROOT}/ventas/promesas/`;
  else
    requestURL = `${API_ROOT}/ventas/promesas/?q=${projectId}`;
  return request(requestURL).then(res => 
    calculate(res.filter(promesas=> moment(promesas.Date).isSame(new Date(), 'month')))
  );
}
