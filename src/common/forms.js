export default {
  TRANSACTION: {
    title: {
      inline: 2, label: 'l10n.TITLE', required: true,
    },
    value: {
      currency: '$', inline: 2, label: 'l10n.AMOUNT', required: true,
    },
  },

  TRANSFER: {
    value: {
      currency: '$', label: 'l10n.AMOUNT', required: true,
    },
    destination: {
      type: 'select', dataSource: [], label: 'l10n.VAULTS',
    },
    exchange: {
      currency: '$', label: 'l10n.AMOUNT', required: true,
    },
  },

  VAULT: {
    title: {
      inline: 2, label: 'l10n.NAME', required: true,
    },
    balance: {
      currency: '$', inline: 2, label: 'l10n.INITIAL_BALANCE', required: true,
    },
  },
};
