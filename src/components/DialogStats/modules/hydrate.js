import { FORM } from '../../../common';

const { VAULT } = FORM;

export default ({ baseCurrency, rates, vaults }) => Object.assign({}, VAULT, {
  currency: {
    ...VAULT.currency,
    dataSource: vaults.length === 0 ? Object.keys(rates) : [baseCurrency, ...Object.keys(rates)],
  },
});
