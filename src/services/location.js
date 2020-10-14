import { C } from '@common';

import { objectToQueryString } from './modules';

const { MAPBOX, ENDPOINT } = C;

const PARAMETERS = 'language=en&limit=1&types=place';

export const ServiceLocation = {
  getPlace: async ({ latitude, longitude }) => {
    const url = `${MAPBOX.URL}/${longitude},${latitude}.json?${PARAMETERS}&access_token=${MAPBOX.ACCESS_TOKEN}`;
    console.log({ url });
    const response = await fetch(url);
    let place;

    if (response) {
      const { features = [] } = (await response.json()) || {};
      place = features[0] ? features[0].place_name_en : 'Unknown Place';
    }

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
