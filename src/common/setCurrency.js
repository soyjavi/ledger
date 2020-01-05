import C from './constants';

const { SYMBOL } = C;

export default (form = {}, currency) => {
  Object.keys(form).forEach((key) => {
    if (form[key].currency) {
      const value = currency || form[key].currency;

      form[key] = { ...form[key], currency: SYMBOL[value] };
    }
  });

  return form;
};
