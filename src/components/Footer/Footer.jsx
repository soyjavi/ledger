import { bool, func } from 'prop-types';
import React, { useEffect } from 'react';
import { THEME } from 'reactor/common';
import { Icon, Motion, Snackbar } from 'reactor/components';

import { onHardwareBackPress } from '@common';
import { useConnection, useL10N, useSnackBar, useStore } from '@context';

import { Option } from '../Option';
import { getProfile } from '@services';
import styles from './Footer.style';

const { COLOR, ICON, MOTION, SPACE } = THEME;

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
          <Option disabled={!sync} onPress={handleSync} selected={sync}>
            <Motion duration={MOTION.DURATION * 4} timeline={[{ property: 'rotate', value: sync ? 0 : 3.1 }]}>
              <Icon
                color={sync ? COLOR.BACKGROUND : COLOR.LIGHTEN}
                family={ICON.FAMILY}
                size={SPACE.L}
                value="refresh"
              />
            </Motion>
          </Option>
        )}
      </Motion>
      <Snackbar
        caption={l10n.OFFLINE_MODE}
        color={COLOR.ERROR}
        icon="ban"
        iconSize={SPACE.M}
        family={ICON.FAMILY}
        style={styles.snackbar}
        visible={!connected}
      />
    </>
  );
};

Footer.propTypes = {
  onBack: func,
  onHardwareBack: func,
  showSync: bool,
  visible: bool,
};
