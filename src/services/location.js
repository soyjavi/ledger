import { C } from '@common';

import { objectToQueryString } from './modules';

const { MAPBOX, ENDPOINT } = C;

export const ServiceLocation = {
  getPlace: async ({ latitude, longitude }) => {
    const PARAMETERS = 'language=en&limit=10&types=poi';
    const url = `${MAPBOX.URL}/${longitude},${latitude}.json?${PARAMETERS}&access_token=${MAPBOX.ACCESS_TOKEN}`;
    const response = await fetch(url);
    let POIs;

    if (response) {
      const { features = [] } = (await response.json()) || {};

      POIs = features.map(({ id, properties: { address }, text_en: text, context = [] }) => {
        const info = {};
        context.forEach(({ id, text_en: value }) => {
          const [key] = id.split('.');
          if (['postcode', 'place', 'region', 'country'].includes(key)) info[key] = value;
        });
        const { place: city, ...location } = info;

        return {
          address,
          id,
          text,
          ...location,
          city,
        };
      });

      // @TODO: Should offer options and user will choose one of them
      const [{ city = '', region = '', country = '' }] = POIs;

      return `${city}, ${region}, ${country}`;
    }

    return;
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
