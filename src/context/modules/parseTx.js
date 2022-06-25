export const parseTx = ({ hash, category, timestamp, title = '', type, value = 0, vault } = {}) => ({
  hash,
  category,
  timestamp,
  title,
  type,
  value: parseFloat(value, 10),
  vault,
});
