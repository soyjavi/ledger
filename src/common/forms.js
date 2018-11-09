import C from './constants';
import L10N from './l10n';

const { CURRENCIES, TX: { TYPE } } = C;

export default {
  TRANSACTION: {
    vault: {
      type: 'select',
      label: 'l10n.vault',
    },
    category: {
      type: 'select',
      dataSource: L10N['en-EN'].CATEGORIES,
      label: 'l10n.category',
      style: 'inline2',
    },
    type: {
      type: 'select',
      defaultValue: TYPE[1],
      dataSource: Object.values(TYPE),
      label: 'l10n.type',
      style: 'inline2',
    },
    value: {
      keyboard: 'numeric',
      label: 'l10n.value',
      required: true,
      style: 'inline3',
    },
    currency: {
      disabled: true,
      label: 'l10n.currency',
      required: true,
      style: 'inline3',
    },
    title: { label: 'l10n.title', required: true },
    tags: { type: 'list' },
  },

  VAULT: {
    title: { label: 'l10n.title', required: true },
    caption: { label: 'l10n.caption' },
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
