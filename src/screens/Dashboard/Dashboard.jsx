import {
  // helpers
  COLOR,
  // components
  Text,
  Touchable,
  Slider,
} from '@lookiero/aurora';
import { useEvent } from '@lookiero/event';
import { useRouter } from '@lookiero/router';
import React, { useEffect, useMemo, useState } from 'react';

import { EVENTS, L10N, ROUTE } from '@common';
import { Card, CARD_SIZE, GroupTransactions, Heading, Summary, Viewport } from '@components';
import { useStore } from '@context';

import { Search } from './components';
import { style } from './Dashboard.style';
import { queryLastTxs, querySearchTxs, queryVaults } from './helpers';

const Dashboard = () => {
  const { publish } = useEvent();
  const { go } = useRouter();
  const { settings: { baseCurrency, appearance } = {}, overall, txs = [], vaults = [] } = useStore();

  const [lastTxs, setLastTxs] = useState([]);
  const [query, setQuery] = useState();

  useEffect(() => {
    const nextTxs = queryLastTxs({ txs, vaults });
    if (JSON.stringify(nextTxs) !== JSON.stringify(lastTxs)) setLastTxs(nextTxs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txs]);

  const visibleVaults = queryVaults({ query, vaults });

  return useMemo(
    () => (
      <Viewport path={ROUTE.TAB_DASHBOARD} stackMode={false}>
        <Summary {...overall} currency={baseCurrency} title={L10N.OVERALL_BALANCE}>
          <Search onChange={setQuery} />
        </Summary>

        {visibleVaults.length > 0 && (
          <>
            <Heading value={L10N.VAULTS}>
              <Touchable onPress={() => publish({ event: EVENTS.NEW_VAULT })}>
                <Text action color={COLOR.PRIMARY}>
                  {`${L10N.NEW} ${L10N.VAULT}`.toUpperCase()}
                </Text>
              </Touchable>
            </Heading>

            <Slider horizontal snapInterval={CARD_SIZE} style={style.slider}>
              {visibleVaults.map((vault, index) => (
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
            <Heading value={L10N.LAST_TRANSACTIONS} />
            {(querySearchTxs({ L10N, query, txs, vaults }) || lastTxs).map((item) => (
              <GroupTransactions {...item} key={`${item.timestamp}`} currency={baseCurrency} />
            ))}
          </>
        )}
      </Viewport>
    ),
    [appearance, lastTxs, query],
  );
};

Dashboard.displayName = 'Dashboard';

export { Dashboard };
