import { CATEGORIES } from '../assets';

export default ({ type, category, title = '' } = {}) => (
  CATEGORIES[type][title.toLowerCase()] || CATEGORIES[type][category]
);
