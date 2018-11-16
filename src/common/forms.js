export default {
  TRANSACTION: {
    category: {
      type: 'select',
      dataSource: [],
      label: 'l10n.category',
    },
    value: {
      keyboard: 'numeric',
      label: 'l10n.value',
      required: true,
      style: 'inline2',
    },
    title: {
      label: 'l10n.title',
      style: 'inline2',
    },
  },

  VAULT: {
    currency: {
      type: 'select',
      label: 'l10n.currency',
    },
    title: {
      label: 'l10n.title',
      required: true,
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
