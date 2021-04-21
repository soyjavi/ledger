import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Alert } from 'reactor/components';

import { C } from '@common';
import { useConnection, useL10N, useSnackBar, useStore } from '@context';

import { getRates, getSyncStatus, syncNode } from './App.sync.controller';

const { DELAY_PRESS_MS, TIMEOUT } = C;
const { COLOR } = THEME;

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

    if (connected) {
      if (state === STATE.SYNCING) snackbar.info(l10n.SYNC_BUSY, false);
      else if (state !== STATE.SYNCED) snackbar.close();
    }

    return () => clearTimeout(syncTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, state, store]);

  const handleState = useCallback(async () => {
    setState(STATE.FETCHING);
    const synced = await getSyncStatus({ setState, snackbar, STATE, store });

    if (synced === undefined && state !== STATE.UNKNOWN) setState(STATE.UNKNOWN);
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
    connected && (
      <Alert
        accept={l10n.SYNC_NOW}
        cancel={l10n.LATER}
        caption={l10n.SYNC_CAPTION}
        delay={DELAY_PRESS_MS}
        position="bottom"
        style={{ backgroundColor: COLOR.ERROR }}
        title={l10n.WARNING}
        visible={state === STATE.UNSYNCED}
        onAccept={handleSync}
        onCancel={() => setState(undefined)}
      />
    )
  );
};

export { Sync };
