import React, { Fragment } from 'react';

import { C } from './common';
import { useL10N, useNavigation, useStore } from './context';
import { THEME } from './reactor/common';
import { LayoutView, Snackbar } from './reactor/components';
import { DialogClone } from './components';
import {
  Session, Settings, Stats, Dashboard, Vault,
} from './screens';
import styles from './App.style';

const { SCREEN } = C;
const {
  SESSION, SETTINGS, STATS, DASHBOARD, VAULT,
} = SCREEN;
const { COLOR } = THEME;

export default () => {
  const {
    current, back, params, stack,
  } = useNavigation();
  const l10n = useL10N();
  const {
    error, onError, sync, vaults = [], tx,
  } = useStore();
  console.log('<App>');

  return (
    <LayoutView style={styles.container}>
      <Session backward={current !== SESSION} visible />

      { stack.includes(SESSION) && <Dashboard backward={current !== DASHBOARD} visible={stack.includes(DASHBOARD)} /> }

      { sync && stack.includes(DASHBOARD) && (
        <Fragment>
          <Settings visible={stack.includes(SETTINGS)} />
          <Vault
            backward={current !== VAULT}
            dataSource={stack.includes(VAULT) && params.Vault
              ? vaults.find(({ hash }) => hash === params.Vault.hash)
              : undefined}
            back={back}
            visible={stack.includes(VAULT)}
          />
          <Stats vault={params.Vault} visible={stack.includes(STATS)} />
          <DialogClone dataSource={tx} visible={tx !== undefined} />
        </Fragment>
      )}

      <Snackbar
        button={l10n.CLOSE.toUpperCase()}
        caption={error}
        color={COLOR.ERROR}
        onPress={() => onError(undefined)}
        visible={!!(error)}
      />
    </LayoutView>
  );
};
