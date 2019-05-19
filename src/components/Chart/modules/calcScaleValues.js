
const formatValue = (source) => {
  let value = Math.floor(source);

  if (value >= 1000000) value = `${(value / 1000000).toFixed(2)} M`;
  else if (value >= 1000) value = `${(value / 1000).toFixed(value >= 100000 ? 0 : 1)}   K`;

  return value;
};

export default ({ avg, max, inverted }) => {
  const maxScale = formatValue(max);
  const avgScale = formatValue(avg);

  return !inverted ? [maxScale, avgScale, 0] : ['', avgScale, maxScale];
};
