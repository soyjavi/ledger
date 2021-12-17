import {
  // helpers
  ALIGN,
  // components
  Button,
  View,
} from '@lookiero/aurora';
import { useEvent } from '@lookiero/event';
import { useRouter } from '@lookiero/router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useWindowDimensions } from 'react-native';

import { BANNERS } from '@assets';
import { C, EVENTS, L10N, ROUTE } from '@common';
import { Banner, GroupTransactions, Header, Heading, ScrollView, Summary, Viewport } from '@components';
import { useStore } from '@context';

import { ButtonSummary } from './components';
import { query } from './helpers';
import { style } from './Vault.style';

const {
  TX: {
    TYPE: { INCOME, EXPENSE, TRANSFER },
  },
} = C;

const Vault = () => {
  const { publish } = useEvent();
  const scrollview = useRef(null);
  const { back, route: { params: { hash } = {}, path } = {} } = useRouter();
  const { baseCurrency, vaults } = useStore();
  const { height } = useWindowDimensions();

  const [dataSource, setDataSource] = useState({});
  const [scroll, setScroll] = useState(false);
  const [scrollQuery, setScrollQuery] = useState(false);
  const [txs, setTxs] = useState([]);

  useEffect(() => {
    if (hash && path === ROUTE.VAULT_HASH) {
      scrollview.current.scrollTo({ y: 0, animated: false });

      const vault = vaults.find((vault) => vault.hash === hash);

      setDataSource(vault);
      setTxs(query(vault.txs));
      setScrollQuery(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, vaults]);

  const handleEdit = () => {
    publish({ event: EVENTS.SETTINGS_VAULT }, { dataSource });
  };

  const handleScroll = (nextScroll, y) => {
    setScroll(nextScroll);
    if (!scrollQuery && y > height / 2) {
      setScrollQuery(true);
      setTxs(query(dataSource.txs, true));
    }
  };

  const handleTransaction = (type) => {
    publish({ event: EVENTS.NEW_TRANSACTION }, { type, vault: dataSource });
  };

  const { currency = baseCurrency, title, ...rest } = dataSource;

  return (
    <Viewport path={ROUTE.VAULT}>
      <Header isVisible={scroll} title={title} onBack={back} />

      {useMemo(
        () => (
          <ScrollView onScroll={handleScroll} ref={scrollview}>
            <Summary {...rest} title={title} currency={currency}>
              <View style={style.buttons}>
                <ButtonSummary icon="arrow-right-up" text={L10N.INCOME} onPress={() => handleTransaction(INCOME)} />
                <ButtonSummary icon="arrow-left-down" text={L10N.EXPENSE} onPress={() => handleTransaction(EXPENSE)} />
                {vaults.length > 1 && (
                  <ButtonSummary icon="arrow-left-right" text={L10N.SWAP} onPress={() => handleTransaction(TRANSFER)} />
                )}
                <ButtonSummary icon="settings" text={L10N.SETTINGS} onPress={handleEdit} />
              </View>
            </Summary>

            {txs.length > 0 ? (
              <>
                <Heading value={L10N.TRANSACTIONS} />
                {txs.map((item) => (
                  <GroupTransactions key={item.timestamp} {...item} currency={currency} />
                ))}
              </>
            ) : (
              <Banner align={ALIGN.CENTER} image={BANNERS.NOT_FOUND} title={L10N.NO_TRANSACTIONS} />
            )}
          </ScrollView>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [rest, txs],
      )}
    </Viewport>
  );
};

export { Vault };
