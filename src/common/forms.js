export default {
  TRANSACTION: {
    category: {
      type: 'select', dataSource: [], label: 'l10n.CATEGORY',
    },
    value: {
      keyboard: 'numeric', label: 'l10n.AMOUNT', required: true, inline: 2,
    },
    title: {
      label: 'l10n.TITLE', required: true, inline: 2,
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
    currency: {
      type: 'select', label: 'l10n.CURRENCY',
    },
    title: {
      label: 'l10n.TITLE', required: true, inline: 2,
    },
    balance: {
      keyboard: 'numeric', label: 'l10n.BALANCE', inline: 2, required: true,
    },
  },
};
