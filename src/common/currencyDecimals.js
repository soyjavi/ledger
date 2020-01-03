import C from './constants';

const { FIXED } = C;

export default (value = 0, currency) => (value < 10000 ? FIXED[currency] || 2 : 0);
