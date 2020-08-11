import PropTypes from 'prop-types';

import React, { useEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Button, Slider, Viewport } from 'reactor/components';

import { C, onHardwareBackPress } from '@common';
import { CARD_WIDTH, Footer, GroupTransactions, Header, Heading, Option, ScrollView, Summary } from '@components';
import { useL10N, useNavigation, useStore } from '@context';

import { DialogSettings, DialogVault, Search, VaultCard } from './components';
import styles from './Dashboard.style';
import { queryLastTxs, queryVaults } from './modules';

const { SCREEN } = C;
const { COLOR, SPACE } = THEME;

const buttonProps = {
  color: COLOR.BACKGROUND,
  colorText: COLOR.TEXT,
  size: 'S',
  style: styles.smallButton,
};

export const Dashboard = ({ backward, visible, ...inherit }) => {
  const l10n = useL10N();
  const navigation = useNavigation();
  const store = useStore();

  const [dialogVault, setDialogVault] = useState(false);
  const [dialogSettings, setDialogSettings] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchTxs, setSearchTxs] = useState(undefined);

  const {
    settings: { baseCurrency },
    overall,
    vaults = [],
  } = store;

  useEffect(() => {
    onHardwareBackPress(!backward, () => {
      if (dialogVault) setDialogVault(false);
      if (dialogSettings) setDialogSettings(false);
    });
  }, [backward, dialogVault, dialogSettings]);

  console.log('  <Dashboard>', { visible, searchTxs });

  const lastTxs = queryLastTxs(store);

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Header highlight={scroll} title={l10n.OVERALL_BALANCE} />

      <ScrollView contentContainerStyle={styles.scroll} onScroll={(value) => setScroll(value)}>
        <Summary {...overall} currency={baseCurrency} title={l10n.OVERALL_BALANCE}>
          <Option icon="chart" onPress={() => navigation.go(SCREEN.STATS)} caption={l10n.ACTIVITY} />
          <Option icon="wallet" onPress={() => setDialogVault(true)} caption={l10n.VAULT} />
          <Option icon="settings" onPress={() => setDialogSettings(true)} caption={l10n.SETTINGS} />
        </Summary>

        {vaults.length > 0 && (
          <>
            <Heading paddingLeft="M" paddingRight="S" small value={l10n.VAULTS}>
              <Button {...buttonProps} title={l10n.VIEW_ALL} onPress={() => navigation.go(SCREEN.VAULTS)} />
            </Heading>

            <Slider itemWidth={CARD_WIDTH} itemMargin={SPACE.S} style={styles.vaults}>
              {queryVaults(store).map((vault, index) => (
                <VaultCard
                  {...vault}
                  key={vault.hash}
                  marginLeft={index === 0 ? 'M' : undefined}
                  marginRight="S"
                  onPress={() => navigation.go(SCREEN.VAULT, vault)}
                />
              ))}
            </Slider>

            {lastTxs.length > 0 && (
              <>
                <Heading paddingLeft="M" paddingRight="S" small value={l10n.LAST_TRANSACTIONS}>
                  <Button {...buttonProps} title={l10n.SEARCH} onPress={() => setSearch(!search)} />
                </Heading>
                {search && <Search onValue={setSearchTxs} />}
                {(searchTxs || lastTxs).map((item) => (
                  <GroupTransactions key={`${item.timestamp}`} {...item} currency={baseCurrency} />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>

      <Footer visible={!scroll} showSync />

      {visible && (
        <>
          <DialogVault onClose={() => setDialogVault(false)} visible={dialogVault} />
          <DialogSettings onClose={() => setDialogSettings(false)} visible={dialogSettings} />
        </>
      )}
    </Viewport>
  );
};

Dashboard.propTypes = {
  backward: PropTypes.bool,
  visible: PropTypes.bool,
};
