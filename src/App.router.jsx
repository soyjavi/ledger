import React from 'react';

import { C } from './common';
import { Footer } from './components';
import { useNavigation, useStore } from './context';
import { Onboarding, Stats, Dashboard, Vault, Vaults } from './screens';

const { SCREEN } = C;
const { ONBOARDING, STATS, DASHBOARD, VAULT, VAULTS } = SCREEN;

const Router = () => {
  const { back, current, stack = [] } = useNavigation();
  const { settings: { onboarded } = {} } = useStore();

  console.log(' <Router>');

  return (
    <>
      {onboarded !== undefined && <Onboarding backward={current !== ONBOARDING} visible />}
      {onboarded && (
        <>
          <Dashboard backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />
          {stack.includes(DASHBOARD) && (
            <>
              <Vaults onClose={back} visible={stack.includes(VAULTS)} />
              <Vault backward={current !== VAULT} onClose={back} visible={stack.includes(VAULT)} />
              <Stats onClose={back} visible={stack.includes(STATS)} />

              <Footer onBack={current !== DASHBOARD ? back : undefined} />
            </>
          )}
        </>
      )}
    </>
  );
};

export { Router };
