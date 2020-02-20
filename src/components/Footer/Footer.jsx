import { func } from 'prop-types';
import React, { useEffect } from 'react';

import { THEME } from '../../reactor/common';
import { Button, Icon, Row } from '../../reactor/components';

import { onHardwareBackPress } from '../../common';
import { useConnection, useSnackBar, useStore } from '../../context';
import { getProfile } from '../../services';
import styles from './Footer.style';

const { COLOR, SPACE } = THEME;

const buttonProps = { color: COLOR.BRAND, marginLeft: 'S' };

const Footer = ({ onBack, onHardwareBack, onPress, ...inherit }) => {
  const { connected } = useConnection();
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
    <Row width="auto" justify="end" style={[styles.container, inherit.style]}>
      {onBack && (
        <Button {...buttonProps} outlined onPress={onBack}>
          <Icon value="arrow-left" color={COLOR.BRAND} size={SPACE.L} />
        </Button>
      )}

      {!onBack && (
        <Button
          {...buttonProps}
          activity={!sync}
          color={connected ? COLOR.BRAND : COLOR.ERROR}
          disabled={!sync}
          outlined
          onPress={connected ? handleSync : undefined}
        >
          {sync && (
            <Icon
              value={connected ? 'refresh' : 'wifi-off'}
              color={connected ? COLOR.BRAND : COLOR.ERROR}
              size={SPACE.L}
            />
          )}
        </Button>
      )}

      {onPress && connected && (
        <Button {...buttonProps} onPress={onPress}>
          <Icon value="plus" color={COLOR.BACKGROUND} size={SPACE.L} />
        </Button>
      )}
    </Row>
  );
};

Footer.propTypes = {
  onBack: func,
  onHardwareBack: func,
  onPress: func,
};

Footer.defaultProps = {
  onBack: undefined,
  onHardwareBack: undefined,
  onPress: undefined,
};

export { Footer };
