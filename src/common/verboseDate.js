export default (timestamp, { MONTHS, TODAY, YESTERDAY }) => {
  const today = new Date();
  const date = new Date(timestamp);

  let verboseDay;
  if (date.getMonth() === today.getMonth()) {
    if (date.getDate() === today.getDate()) verboseDay = TODAY;
    if (date.getDate() === today.getDate() - 1) verboseDay = YESTERDAY; // @TODO How about if change month
  }

  return verboseDay || `${date.getDate()} ${MONTHS[date.getMonth()].substring(0, 3)}`;
};
