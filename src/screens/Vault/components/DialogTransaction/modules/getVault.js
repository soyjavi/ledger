export default (vaultHash, vaults = []) => vaults.find(({ hash }) => hash === vaultHash);
