import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Button, Slider, Viewport } from 'reactor/components';

import { C, colorOpacity } from '@common';
import {
  Card,
  CARD_SIZE,
  DialogClone,
  Footer,
  GroupTransactions,
  Header,
  Heading,
  ScrollView,
  Search,
  Summary,
} from '@components';
import { useL10N, useNavigation, useStore } from '@context';

import { DialogVault } from './components';
import { queryLastTxs, querySearchTxs, queryVaults } from './Dashboard.controller';
import styles from './Dashboard.style';

const { SCREEN } = C;
const { COLOR, ICON, OPACITY, SPACE } = THEME;

const button = {
  color: colorOpacity(COLOR.CTA, OPACITY.S),
  colorText: COLOR.CTA,
  iconFamily: ICON.FAMILY,
};

const buttonFooter = {
  color: COLOR.TRANSPARENT,
  colorText: COLOR.TEXT,
  iconFamily: ICON.FAMILY,
};

const Dashboard = ({ visible, ...inherit }) => {
  const l10n = useL10N();
  const navigation = useNavigation();
  const { settings: { baseCurrency, visibleVaults } = {}, overall, txs = [], vaults = [] } = useStore();

  const [dialogVault, setDialogVault] = useState(false);
  const [tx, setTx] = useState(undefined);
  const [lastTxs, setLastTxs] = useState([]);
  const [scroll, setScroll] = useState(false);
  const [searchTxs, setSearchTxs] = useState(undefined);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (visible) setLastTxs(queryLastTxs({ txs, vaults }));
  }, [txs, vaults, visible]);

  const handleSearch = (query) => {
    setSearchTxs(query ? querySearchTxs({ l10n, query, txs, vaults }) : undefined);
  };

  console.log('  <Dashboard>', { visible, txs });

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Header isVisible={scroll} title={l10n.OVERALL_BALANCE} />

      <ScrollView onScroll={setScroll}>
        <Summary {...overall} currency={baseCurrency} title={l10n.OVERALL_BALANCE}>
          <Button
            {...button}
            icon="chart"
            onPress={() => navigation.go(SCREEN.STATS)}
            text={l10n.ACTIVITY.toUpperCase()}
          />
          <Button
            {...button}
            icon="settings"
            onPress={() => navigation.go(SCREEN.SETTINGS)}
            text={l10n.SETTINGS.toUpperCase()}
          />
        </Summary>

        {vaults.length > 0 && (
          <>
            <Heading paddingLeft="M" value={l10n.VAULTS}>
              <Button
                color={COLOR.BACKGROUND}
                colorText={COLOR.BRAND}
                onPress={() => navigation.go(SCREEN.VAULTS)}
                size="S"
                text={l10n.SEE_ALL}
              />
            </Heading>

            <Slider itemWidth={CARD_SIZE} itemMargin={SPACE.S} style={styles.vaults}>
              {queryVaults({ vaults, visibleVaults }).map((vault, index) => (
                <Card
                  {...vault.others}
                  balance={vault.currentBalance}
                  currency={vault.currency}
                  operator
                  title={vault.title}
                  key={vault.hash}
                  marginLeft={index === 0 ? 'M' : undefined}
                  marginRight="S"
                  onPress={() => navigation.go(SCREEN.VAULT, vault)}
                />
              ))}
              <Card marginRight="M" onPress={() => setDialogVault(true)} title={`${l10n.NEW} ${l10n.VAULT}`} />
            </Slider>

            {lastTxs.length > 0 && (
              <>
                <Heading marginTop="M" paddingLeft="M" paddingRight="S" value={l10n.LAST_TRANSACTIONS} />
                {(searchTxs || lastTxs).map((item) => (
                  <GroupTransactions {...item} key={`${item.timestamp}`} currency={baseCurrency} onPress={setTx} />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>

      <Footer visible={scroll || searchTxs !== undefined}>
        {lastTxs.length > 0 && (
          <Search {...buttonFooter} onFocus={setSearching} onSearch={handleSearch} text={l10n.SEARCH.toUpperCase()} />
        )}
        <Button
          {...buttonFooter}
          icon="chart"
          onPress={() => navigation.go(SCREEN.STATS)}
          text={!searching ? l10n.ACTIVITY.toUpperCase() : undefined}
        />
        <Button
          {...buttonFooter}
          icon="settings"
          onPress={() => navigation.go(SCREEN.SETTINGS)}
          text={!searching ? l10n.SETTINGS.toUpperCase() : undefined}
        />
      </Footer>

      {visible && (
        <>
          <DialogClone dataSource={tx} onClose={() => setTx(undefined)} visible={tx !== undefined} />
          <DialogVault onClose={() => setDialogVault(false)} visible={dialogVault} />
        </>
      )}
    </Viewport>
  );
};

Dashboard.propTypes = {
  backward: PropTypes.bool,
  visible: PropTypes.bool,
};

export { Dashboard };
