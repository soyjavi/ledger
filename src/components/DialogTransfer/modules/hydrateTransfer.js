import { FORM } from '../../../common';

const { TRANSFER } = FORM;

export default ({
  form,
  l10n,
  store,
  vault,
}) => {
  const { currency } = store.vaults.find(({ hash }) => hash === vault);
  const vaults = store.vaults
    .filter(({ hash }) => hash !== vault)
    .map(({ title }) => title);

  const destination = store.vaults.find(({ title }) => title === (form.destination || vaults[0]));

  return Object.assign({}, TRANSFER,
    {
      destination: { ...TRANSFER.destination, dataSource: vaults, selectedValue: destination.title },
      value: { ...TRANSFER.value, label: `${l10n.AMOUNT} ${currency}` },
      exchange: {
        ...TRANSFER.exchange,
        disabled: currency === destination.currency,
        label: `${l10n.AMOUNT} ${destination.currency}`,
      },
    });
};
