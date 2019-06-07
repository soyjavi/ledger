export default (form = {}, l10n) => {
  Object.keys(form).forEach((key) => {
    const caption = form[key].label.split('.')[1];
    if (caption) form[key].label = l10n[caption]; // eslint-disable-line
  });

  return form;
};
