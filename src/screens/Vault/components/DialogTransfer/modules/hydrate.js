import { FORM } from '../../../../../common';

const { TRANSFER } = FORM;

export default ({ form, store, vault }) => {
  const { currency } = store.vaults.find(({ hash }) => hash === vault);
  const vaults = store.vaults
    .filter(({ hash }) => hash !== vault)
    .map(({ title }) => title);

  const destination = store.vaults.find(({ title }) => title === (form.destination || vaults[0]));

  return Object.assign({}, TRANSFER,
    {
      value: { ...TRANSFER.value, currency, style: { width: '25%' } },
      destination: { ...TRANSFER.destination, dataSource: vaults, selectedValue: destination.title },
      exchange: { ...TRANSFER.exchange, disabled: currency === destination.currency, currency: destination.currency },
    });
};
