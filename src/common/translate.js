export default (form = {}, l10n) => {
  Object.keys(form).forEach((key) => {
    ['label', 'placeholder'].forEach((domain) => {
      const caption = form[key][domain] ? form[key][domain].split('.')[1] : undefined;
      if (caption) form[key][domain] = l10n[caption];
    });
  });

  return form;
};
