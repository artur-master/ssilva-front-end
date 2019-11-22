import Fuse from 'fuse.js';

export const doQuery = (entities, query = {}) => {
  if (!entities) return [];
  let queriedEntities = [...entities];

  if (query.notIn) {
    queriedEntities = queriedEntities.filter(
      item => !query.notIn.includes(item.UserID),
    );
  }

  if (query.textSearch) {
    const fuse = new Fuse(queriedEntities, {
      keys: ['Name', 'Rut', 'Comuna.Name'],
      threshold: 0,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
    });
    queriedEntities = fuse.search(query.textSearch);
  }

  /* sort */
  const { sort } = query;
  if (sort) {
    queriedEntities = queriedEntities.sort((a, b) => {
      if (sort.by === 'Comuna') {
        if (a[sort.by].Name.toLowerCase() > b[sort.by].Name.toLowerCase())
          return sort.asc ? 1 : -1;
        if (a[sort.by].Name.toLowerCase() < b[sort.by].Name.toLowerCase())
          return sort.asc ? -1 : 1;
      } else {
        if (a[sort.by].toLowerCase() > b[sort.by].toLowerCase())
          return sort.asc ? 1 : -1;
        if (a[sort.by].toLowerCase() < b[sort.by].toLowerCase())
          return sort.asc ? -1 : 1;
      }

      return 0;
    });
  }

  return queriedEntities;
};

export const shouldShowField = (fieldName, focusHide) =>
  !(focusHide && focusHide.includes(fieldName));

export const clientFullname = client =>
  client ? `${client.Name} ${client.LastNames} - ${client.Rut}` : '';
