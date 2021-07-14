import {
  // helpers
  ALIGN,
  // components
  View,
} from '@lookiero/aurora';
import { useEvent } from '@lookiero/event';
import PropTypes from 'prop-types';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { BANNERS } from '@assets';
import { C, EVENTS, L10N } from '@common';
import { Banner, GroupTransactions, Header, Heading, ScrollView, Summary, Viewport } from '@components';
import { useNavigation, useStore } from '@context';

import { ButtonSummary } from './components';
import { onScroll, query } from './Vault.controller';
import { style } from './Vault.style';

const {
  TX: {
    TYPE: { INCOME, EXPENSE, TRANSFER },
  },
} = C;

const Vault = ({ visible }) => {
  const { publish } = useEvent();
  const { params, ...navigation } = useNavigation();
  const { baseCurrency, vaults } = useStore();
  const scrollview = useRef(null);

  const [dataSource, setDataSource] = useState({});
  const [scroll, setScroll] = useState(false);
  const [scrollQuery, setScrollQuery] = useState(false);
  const [txs, setTxs] = useState([]);

  useLayoutEffect(() => {
    if (!visible) scrollview.current.scrollTo({ y: 0, animated: false });
  }, [visible]);

  useEffect(() => {
    if (params.vault) refreshDatasource(vaults.find((vault) => vault.hash === params.vault.hash));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    const { currentBalance, txs: currentTxs, hash } = dataSource;
    if (visible && params.vault.hash === hash) {
      const vault = vaults.find((vault) => vault.hash === hash);
      if (vault.currentBalance !== currentBalance || vault.txs.length !== currentTxs.length) refreshDatasource(vault);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaults, visible]);

  const handleScroll = onScroll.bind(undefined, {
    dataSource,
    scrollQuery,
    setScroll,
    setScrollQuery,
    setTxs,
  });

  const refreshDatasource = (vault) => {
    setDataSource(vault);
    setTxs(query(vault.txs));
    setScrollQuery(false);
  };

  const handleTransaction = (type) => {
    publish({ event: EVENTS.NEW_TRANSACTION }, { type, vault: dataSource });
  };

  const { currency = baseCurrency, title, ...rest } = dataSource;

  console.log('  <Vault>', { visible });

  return (
    <Viewport scroll={false} visible={visible}>
      <Header visible={scroll} title={scroll ? title : undefined} onBack={navigation.back} />

      <ScrollView onScroll={handleScroll} ref={scrollview}>
        <Summary {...rest} title={title} currency={currency}>
          <View style={style.buttons}>
            <ButtonSummary icon="arrow-right-up" text={L10N.INCOME} onPress={() => handleTransaction(INCOME)} />
            <ButtonSummary icon="arrow-left-down" text={L10N.EXPENSE} onPress={() => handleTransaction(EXPENSE)} />
            {vaults.length > 1 && (
              <ButtonSummary icon="arrow-left-right" text={L10N.SWAP} onPress={() => handleTransaction(TRANSFER)} />
            )}
          </View>
        </Summary>

        {txs.length > 0 ? (
          <>
            <Heading paddingHorizontal="M" value={L10N.TRANSACTIONS} />
            {txs.map((item) => (
              <GroupTransactions key={item.timestamp} {...item} currency={currency} />
            ))}
          </>
        ) : (
          <Banner align={ALIGN.CENTER} image={BANNERS.NOT_FOUND} title={L10N.NO_TRANSACTIONS} />
        )}
      </ScrollView>
    </Viewport>
  );
};

Vault.propTypes = {
  visible: PropTypes.bool,
};

export { Vault };
