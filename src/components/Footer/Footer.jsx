import { bool, func } from 'prop-types';
import React, { useEffect } from 'react';

import { THEME } from '../../reactor/common';
import { Button, Icon, Motion, Row } from '../../reactor/components';

import { onHardwareBackPress } from '../../common';
import { useConnection, useL10N, useSnackBar, useStore } from '../../context';
import { getProfile } from '../../services';
import styles from './Footer.style';

const { COLOR, SPACE } = THEME;

const BUTTON = { marginLeft: 'S', style: styles.button };
const BUTTON_OUTLINED = { ...BUTTON, outlined: true, style: [styles.button, styles.buttonOutlined] };
const MOTION_HIDE = SPACE.XXL * 2;

export const Footer = ({ onBack, onHardwareBack, onPress, scroll }) => {
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
        timeline={[{ property: 'translateY', value: connected && !scroll ? 0 : MOTION_HIDE }]}
      >
        <Row width="auto" justify="end">
          {onBack ? (
            <Button {...BUTTON_OUTLINED} onPress={onBack}>
              <Icon value="arrow-left" size={SPACE.L} />
            </Button>
          ) : (
            <Button
              {...BUTTON_OUTLINED}
              outlined={sync}
              activity={!sync}
              disabled={!sync}
              onPress={sync ? handleSync : undefined}
            >
              {sync && <Icon value={'refresh'} size={SPACE.L} />}
            </Button>
          )}

          {onPress && (
            <Button {...BUTTON} onPress={onPress}>
              <Icon value="plus" color={COLOR.BACKGROUND} size={SPACE.L} />
            </Button>
          )}
        </Row>
      </Motion>
      <Motion style={styles.container} timeline={[{ property: 'translateY', value: !connected ? 0 : MOTION_HIDE }]}>
        <Button color={COLOR.ERROR} size="S" title={l10n.OFFLINE_MODE} />
      </Motion>
    </>
  );
};

Footer.propTypes = {
  onBack: func,
  onHardwareBack: func,
  onPress: func,
  scroll: bool,
};
