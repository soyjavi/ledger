import React from 'react';

import { C } from './common';
import { DialogClone } from './components';
import { useNavigation, useStore } from './context';
import { Onboarding, Stats, Dashboard, Vault, Vaults } from './screens';

const { SCREEN } = C;
const { ONBOARDING, STATS, DASHBOARD, VAULT, VAULTS } = SCREEN;

const Router = () => {
  const { back, current, stack = [], tx } = useNavigation();
  const { settings: { fingerprint, onboarded } = {} } = useStore();
  console.log(' <Router>');

  return (
    <>
      {fingerprint && <Onboarding backward={current !== ONBOARDING} visible />}
      {fingerprint && onboarded && (
        <>
          <Dashboard backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />
          {stack.includes(DASHBOARD) && (
            <>
              <Vaults onClose={back} visible={stack.includes(VAULTS)} />
              <Vault backward={current !== VAULT} onClose={back} visible={stack.includes(VAULT)} />
              <Stats onClose={back} visible={stack.includes(STATS)} />
              <DialogClone dataSource={tx} onClose={back} visible={tx !== undefined} />
            </>
          )}
        </>
      )}
    </>
  );
};

export { Router };
