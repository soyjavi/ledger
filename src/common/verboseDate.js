export default (timestamp, l10n) => {
  const today = new Date();
  const date = new Date(timestamp);

  let verboseDay;
  if (date.getMonth() === today.getMonth()) {
    if (date.getDate() === today.getDate()) verboseDay = l10n.TODAY;
    if (date.getDate() === (today.getDate() - 1)) verboseDay = l10n.YESTERDAY; // @TODO How about if change month
  }

  return verboseDay || `${date.getDate()} ${l10n.MONTHS[date.getMonth()]}`;
};
