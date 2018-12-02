export default (date, l10n) => {
  if (!date) return '';

  const [year, month] = date.split('-');
  return `${l10n.MONTHS[parseInt(month, 10) - 1]} '${year.substr(2, 2)}`;
};
