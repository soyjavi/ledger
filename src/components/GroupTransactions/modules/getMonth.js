export default (timestamp = new Date(), { MONTHS = {} }) => MONTHS[(new Date(timestamp)).getMonth()];
