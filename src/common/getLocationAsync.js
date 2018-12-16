export default () => new Promise((response, reject) => (
  navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } = {} }) => response({ latitude: longitude, longitude: latitude }), reject)));  // eslint-disable-line
