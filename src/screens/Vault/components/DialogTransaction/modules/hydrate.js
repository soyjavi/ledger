import { FORM } from '../../../../../common';

const { TRANSFER } = FORM;

export default (component, store) => {
  const { props: { destination, vault } } = component;
  const { currency } = store.vaults.find(({ hash }) => hash === vault);
  const { currency: destinationCurrency = currency } = store.vaults.find(({ hash }) => hash === destination) || {};

  return {
    ...TRANSFER,
    value: { ...TRANSFER.value, currency },
    exchange: { ...TRANSFER.exchange, currency: destinationCurrency },
  };
};
