import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { THEME } from 'reactor/common';
import { Alert, Motion, Snackbar, Text } from 'reactor/components';

import { C } from '@common';
import { useConnection, useL10N, useSnackBar, useStore } from '@context';

import styles from './App.style';
import { getRates, getSyncStatus, syncNode } from './App.sync.controller';

const { DELAY_PRESS_MS, TIMEOUT } = C;
const { COLOR, MOTION, SPACE } = THEME;

const STATE = { UNKNOWN: 0, FETCHING: 1, UNSYNCED: 2, SYNCING: 3, SYNCED: 4 };

let syncTimeout;

const Sync = () => {
  const { connected } = useConnection();
  const l10n = useL10N();
  const snackbar = useSnackBar();
  const store = useStore();

  const [state, setState] = useState(undefined);

  useLayoutEffect(() => {
    (async () => {
      if (connected) {
        await getRates({ l10n, snackbar, store });
        setState(STATE.UNKNOWN);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  useLayoutEffect(() => {
    if (connected && state === STATE.UNKNOWN) handleState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, state]);

  useEffect(() => {
    if (!connected || [STATE.UNKNOWN, STATE.FETCHING, STATE.SYNCING].includes(state)) clearTimeout(syncTimeout);
    else syncTimeout = setTimeout(handleState, TIMEOUT.SYNC);

    return () => clearTimeout(syncTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, state, store]);

  const handleState = useCallback(async () => {
    setState(STATE.FETCHING);
    const synced = await getSyncStatus({ setState, snackbar, STATE, store });

    if (synced === undefined) setState(STATE.UNKNOWN);
    else setState(synced ? STATE.SYNCED : STATE.UNSYNCED);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, store]);

  const handleSync = async () => {
    setState(STATE.SYNCING);
    const synced = await syncNode({ store, snackbar });
    setState(synced ? STATE.SYNCED : STATE.UNSYNCED);
    if (synced) snackbar.success(l10n.SYNC_DONE);
  };

  return (
    <>
      <SafeAreaView>
        <Motion
          duration={!connected ? MOTION.EXPAND : MOTION.COLLAPSE}
          style={styles.connected}
          timeline={[{ property: 'translateY', value: !connected ? 0 : -(SPACE.XXL * 4) }]}
          type="spring"
        >
          <Text bold caption>
            {l10n.OFFLINE}
          </Text>
        </Motion>
      </SafeAreaView>

      {connected && state !== undefined && (
        <>
          <Alert
            accept={l10n.SYNC_NOW}
            cancel={l10n.LATER}
            caption={l10n.SYNC_CAPTION}
            delay={DELAY_PRESS_MS}
            position="bottom"
            title={l10n.WARNING}
            visible={STATE.UNSYNCED === state}
            onAccept={handleSync}
            onCancel={() => setState(undefined)}
            onClose={() => setState(undefined)}
          />

          <Snackbar caption={l10n.SYNC_BUSY} color={COLOR.BASE} position="top" visible={STATE.SYNCING === state} />
        </>
      )}
    </>
  );
};

export { Sync };
