import React from 'react';

import { C } from './common';
import { useNavigation } from './context';
import { DialogClone } from './components';
import { Session, Settings, Stats, Dashboard, Vault, Vaults } from './screens';

const { SCREEN } = C;
const { SESSION, SETTINGS, STATS, DASHBOARD, VAULT, VAULTS } = SCREEN;

const Router = () => {
  const { current, params, stack = [], tx } = useNavigation();
  console.log(' <Router>');

  return (
    <>
      <Session backward={current !== SESSION} visible />
      <Dashboard backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />

      {stack.includes(DASHBOARD) && (
        <>
          <Settings visible={stack.includes(SETTINGS)} />
          <Vaults visible={stack.includes(VAULTS)} />
          <Vault backward={current !== VAULT} visible={stack.includes(VAULT)} />
          <Stats
            vault={stack.includes(VAULT) && stack.includes(STATS) ? params.Vault : undefined}
            visible={stack.includes(STATS)}
          />
          <DialogClone dataSource={tx} visible={tx !== undefined} />
        </>
      )}
    </>
  );
};

export { Router };
