import {
  // helpers
  // components
  Text,
  Touchable,
  Slider,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import { C, L10N } from '@common';
import {
  Card,
  CARD_SIZE,
  DialogClone,
  GroupTransactions,
  Header,
  Heading,
  ScrollView,
  Search,
  Summary,
} from '@components';
import { useNavigation, useStore } from '@context';

import { DialogVault } from './components';
import { queryLastTxs, querySearchTxs, queryVaults } from './Dashboard.controller';
import { style } from './Dashboard.style';

const { SCREEN } = C;

const Dashboard = ({ timestamp }) => {
  const navigation = useNavigation();
  const scrollview = useRef(null);
  const { settings: { baseCurrency } = {}, overall, txs = [], vaults = [] } = useStore();

  const [dialogVault, setDialogVault] = useState(false);
  const [tx, setTx] = useState(undefined);
  const [lastTxs, setLastTxs] = useState([]);
  const [scroll, setScroll] = useState(false);
  const [query, setQuery] = useState();

  useEffect(() => {
    if (timestamp) scrollview.current.scrollTo({ y: 0, animated: true });
  }, [timestamp]);

  useEffect(() => {
    setLastTxs(queryLastTxs({ txs, vaults }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txs]);

  console.log('  <Dashboard>', { scroll, txs });

  const visibleVaults = queryVaults({ query, vaults });

  return (
    <>
      <Header isVisible={scroll} title={L10N.DASHBOARD} />

      <ScrollView onScroll={setScroll} ref={scrollview}>
        <Summary {...overall} currency={baseCurrency} title={L10N.OVERALL_BALANCE}>
          <Search onChange={setQuery} />
        </Summary>

        {visibleVaults.length > 0 && (
          <>
            <Heading value={L10N.VAULTS}>
              <Touchable onPress={() => setDialogVault(true)}>
                <Text action>{`${L10N.NEW} ${L10N.VAULT}`.toUpperCase()}</Text>
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
                  onPress={() => navigation.go(SCREEN.VAULT, vault)}
                />
              ))}
            </Slider>
          </>
        )}

        {lastTxs.length > 0 && (
          <>
            <Heading value={L10N.LAST_TRANSACTIONS} />
            {(querySearchTxs({ L10N, query, txs, vaults }) || lastTxs).map((item) => (
              <GroupTransactions {...item} key={`${item.timestamp}`} currency={baseCurrency} onPress={setTx} />
            ))}
          </>
        )}
      </ScrollView>

      <DialogClone dataSource={tx} onClose={() => setTx(undefined)} isVisible={tx !== undefined} />
      <DialogVault onClose={() => setDialogVault(false)} isVisible={dialogVault} />
    </>
  );
};

Dashboard.propTypes = {
  timestamp: PropTypes.number,
  visible: PropTypes.boolean,
};

export { Dashboard };
