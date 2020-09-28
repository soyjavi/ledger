import React from 'react';

import { C } from './common';
import { useNavigation } from './context';
import { Dashboard, Onboarding, Settings, Stats, Vault, Vaults } from './screens';

const { SCREEN } = C;
const { DASHBOARD, SETTINGS, STATS, VAULT, VAULTS } = SCREEN;

const Router = () => {
  const { current, stack = [] } = useNavigation();

  console.log(' <Router>');

  return (
    <>
      <Onboarding />
      <Dashboard backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />
      {stack.includes(DASHBOARD) && (
        <>
          <Vaults backward={current !== VAULTS} visible={stack.includes(VAULTS)} />
          <Vault visible={stack.includes(VAULT)} />
          <Stats visible={stack.includes(STATS)} />
          <Settings visible={stack.includes(SETTINGS)} />
        </>
      )}
    </>
  );
};

export { Router };
