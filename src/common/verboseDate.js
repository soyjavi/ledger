export default (timestamp, { TODAY, YESTERDAY, DAY_NAMES }) => {
  const today = new Date();
  const date = new Date(timestamp);

  let verboseDay;
  if (date.getMonth() === today.getMonth()) {
    if (date.getDate() === today.getDate()) verboseDay = TODAY;
    if (date.getDate() === (today.getDate() - 1)) verboseDay = YESTERDAY; // @TODO How about if change month
  }

  return verboseDay || `${DAY_NAMES[date.getDay()]} ${date.getDate()}`;
};
