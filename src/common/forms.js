export default {
  TRANSACTION: {
    value: {
      currency: '$', inline: 2, label: 'l10n.AMOUNT', required: true,
    },
    title: {
      inline: 2, label: 'l10n.CONCEPT', required: true,
    },
  },

  TRANSFER: {
    value: {
      currency: '$', inline: 2, label: 'l10n.SEND', required: true,
    },
    exchange: {
      currency: '$', inline: 2, label: 'l10n.GET', required: true,
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
