import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';

import { C, L10N } from '@common';
import { Dialog } from '@components';
import { useConnection, useSnackBar, useStore } from '@context';

import { getRates, getSyncStatus, syncNode } from './App.sync.controller';

const { TIMEOUT } = C;

const STATE = { UNKNOWN: 0, FETCHING: 1, UNSYNCED: 2, SYNCING: 3, SYNCED: 4 };

let syncTimeout;

const Sync = () => {
  const { connected } = useConnection();
  const snackbar = useSnackBar();
  const store = useStore();

  const [state, setState] = useState(undefined);

  useLayoutEffect(() => {
    (async () => {
      if (connected) {
        await getRates({ L10N, snackbar, store });
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
      if (state === STATE.SYNCING) snackbar.info({ id: 'snackbar-syncing', text: L10N.SYNC_BUSY });
      else if (state !== STATE.SYNCED) snackbar.hide('snackbar-syncing');
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

    if (synced) snackbar.success({ text: L10N.SYNC_DONE });
  };

  return (
    connected && (
      <Dialog
        accept={L10N.SYNC_NOW}
        cancel={L10N.LATER}
        text={L10N.SYNC_CAPTION}
        title={L10N.WARNING}
        isVisible={state === STATE.UNSYNCED}
        onAccept={handleSync}
        onCancel={() => setState(undefined)}
      />
    )
  );
};

export { Sync };
