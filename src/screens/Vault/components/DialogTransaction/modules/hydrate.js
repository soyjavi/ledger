import { FORM } from '@common';

const { TRANSFER } = FORM;

export default ({ destination, vault }, vaults = []) => {
  const { currency } = vaults.find(({ hash }) => hash === vault);
  const { currency: destinationCurrency = currency } = vaults.find(({ hash }) => hash === destination) || {};

  return {
    ...TRANSFER,
    value: { ...TRANSFER.value, currency },
    exchange: { ...TRANSFER.exchange, currency: destinationCurrency },
  };
};
