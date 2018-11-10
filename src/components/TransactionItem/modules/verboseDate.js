export default (timestamp, l10n) => {
  const today = new Date();
  const date = new Date(timestamp);

  return `$day, ${date.getDate()} ${l10n.MONTHS[date.getMonth()]}`;
};
