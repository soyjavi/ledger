import { useRouter, Router } from '@lookiero/router';
import React, { useMemo } from 'react';

import { C, ROUTE } from '@common';
import { ModalClone, ModalTransaction, ModalVault, Sync } from '@components';
import { useStore } from '@context';

import { Welcome, Session, FirstVault, Completed, Main, Vault } from './screens';

const { IS_DEV } = C;

const Container = (inherit) => {
  const { route: { path = '' } = {} } = useRouter();

  const isReady = [ROUTE.MAIN, ROUTE.VAULT].includes(`/${path.split('/')[1]}`);

  return (
    <>
      {inherit.children}
      {useMemo(
        () =>
          isReady ? (
            <>
              <Sync />
              <ModalClone />
              <ModalTransaction />
              <ModalVault />
            </>
          ) : undefined,
        [isReady],
      )}
    </>
  );
};

const AppRouter = () => {
  const { settings: { authorization, onboarded = false } = {} } = useStore();

  const routeFallback = authorization ? (IS_DEV ? '/main/dashboard' : ROUTE.SESSION) : ROUTE.WELCOME;

  return useMemo(
    () => (
      <Router
        container={Container}
        entryRoute={{ path: authorization ? (IS_DEV ? '/main/dashboard' : ROUTE.SESSION) : ROUTE.WELCOME }}
        memoize
        routes={[
          { path: ROUTE.SESSION, component: Session, preload: true },
          //
          { path: ROUTE.WELCOME, component: Welcome, preload: !onboarded },
          { path: ROUTE.FIRST_VAULT, component: FirstVault, preload: !onboarded },
          { path: ROUTE.COMPLETED, component: Completed, preload: !onboarded },
          //
          { path: ROUTE.MAIN_TAB, component: Main, preload: authorization },
          { path: ROUTE.VAULT_HASH, component: Vault, preload: authorization },
          //
          { path: '*', redirect: routeFallback, replace: true },
        ]}
        subscribers={false}
      />
    ),
    [authorization, onboarded],
  );
};

export { AppRouter as Router };
