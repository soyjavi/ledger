import { func } from 'prop-types';

import React, { useEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Motion, Snackbar, Text, Touchable } from 'reactor/components';

import { onHardwareBackPress } from '@common';
import { useConnection, useL10N, useSnackBar, useStore } from '@context';

import { Option } from '../Option';
import styles from './Footer.style';
import { handleSync } from './modules';

const { COLOR, ICON, SPACE } = THEME;

const MOTION_HIDE = SPACE.XXL * 2;
const TIMEOUT_CHECK_SYNC = 5000;

export const Footer = ({ onBack, onHardwareBack }) => {
  const { connected } = useConnection();
  const l10n = useL10N();
  const snackbar = useSnackBar();
  const store = useStore();

  const [sync, setSync] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (onHardwareBack) onHardwareBackPress(true, onHardwareBack);
    return () => onHardwareBackPress(false);
  }, [onHardwareBack]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      setBusy(false);
      setSync(await handleSync({ connected, snackbar, store }));
    }, TIMEOUT_CHECK_SYNC);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, store]);

  const handlePressSync = async () => {
    setBusy(true);
    // @TODO: Sync with server
    setTimeout(() => {
      // await syncBlockchain(store, snackbar);
      setSync(true);
      setBusy(true);
      snackbar.success('Sync successfull');
    }, 2000);
  };

  return (
    <>
      <Motion style={styles.container} timeline={[{ property: 'translateY', value: !busy || !sync ? 0 : MOTION_HIDE }]}>
        {onBack && <Option selected onPress={onBack} icon="arrow-left" />}
      </Motion>

      <Snackbar
        caption={busy ? l10n.SYNC_BUSY : l10n.SYNC}
        color={busy ? COLOR.TEXT : COLOR.ERROR}
        icon={busy ? 'hourglass' : 'question'}
        iconSize={SPACE.M}
        family={ICON.FAMILY}
        style={styles.snackbar}
        visible={!sync}
      >
        {!busy ? (
          <>
            <Touchable onPress={handlePressSync}>
              <Text bold color={COLOR.BACKGROUND}>
                {l10n.SYNC_NOW}
              </Text>
            </Touchable>
            <Touchable onPress={() => setSync(true)}>
              <Text bold color={COLOR.BACKGROUND}>
                NO
              </Text>
            </Touchable>
          </>
        ) : (
          <></>
        )}
      </Snackbar>
    </>
  );
};

Footer.propTypes = {
  onBack: func,
  onHardwareBack: func,
};
