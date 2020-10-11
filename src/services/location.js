import { C } from '@common';

import { apiCall, objectToQueryString } from './modules';

const { ENDPOINT } = C;

export const ServiceLocation = {
  getPlace: async ({ latitude, longitude }) => {
    const { place } = await apiCall({ service: `place?latitude=${latitude}&longitude=${longitude}` });

    return place;
  },

  uriMap: ({ color, darkMode = false, height = 0, points, precission, small, width = 0 }) => {
    const queryString = objectToQueryString({
      color,
      points: JSON.stringify(points),
      precission,
      resolution: `${width}x${small ? Math.floor(height / 2) : height}@2x`,
    });

    return `${ENDPOINT}/map?${queryString}&style=${darkMode ? 'dark' : 'light'}`;
  },
};
