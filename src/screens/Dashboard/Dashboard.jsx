import PropTypes from 'prop-types';

import React, { useState } from 'react';
import { THEME } from 'reactor/common';
import { Button, Slider, Viewport } from 'reactor/components';

import { C } from '@common';
import { CARD_WIDTH, DialogClone, GroupTransactions, Header, Heading, ScrollView, Summary } from '@components';
import { useL10N, useNavigation, useStore } from '@context';

import { DialogSettings, DialogVault, Search, VaultCard } from './components';
import { queryLastTxs, queryVaults } from './Dashboard.controller';
import styles from './Dashboard.style';

const { SCREEN } = C;
const { COLOR, SPACE } = THEME;

const buttonProps = { color: COLOR.BASE, colorText: COLOR.TEXT };

export const Dashboard = ({ visible, ...inherit }) => {
  const l10n = useL10N();
  const navigation = useNavigation();
  const store = useStore();

  const [dialogVault, setDialogVault] = useState(false);
  const [dialogSettings, setDialogSettings] = useState(false);
  const [tx, setTx] = useState(undefined);
  const [scroll, setScroll] = useState(false);
  const [searchTxs, setSearchTxs] = useState(undefined);

  const { settings: { baseCurrency } = {}, overall, vaults = [] } = store;

  console.log('  <Dashboard>', { visible });

  const lastTxs = visible ? queryLastTxs(store) : [];

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Header highlight={scroll} title={l10n.OVERALL_BALANCE} />

      <ScrollView contentContainerStyle={styles.scroll} onScroll={(value) => setScroll(value)}>
        <Summary {...overall} currency={baseCurrency} title={l10n.OVERALL_BALANCE}>
          <Button
            {...buttonProps}
            icon="chart"
            onPress={() => navigation.go(SCREEN.STATS)}
            text={l10n.ACTIVITY.toUpperCase()}
          />
          <Button {...buttonProps} icon="wallet" onPress={() => setDialogVault(true)} text={l10n.VAULT.toUpperCase()} />
          <Button
            {...buttonProps}
            icon="settings"
            onPress={() => setDialogSettings(true)}
            text={l10n.SETTINGS.toUpperCase()}
          />
        </Summary>

        {vaults.length > 0 && (
          <>
            <Heading paddingLeft="M" paddingRight="S" small value={l10n.VAULTS}>
              <Button
                color={COLOR.BACKGROUND}
                colorText={COLOR.TEXT}
                onPress={() => navigation.go(SCREEN.VAULTS)}
                size="S"
                text={l10n.VIEW_ALL.toUpperCase()}
              />
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
                <Heading marginTop="M" paddingLeft="M" paddingRight="S" small value={l10n.LAST_TRANSACTIONS} />
                <Search onValue={setSearchTxs} />
                {(searchTxs || lastTxs).map((item) => (
                  <GroupTransactions {...item} key={`${item.timestamp}`} currency={baseCurrency} onPress={setTx} />
                ))}
              </>
            )}
          </>
        )}
      </ScrollView>

      {visible && (
        <>
          <DialogClone dataSource={tx} onClose={() => setTx(undefined)} visible={tx !== undefined} />
          <DialogSettings onClose={() => setDialogSettings(false)} visible={dialogSettings} />
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
