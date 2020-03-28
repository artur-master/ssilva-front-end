import { calculates } from 'containers/Phases/FormaDePago/helper';

export const Calculate_Meta = ( meta_data={} ) => {
    if(!meta_data)return {"total": 0, "sum": 0, 'valpro': 0};
    let sum = 0;
    let total_sum = 0;
    for(const i in meta_data){
      const {total, discount} = calculates(meta_data[i]);
      sum += (total-discount);
      total_sum += total;
    }
    return {"total": total_sum, "sum": sum, 'valpro': (100*sum/total_sum)};
};