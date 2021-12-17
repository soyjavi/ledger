export const parseTx = ({ hash, category, location, timestamp, title = '', type, value = 0, vault } = {}) => ({
  hash,
  category,
  location,
  timestamp,
  title,
  type,
  value: parseFloat(value, 10),
  vault,
});
