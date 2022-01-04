import {
  // components
  Slider,
} from '@lookiero/aurora';
import { useEvent } from '@lookiero/event';
import { useRouter } from '@lookiero/router';
import React, { useEffect, useMemo, useState } from 'react';

import { EVENTS, L10N, ROUTE } from '@common';
import { Action, Card, CARD_SIZE, GroupTransactions, Heading, Summary, Viewport } from '@components';
import { useStore } from '@context';

import { Search } from './components';
import { style } from './Dashboard.style';
import { queryLastTxs, querySearchTxs, queryVaults } from './helpers';

const Dashboard = () => {
  const { publish } = useEvent();
  const { go } = useRouter();
  const { rates, settings: { baseCurrency, appearance } = {}, overall = {}, txs = [], vaults = [] } = useStore();

  const [lastTxs, setLastTxs] = useState([]);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState();

  useEffect(() => {
    const nextTxs = queryLastTxs({ txs, vaults });
    if (JSON.stringify(nextTxs) !== JSON.stringify(lastTxs)) setLastTxs(nextTxs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txs]);

  const handleSearch = () => {
    setSearch(() => {
      setQuery(undefined);
      return !search;
    });
  };

  const sortedVaults = queryVaults({ query: undefined, vaults });

  return useMemo(
    () => (
      <Viewport path={ROUTE.TAB_DASHBOARD} stackMode={false}>
        <Summary {...overall} currency={baseCurrency} title={L10N.OVERALL_BALANCE} />

        {sortedVaults.length > 0 && (
          <>
            <Heading value={L10N.VAULTS}>
              <Action onPress={() => publish({ event: EVENTS.NEW_VAULT })}>{`${L10N.NEW} ${L10N.VAULT}`}</Action>
            </Heading>

            <Slider horizontal snapInterval={CARD_SIZE} style={style.slider}>
              {sortedVaults.map((vault, index) => (
                <Card
                  {...vault.others}
                  key={vault.hash}
                  balance={vault.currentBalance}
                  currency={vault.currency}
                  operator
                  style={index === 0 ? style.firstCard : style.card}
                  title={vault.title}
                  onPress={() => go({ path: `${ROUTE.VAULT}/${vault.hash}`, props: vault })}
                />
              ))}
            </Slider>
          </>
        )}

        {lastTxs.length > 0 && (
          <>
            <Heading value={L10N.LAST_TRANSACTIONS}>
              {!search && <Action onPress={handleSearch}>{L10N.SEARCH}</Action>}
            </Heading>
            {search && <Search onChange={setQuery} onClose={handleSearch} />}

            {(querySearchTxs({ L10N, query, txs, vaults }) || lastTxs).map((item) => (
              <GroupTransactions {...item} key={`${item.timestamp}`} currency={baseCurrency} />
            ))}
          </>
        )}
      </Viewport>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [appearance, baseCurrency, lastTxs, rates, query, sortedVaults],
  );
};

Dashboard.displayName = 'Dashboard';

export { Dashboard };
