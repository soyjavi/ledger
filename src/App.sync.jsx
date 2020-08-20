import React, { useEffect, useLayoutEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Motion, Snackbar, Text, Touchable, View } from 'reactor/components';

import { C } from '@common';
import { useConnection, useL10N, useSnackBar, useStore } from '@context';

import styles from './App.style';
import { getSyncStatus, syncNode } from './App.sync.controller';

const { TIMEOUT } = C;
const { COLOR, ICON, SPACE } = THEME;

const STATE = { UNKNOWN: 0, FETCHING: 1, UNSYNCED: 2, SYNCING: 3, SYNCED: 4 };

export const Sync = () => {
  const { connected } = useConnection();
  const l10n = useL10N();
  const snackbar = useSnackBar();
  const store = useStore();

  const [state, setState] = useState(STATE.UNKNOWN);

  useLayoutEffect(() => {
    if (connected && state === STATE.UNKNOWN) handleState();
  }, [connected, handleState, state]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!connected || [STATE.UNKNOWN, STATE.FETCHING, STATE.SYNCING].includes(state)) clearTimeout(timeout);
      else handleState();
    }, TIMEOUT.SYNC);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, state, store]);

  const handleState = async () => {
    setState(STATE.FETCHING);
    const synced = await getSyncStatus({ snackbar, store });
    setState(synced ? STATE.SYNCED : STATE.UNSYNCED);
  };

  const handleSync = async () => {
    setState(STATE.SYNCING);
    const synced = await syncNode({ store, snackbar });
    setState(synced ? STATE.SYNCED : STATE.UNSYNCED);
    if (synced) snackbar.success(l10n.SYNC_DONE);
  };

  const isSyncing = state === STATE.SYNCING;

  return (
    <>
      <Motion
        style={[styles.status, { backgroundColor: !connected ? COLOR.ERROR : COLOR.TEXT }]}
        timeline={[{ property: 'translateY', value: !connected || state === STATE.FETCHING ? 0 : SPACE.XXL }]}
      >
        <Text bold caption color={COLOR.BACKGROUND}>
          {!connected ? 'Not connected' : 'Wait a moment...'}
        </Text>
      </Motion>

      <Snackbar
        caption={isSyncing ? l10n.SYNC_BUSY : l10n.SYNC_SENTENCE_1}
        color={isSyncing ? COLOR.TEXT : COLOR.ERROR}
        icon={isSyncing ? 'hourglass' : undefined}
        iconSize={SPACE.M}
        family={ICON.FAMILY}
        onClose={state === STATE.UNSYNCED ? () => setState(undefined) : undefined}
        style={styles.snackbar}
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
