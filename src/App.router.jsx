import React from 'react';

import { C } from './common';
import { DialogClone, Footer } from './components';
import { useNavigation, useStore } from './context';
import { Onboarding, Stats, Dashboard, Vault, Vaults } from './screens';

const { SCREEN } = C;
const { ONBOARDING, STATS, DASHBOARD, VAULT, VAULTS } = SCREEN;

const Router = () => {
  const { back, current, stack = [], tx } = useNavigation();
  const { settings: { onboarded } = {}, vaults, txs } = useStore();

  console.log(' <Router>', { vaults, txs });

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

              <DialogClone dataSource={tx} onClose={back} visible={tx !== undefined} />

              <Footer
                onBack={current !== DASHBOARD ? back : undefined}
                // onHardwareBack={visible ? back : undefined}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export { Router };
