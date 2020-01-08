import React from 'react';

import { C } from './common';
import { useNavigation, useStore } from './context';
import { LayoutView } from './reactor/components';
import { DialogClone } from './components';
import { Session, Settings, Stats, Dashboard, Vault, Vaults } from './screens';
import styles from './App.style';

const { SCREEN } = C;
const { SESSION, SETTINGS, STATS, DASHBOARD, VAULT, VAULTS } = SCREEN;

const App = () => {
  const { current, params, stack = [], tx } = useNavigation();
  const { sync, vaults = [] } = useStore();

  console.log('<App>');

  return (
    <LayoutView style={styles.container}>
      <Session backward={current !== SESSION} visible />
      <Dashboard backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />

      {sync && stack.includes(DASHBOARD) && (
        <>
          <Settings visible={stack.includes(SETTINGS)} />
          <Vaults visible={stack.includes(VAULTS)} />
          <Vault
            backward={current !== VAULT}
            // @TODO: Responsibility of vault
            dataSource={
              stack.includes(VAULT) && params.Vault ? vaults.find(({ hash }) => hash === params.Vault.hash) : undefined
            }
            visible={stack.includes(VAULT)}
          />
          <Stats
            vault={stack.includes(VAULT) && stack.includes(STATS) ? params.Vault : undefined}
            visible={stack.includes(STATS)}
          />
          <DialogClone dataSource={tx} visible={tx !== undefined} />
        </>
      )}
    </LayoutView>
  );
};

export default App;
