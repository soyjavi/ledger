import { FLAGS } from '../assets';
import C from './constants';

const { SYMBOL } = C;

export default (form, currency) => {
  Object.keys(form).forEach((key) => {
    if (form[key].currency) {
      form[key] = { ...form[key], currency: SYMBOL[currency], icon: FLAGS[currency] }; // eslint-disable-line
    }
  });

  return form;
};
