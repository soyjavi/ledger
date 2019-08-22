import { calcPoint } from './calcMatrix';

export default (txs = [], cities = [], countries = []) => {
  const points = {};

  let fixed = 3;
  if (Object.keys(countries).length > 1) fixed = 0;
  else if (Object.keys(cities).length > 1) fixed = 1;

  let precission = 0.001;
  if (fixed === 0) precission = 1;
  if (fixed === 1) precission = 0.1;

  txs.forEach(({ location: { latitude, longitude } = {} }) => {
    if (latitude && longitude) {
      const point = calcPoint(latitude, longitude, fixed);
      points[point] = points[point] ? points[point] + 1 : 1;

      // @TODO: Fix http error 413 w/ mapbox
      // points = { ...points, ...calcMatrix(latitude, longitude, fixed, precission, points) };
    }
  });

  return {
    precission,
    points: Object.keys(points).map((point) => [...point.split(',').map((value) => parseFloat(value, 10)), points[point]]),
  };
};
