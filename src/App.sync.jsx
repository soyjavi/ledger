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
const { COLOR, ICON, MOTION, SPACE } = THEME;

const STATE = { UNKNOWN: 0, FETCHING: 1, UNSYNCED: 2, SYNCING: 3, SYNCED: 4 };

const Sync = () => {
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

  const showStatus = !connected || state === STATE.FETCHING;

  return (
    <>
      {stack.includes(DASHBOARD) && (
        <Motion
          duration={showStatus ? MOTION.EXPAND : MOTION.COLLAPSE}
          style={[styles.status, { backgroundColor: !connected ? COLOR.ERROR : COLOR.TEXT }]}
          timeline={[{ property: 'translateY', value: showStatus ? 0 : -SPACE.XXL }]}
          type="spring"
        >
          <Text bold caption color={COLOR.BACKGROUND}>
            {!connected ? l10n.NOT_CONNECTED : l10n.WAIT}
          </Text>
        </Motion>
      )}

      <Snackbar
        caption={state === STATE.SYNCING ? l10n.SYNC_BUSY : l10n.SYNC_SENTENCE_1}
        color={state === STATE.SYNCING ? COLOR.TEXT : COLOR.ERROR}
        iconFamily={ICON.FAMILY}
        iconSize={SPACE.M}
        onClose={state === STATE.UNSYNCED ? () => setState(undefined) : undefined}
        visible={[STATE.UNSYNCED, STATE.SYNCING].includes(state)}
        position="top"
      >
        {state === STATE.UNSYNCED && (
          <>
            <Touchable marginHorizontal="XS" onPress={handleSync} size="S">
              <Text bold caption color={COLOR.WHITE} underlined>
                {l10n.SYNC_NOW}
              </Text>
            </Touchable>
            <Text caption color={COLOR.WHITE}>
              {l10n.SYNC_SENTENCE_2}
            </Text>
          </>
        )}
      </Snackbar>
    </>
  );
};

export { Sync };
