import { useRouter, Router } from '@lookiero/router';
import React, { useMemo } from 'react';

import { ROUTE } from '@common';
import { ModalClone, ModalTransaction, ModalVault, Sync } from '@components';
import { useStore } from '@context';

import { Welcome, Session, FirstVault, Completed, Main, Vault } from './screens';

const Container = (inherit) => {
  const { route: { path = '' } = {} } = useRouter();

  const rootPath = `/${path.split('/')[1]}`;
  const isReady = [ROUTE.MAIN, ROUTE.VAULT].includes(rootPath);

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

  return useMemo(
    () => (
      <Router
        container={Container}
        entryRoute={{ path: authorization ? '/session' : '/welcome' }}
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
          { path: '*', redirect: authorization ? ROUTE.SESSION : ROUTE.WELCOME, replace: true },
        ]}
        subscribers={false}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authorization],
  );
};

export { AppRouter as Router };
