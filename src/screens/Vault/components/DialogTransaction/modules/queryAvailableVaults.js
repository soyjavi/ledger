export default (vaults = [], vaultHash) =>
  vaults
    .filter(({ hash }) => hash !== vaultHash)
    .sort(({ currentBalanceBase: balance }, { currentBalanceBase: nextBalance }) => nextBalance - balance);
