import { bool, func } from 'prop-types';
import React, { useEffect } from 'react';
import { THEME } from 'reactor/common';
import { Motion } from 'reactor/components';

import { onHardwareBackPress } from '@common';
import { useConnection, useL10N, useSnackBar, useStore } from '@context';

import { Option } from '../Option';
import { getProfile } from '@services';
import styles from './Footer.style';

const { COLOR, SPACE } = THEME;

const MOTION_HIDE = SPACE.XXL * 2;

export const Footer = ({ onBack, onHardwareBack, showSync, visible }) => {
  const { connected } = useConnection();
  const l10n = useL10N();
  const snackbar = useSnackBar();
  const store = useStore();
  const { setSync, sync } = store;

  useEffect(() => {
    if (onHardwareBack) onHardwareBackPress(true, onHardwareBack);
    return () => {
      onHardwareBackPress(false);
    };
  }, [onHardwareBack]);

  const handleSync = async () => {
    setSync(false);
    await getProfile(store, snackbar);
    setSync(true);
  };

  return (
    <>
      <Motion
        style={styles.container}
        timeline={[{ property: 'translateY', value: connected && visible ? 0 : MOTION_HIDE }]}
      >
        {onBack && <Option selected onPress={onBack} caption={l10n.BACK} />}
        {showSync && (
          <Option icon={sync ? 'refresh' : 'cloud-download'} disabled={!sync} onPress={handleSync} selected={sync} />
        )}
      </Motion>
      <Motion style={styles.container} timeline={[{ property: 'translateY', value: !connected ? 0 : MOTION_HIDE }]}>
        <Option color={COLOR.ERROR} onPress={onBack} legend={l10n.OFFLINE_MODE} />
      </Motion>
    </>
  );
};

Footer.propTypes = {
  onBack: func,
  onHardwareBack: func,
  showSync: bool,
  visible: bool,
};
