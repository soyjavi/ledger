// @TODO: Fix http error 413 w/ mapbox

const calcPoint = (lat, long, fixed) => `${long.toFixed(fixed)},${lat.toFixed(fixed)}`;

export { calcPoint };

export default (latitude, longitude, fixed, precission, dataSource = {}) => {
  const values = {};
  const lat = latitude.toFixed(fixed);
  const long = longitude.toFixed(fixed);

  let point = calcPoint(latitude, longitude, fixed);
  values[point] = dataSource[point] ? dataSource[point] + 1 : 1;

  // parents
  point = calcPoint(lat + precission, long - precission, fixed);
  values[point] = dataSource[point] ? dataSource[point] + 1 : 1;
  point = calcPoint(lat + precission, long, fixed);
  values[point] = dataSource[point] ? dataSource[point] + 1 : 1;
  point = calcPoint(lat + precission, long + precission, fixed);
  values[point] = dataSource[point] ? dataSource[point] + 1 : 1;

  // siblings
  point = calcPoint(lat, long - precission, fixed);
  values[point] = dataSource[point] ? dataSource[point] + 1 : 1;
  point = calcPoint(lat, long + precission, fixed);
  values[point] = dataSource[point] ? dataSource[point] + 1 : 1;

  // childs
  point = calcPoint(lat - precission, long - precission, fixed);
  values[point] = dataSource[point] ? dataSource[point] + 1 : 1;
  point = calcPoint(lat - precission, long, fixed);
  values[point] = dataSource[point] ? dataSource[point] + 1 : 1;
  point = calcPoint(lat - precission, long + precission, fixed);
  values[point] = dataSource[point] ? dataSource[point] + 1 : 1;

  return values;
};
