export default () => new Promise((response, reject) => navigator.geolocation.getCurrentPosition(  // eslint-disable-line
  ({ coords: { latitude, longitude } = {} }) => response({ latitude, longitude }),
  reject,
  { enableHighAccuracy: true },
));
