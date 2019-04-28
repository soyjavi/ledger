import { FORM } from '../../../../../common';

const { TRANSFER } = FORM;

export default (component, store) => {
  const { state: { destination }, props: { vault } } = component;
  const { currency } = store.vaults.find(({ hash }) => hash === vault);
  const { currency: destinationCurrency = currency } = store.vaults.find(({ hash }) => hash === destination) || {};

  return Object.assign({}, TRANSFER,
    {
      value: { ...TRANSFER.value, currency, disabled: destination === undefined },
      exchange: { ...TRANSFER.exchange, currency: destinationCurrency, disabled: destination === undefined },
    });
};
