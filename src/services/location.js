import { apiCall } from './modules';

export const getPlace = async ({ latitude, longitude }) => {
  const { place } = await apiCall({ service: `place?latitude=${latitude}&longitude=${longitude}` });

  return place;
};
