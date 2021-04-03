import React from 'react';

import { Sync } from './App.sync';
import { C } from './common';
import { useNavigation } from './context';
import { Main, Onboarding, Vault } from './screens';

const { SCREEN } = C;
const { DASHBOARD, VAULT } = SCREEN;

const Router = () => {
  const { current, stack = [] } = useNavigation();

  console.log(' <Router>');

  return (
    <>
      <Onboarding />
      <Main backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />
      {stack.includes(DASHBOARD) && (
        <>
          <Vault visible={stack.includes(VAULT)} />
          <Sync />
        </>
      )}
    </>
  );
};

export { Router };
