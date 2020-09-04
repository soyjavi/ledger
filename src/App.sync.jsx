import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Motion, Snackbar, Text, Touchable } from 'reactor/components';

import { C } from '@common';
import { useConnection, useL10N, useNavigation, useSnackBar, useStore } from '@context';

import styles from './App.style';
import { getSyncStatus, syncNode } from './App.sync.controller';

const {
  TIMEOUT,
  SCREEN: { DASHBOARD },
} = C;
const { COLOR, ICON, SPACE } = THEME;

const STATE = { UNKNOWN: 0, FETCHING: 1, UNSYNCED: 2, SYNCING: 3, SYNCED: 4 };

export const Sync = () => {
  const { connected } = useConnection();
  const { stack = [] } = useNavigation();
  const l10n = useL10N();
  const snackbar = useSnackBar();
  const store = useStore();

  const [state, setState] = useState(STATE.UNKNOWN);

  useLayoutEffect(() => {
    if (connected && stack.includes(DASHBOARD) && state === STATE.UNKNOWN) handleState();
  }, [connected, handleState, stack, state]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!connected || [STATE.UNKNOWN, STATE.FETCHING, STATE.SYNCING].includes(state)) clearTimeout(timeout);
      else handleState();
    }, TIMEOUT.SYNC);

    return () => clearTimeout(timeout);
  }, [connected, handleState, state, store]);

  const handleState = useCallback(async () => {
    setState(STATE.FETCHING);
    const synced = await getSyncStatus({ setState, snackbar, STATE, store });
    if (synced === undefined) setState(STATE.UNKNOWN);
    else setState(synced ? STATE.SYNCED : STATE.UNSYNCED);
  }, [snackbar, store]);

  const handleSync = async () => {
    setState(STATE.SYNCING);
    const synced = await syncNode({ store, snackbar });
    setState(synced ? STATE.SYNCED : STATE.UNSYNCED);
    if (synced) snackbar.success(l10n.SYNC_DONE);
  };

  return (
    <>
      {stack.includes(DASHBOARD) && (
        <Motion
          style={[styles.status, { backgroundColor: !connected ? COLOR.ERROR : COLOR.TEXT }]}
          timeline={[{ property: 'translateY', value: !connected || state === STATE.FETCHING ? 0 : SPACE.XXL }]}
        >
          <Text bold caption color={COLOR.BACKGROUND}>
            {!connected ? 'Not connected' : 'Wait a moment...'}
          </Text>
        </Motion>
      )}

      <Snackbar
        caption={state === STATE.SYNCING ? l10n.SYNC_BUSY : l10n.SYNC_SENTENCE_1}
        color={state === STATE.SYNCING ? COLOR.TEXT : COLOR.ERROR}
        icon={state === STATE.SYNCING ? 'hourglass' : undefined}
        iconFamily={ICON.FAMILY}
        iconSize={SPACE.M}
        onClose={state === STATE.UNSYNCED ? () => setState(undefined) : undefined}
        visible={[STATE.UNSYNCED, STATE.SYNCING].includes(state)}
      >
        {state === STATE.UNSYNCED && (
          <>
            <Touchable marginHorizontal="XS" onPress={handleSync} size="S">
              <Text bold color={COLOR.WHITE} underlined>
                {l10n.SYNC_NOW}
              </Text>
            </Touchable>
            <Text color={COLOR.WHITE}>{l10n.SYNC_SENTENCE_2}</Text>
          </>
        )}
      </Snackbar>
    </>
  );
};
