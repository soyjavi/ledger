import React from 'react';

import { C } from './common';
import { useNavigation, useStore } from './context';
import { DialogClone } from './components';
import { Session, Settings, Stats, Dashboard, Vault, Vaults } from './screens';

const { SCREEN } = C;
const { SESSION, SETTINGS, STATS, DASHBOARD, VAULT, VAULTS } = SCREEN;

const Router = () => {
  const { current, stack = [], tx } = useNavigation();
  const { sync } = useStore();
  console.log(' <Router>');

  return (
    <>
      <Session backward={current !== SESSION} visible />
      <Dashboard backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />

      {stack.includes(DASHBOARD) && sync && (
        <>
          <Settings visible={stack.includes(SETTINGS)} />
          <Vaults visible={stack.includes(VAULTS)} />
          <Vault backward={current !== VAULT} visible={stack.includes(VAULT)} />
          <Stats visible={stack.includes(STATS)} />
          <DialogClone dataSource={tx} visible={tx !== undefined} />
        </>
      )}
    </>
  );
};

export { Router };
