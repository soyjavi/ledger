import { View, useDevice } from '@lookiero/aurora';
import React from 'react';

import { ModalClone, ModalTransaction, ModalVault } from '@components';

import { Sync } from './App.sync';
import { C } from './common';
import { useNavigation } from './context';
import { Main, Onboarding, Vault } from './screens';

const { SCREEN } = C;
const { DASHBOARD, VAULT } = SCREEN;

const Router = () => {
  const {
    screen: { height, width },
  } = useDevice();
  const { current, stack = [] } = useNavigation();

  return (
    <View style={{ height, width, overflow: 'hidden' }}>
      <Onboarding backward={current === DASHBOARD} />
      <Main backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} />
      {stack.includes(DASHBOARD) && (
        <>
          <Vault visible={stack.includes(VAULT)} />
          <Sync />
          <ModalClone />
          <ModalTransaction />
          <ModalVault />
        </>
      )}
    </View>
  );
};

export { Router };
