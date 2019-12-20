export default (overall, vaults) => {
  const currencies = {};

  vaults.forEach(({ currency, currentBalance: balance, currentBalanceBase: base }) => {
    let item = currencies[currency] || { balance: 0, base: 0 };
    item = { balance: item.balance + balance, base: item.base + base, currency };
    item.weight = (item.base * 100) / overall.currentBalance;

    currencies[currency] = item;
  });

  return Object.values(currencies).sort((a, b) => {
    if (a.weight < b.weight) return 1;
    if (a.weight > b.weight) return -1;
    return 0;
  });
};
