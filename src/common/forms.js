export default {
  TRANSACTION: {
    category: {
      type: 'select', dataSource: [], label: 'l10n.CATEGORY',
    },
    value: {
      keyboard: 'numeric', label: 'l10n.AMOUNT', required: true,
    },
    title: {
      label: 'l10n.TITLE', required: true,
    },
  },

  TRANSFER: {
    value: {
      keyboard: 'numeric', label: 'l10n.AMOUNT', required: true,
    },
    destination: {
      type: 'select', dataSource: [], label: 'l10n.VAULTS',
    },
    exchange: {
      keyboard: 'numeric', label: 'l10n.AMOUNT', required: true,
    },
  },

  VAULT: {
    title: {
      label: 'l10n.TITLE', required: true, inline: 2,
    },
    balance: {
      keyboard: 'numeric', label: 'l10n.BALANCE', inline: 2, required: true,
    },
  },
};
