export default (vaultHash, vaults = []) => {
  const { currency } = vaults.find(({ hash }) => hash === vaultHash) || {};

  return currency;
};
