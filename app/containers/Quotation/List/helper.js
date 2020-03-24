import moment from 'components/moment';

export const getReports = (entities = []) => {
  const dates = [moment().format('YYYY-MM-DD'), '1970-01-01'];
  const clients = {};
  const states = entities.reduce(
    (acc, item) => {
      acc.All += 1;
      acc[item.CotizacionState] = acc[item.CotizacionState] || 0;
      acc[item.CotizacionState] += 1;
      if (dates[0] >= item.Date) dates[0] = item.Date;
      if (dates[1] <= item.Date) dates[1] = item.Date;
      clients[item.ClienteID] = item.Cliente;
      return acc;
    },
    { All: 0 },
  );
  return {
    states,
    dates,
    clients: Object.keys(clients).map(id => clients[id]),
  };
};

export const doQuery = (entities, query = {}) => {
  if (!entities) return [];
  let queriedEntities = [...entities];
  /* sort */
  const { sort } = query;
  if (sort) {
    queriedEntities = queriedEntities.sort((a, b) => {
      let aa = a[sort.by], bb = b[sort.by];
      if (sort.by === "Cliente"){
        aa = `${aa['Name']} ${aa['LastNames']} ${aa['Rut']}`;
        bb = `${bb['Name']} ${bb['LastNames']} ${bb['Rut']}`;
      }
      if (aa.toLowerCase() > bb.toLowerCase())
        return sort.asc ? 1 : -1;
      if (aa.toLowerCase() < bb.toLowerCase())
        return sort.asc ? -1 : 1;
      return 0;
    });
  }

  return queriedEntities;
};
