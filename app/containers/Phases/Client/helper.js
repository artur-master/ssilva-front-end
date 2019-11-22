import { stringToBoolean } from 'containers/App/helpers';

export const isValidClient = client => {
  const isCompany = stringToBoolean(client.IsCompany);
  if (!client.Name) return false;
  if (!isCompany && !client.Nationality) return false;
  return true;
};
