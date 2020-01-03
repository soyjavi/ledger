export default (timestamp = new Date(), { MONTHS = {} }) =>
  MONTHS[new Date(timestamp).getMonth()].toUpperCase().substr(0, 3);
