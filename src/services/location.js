import { apiCall } from './modules';

const getPlace = async ({ latitude, longitude }) => {
  const { place } = await apiCall({ service: `place?latitude=${latitude}&longitude=${longitude}` });

  return place;
};

export { getPlace };
