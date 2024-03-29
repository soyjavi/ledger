import { Aurora } from '@lookiero/aurora';
import { useRouter, Router } from '@lookiero/router';
import React, { useEffect, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

import { C, changeAppearance, ROUTE } from '@common';
import { ModalClone, ModalTransaction, ModalVault, Sync } from '@components';
import { useStore } from '@context';
import { ShieldTheme } from '@theming';

import { style } from './App.style';
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
  const { settings: { authorization, appearance, onboarded = false } = {} } = useStore();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (appearance) changeAppearance({ color: appearance });
  }, [appearance]);

  return useMemo(
    () => (
      <Aurora theme={ShieldTheme} style={[style.container, { height, width }]}>
        <Router
          container={Container}
          entryRoute={{
            path: authorization
              ? IS_DEV && onboarded
                ? `${ROUTE.MAIN}${ROUTE.TAB_DASHBOARD}`
                : ROUTE.SESSION
              : ROUTE.WELCOME,
          }}
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
          ]}
          subscribers={false}
        />
      </Aurora>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authorization, onboarded],
  );
};

export { AppRouter as Router };
