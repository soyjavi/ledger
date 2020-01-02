import React from 'react';

import { C } from './common';
import { useNavigation, useStore } from './context';
import { LayoutView } from './reactor/components';
import { DialogClone } from './components';
import {
  Session, Settings, Stats, Dashboard, Vault, Vaults,
} from './screens';
import styles from './App.style';

const { SCREEN } = C;
const {
  SESSION, SETTINGS, STATS, DASHBOARD, VAULT, VAULTS,
} = SCREEN;

export default () => {
  const {
    current, back, params, stack, tx,
  } = useNavigation();
  const { sync, vaults = [] } = useStore();
  console.log('<App>');

  return (
    <LayoutView style={styles.container}>
      <Session backward={current !== SESSION} visible />
      <Dashboard backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />

      { sync && stack.includes(DASHBOARD) && (
        <>
          <Settings visible={stack.includes(SETTINGS)} />
          <Vaults visible={stack.includes(VAULTS)} />
          <Vault
            backward={current !== VAULT}
            dataSource={stack.includes(VAULT) && params.Vault
              ? vaults.find(({ hash }) => hash === params.Vault.hash)
              : undefined}
            back={back}
            visible={stack.includes(VAULT)}
          />
          <Stats vault={params.Vault} visible={stack.includes(STATS)} />
          <DialogClone dataSource={tx} visible={tx !== undefined} />
        </>
      )}
    </LayoutView>
  );
};
