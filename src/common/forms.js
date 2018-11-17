export default {
  TRANSACTION: {
    category: {
      type: 'select',
      dataSource: [],
      label: 'l10n.CATEGORY',
    },
    value: {
      keyboard: 'numeric',
      label: 'l10n.AMOUNT',
      required: true,
      style: 'inline2',
    },
    title: {
      label: 'l10n.TITLE',
      style: 'inline2',
    },
  },

  TRANSFER: {
    value: {
      keyboard: 'numeric',
      label: 'l10n.AMOUNT',
      required: true,
    },
    destination: {
      type: 'select',
      dataSource: [],
      label: 'l10n.VAULTS',
    },
    exchange: {
      keyboard: 'numeric',
      label: 'l10n.AMOUNT',
      required: true,
    },
  },

  VAULT: {
    currency: {
      type: 'select',
      label: 'l10n.CURRENCY',
    },
    title: {
      label: 'l10n.TITLE',
      required: true,
      style: 'inline2',
    },
    balance: {
      keyboard: 'numeric',
      label: 'l10n.BALANCE',
      style: 'inline2',
      required: true,
    },
  },
};
