import { THEME } from 'reactor/common';

import { C } from '@common';

const {
  MAPBOX: { ACCESS_TOKEN, API, SERVICE },
} = C;
const { COLOR } = THEME;

export const ServiceLocation = {
  getPlace: async ({ latitude, longitude }) => {
    const PARAMETERS = 'language=en&limit=10&types=poi';
    const url = `${API}/${SERVICE.PLACES}/${longitude},${latitude}.json?${PARAMETERS}&access_token=${ACCESS_TOKEN}`;
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

  uriMap: ({
    center = 'auto',
    color = COLOR.BRAND,
    darkMode = false,
    height = 0,
    points = [],
    precission = 0.001,
    small,
    width = 0,
  }) => {
    const heatmap = [0.2, 0.4, 0.6, 0.8];
    const spots = [[], [], [], []];
    const gap = parseFloat(precission, 10);

    const resolution = `${width}x${small ? Math.floor(height / 2) : height}@2x`;

    // eslint-disable-next-line no-unused-vars
    const max = Math.max(...points.map(([longitude, latitude, amount = 1]) => amount));

    points.forEach((point) => {
      let [long, lat, amount = 1] = point;

      long = parseFloat(long, 10) - gap / 2;
      lat = parseFloat(lat, 10);

      const box = [
        [long, lat],
        [long + gap, lat],
        [long + gap, lat + gap],
        [long, lat + gap],
        [long, lat],
      ];

      // Determine level
      let index = 1;
      if (points.length > 1) {
        const percentage = Math.floor((amount * 100) / max);

        if (percentage > 80) index = 3;
        else if (percentage > 50) index = 2;
        else if (percentage > 10) index = 1;
        else index = 0;
      }

      spots[index].push(box);
    });

    const geoJSON = { type: 'FeatureCollection', features: [] };
    spots.forEach((coordinates = [], index) => {
      if (coordinates.length > 0) {
        geoJSON.features.push({
          type: 'Feature',
          geometry: { type: 'Polygon', coordinates },
          properties: { 'stroke-width': 0, fill: color, 'fill-opacity': heatmap[index] },
        });
      }
    });

    const geoJSONUri = encodeURIComponent(JSON.stringify(geoJSON));
    const queryParams = `access_token=${ACCESS_TOKEN}&attribution=false&logo=false`;
    const service = darkMode ? SERVICE.STATIC_MAP_DARK : SERVICE.STATIC_MAP;

    return `${API}/${service}/geojson(${geoJSONUri})/${center}/${resolution}?${queryParams}`;
  },
};
