import C from './constants';

const { CURRENCIES } = C;

export default {
  TRANSACTION: {
    category: {
      type: 'select',
      dataSource: [],
      label: 'l10n.category',
      style: 'inline2',
    },
    value: {
      keyboard: 'numeric',
      label: 'l10n.value',
      required: true,
      style: 'inline3',
    },
    title: { label: 'l10n.title' },
  },

  VAULT: {
    title: { label: 'l10n.title', required: true },
    currency: {
      type: 'select',
      defaultValue: CURRENCIES[0],
      dataSource: CURRENCIES,
      label: 'l10n.currency',
      style: 'inline2',
    },
    balance: {
      keyboard: 'numeric',
      label: 'l10n.initialBalance',
      style: 'inline2',
      required: true,
    },
  },
};
