import { func } from 'prop-types';

import React, { useEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Motion, Snackbar, Text, Touchable } from 'reactor/components';

import { onHardwareBackPress } from '@common';
import { useConnection, useL10N, useSnackBar, useStore } from '@context';

import { Option } from '../Option';
import { isSynced, syncNode } from './Footer.controller';
import styles from './Footer.style';

const { COLOR, ICON, SPACE } = THEME;

const MOTION_HIDE = SPACE.XXL * 2;
const TIMEOUT_CHECK_SYNC = 1000;

export const Footer = ({ onBack, onHardwareBack }) => {
  const { connected } = useConnection();
  const l10n = useL10N();
  const snackbar = useSnackBar();
  const store = useStore();

  const [synced, setSynced] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (onHardwareBack) onHardwareBackPress(true, onHardwareBack);
    return () => onHardwareBackPress(false);
  }, [onHardwareBack]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      setBusy(false);
      if (connected) setSynced(await isSynced({ snackbar, store }));
    }, TIMEOUT_CHECK_SYNC);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, store]);

  const handleSync = async () => {
    setBusy(true);
    const success = await syncNode({ store, snackbar });
    setSynced(true);
    setBusy(false);
    if (success) snackbar.success(l10n.SYNC_DONE);
  };

  return (
    <>
      <Motion style={styles.container} timeline={[{ property: 'translateY', value: synced ? 0 : MOTION_HIDE }]}>
        {onBack && <Option selected onPress={onBack} icon="arrow-left" />}
      </Motion>

      <Snackbar
        caption={busy ? l10n.SYNC_BUSY : l10n.SYNC_SENTENCE_1}
        color={busy ? COLOR.TEXT : COLOR.ERROR}
        icon={busy ? 'hourglass' : 'question'}
        iconSize={SPACE.M}
        family={ICON.FAMILY}
        onClose={() => setSynced(true)}
        style={styles.snackbar}
        visible={!synced}
      >
        {!busy && (
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

Footer.propTypes = {
  onBack: func,
  onHardwareBack: func,
};
