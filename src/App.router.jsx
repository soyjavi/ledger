import React from 'react';

import { C } from './common';
import { useNavigation, useStore } from './context';
import { DialogClone } from './components';
import { Onboarding, Stats, Dashboard, Vault, Vaults } from './screens';

const { SCREEN } = C;
const { ONBOARDING, STATS, DASHBOARD, VAULT, VAULTS } = SCREEN;

const Router = () => {
  const { current, stack = [], tx } = useNavigation();
  const { authorization } = useStore();
  console.log(' <Router>');

  return (
    <>
      <Onboarding backward={current !== ONBOARDING} visible />
      {authorization && (
        <>
          <Dashboard backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />
          {stack.includes(DASHBOARD) && (
            <>
              <Vaults visible={stack.includes(VAULTS)} />
              <Vault backward={current !== VAULT} visible={stack.includes(VAULT)} />
              <Stats visible={stack.includes(STATS)} />
              <DialogClone dataSource={tx} visible={tx !== undefined} />
            </>
          )}
        </>
      )}
    </>
  );
};

export { Router };
