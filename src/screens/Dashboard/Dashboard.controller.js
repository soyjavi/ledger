import { C, groupTxsByDate } from '@common';

const { CURRENCY } = C;

export const queryLastTxs = ({ txs = [], vaults = [] }) =>
  groupTxsByDate(
    txs
      .slice(-32)
      .reverse()
      .filter(({ vault }) => vault !== undefined)
      .map((tx) => {
        const { currency = CURRENCY } = vaults.find((vault) => vault.hash === tx.vault) || {};

        return { ...tx, currency };
      }),
  );

export const queryVaults = ({ settings: { visibleVaults } = {}, vaults = [] }) =>
  vaults
    .filter((vault) => visibleVaults[vault.hash] !== false)
    .sort(({ currentMonth: { txs } }, { currentMonth: { txs: nextTxs } }) => nextTxs - txs);
