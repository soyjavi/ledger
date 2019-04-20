export default {
  TRANSACTION: {
    value: {
      currency: '$', inline: 2, label: 'l10n.AMOUNT', required: true,
    },
    title: {
      inline: 2, label: 'l10n.TITLE', required: true,
    },
  },

  TRANSFER: {
    destination: {
      type: 'select', dataSource: [], label: 'l10n.VAULT_DESTINATION',
    },
    value: {
      currency: '$', inline: 2, label: 'l10n.AMOUNT', required: true,
    },
    exchange: {
      currency: '$', inline: 2, label: 'l10n.EXCHANGED', required: true,
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
