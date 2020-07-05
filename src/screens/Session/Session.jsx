import PropTypes from 'prop-types';

import React, { useEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Activity, Row, Text, View, Viewport } from 'reactor/components';
import { useEnvironment } from 'reactor/hooks';

import { C } from '@common';
import { useL10N, useSnackBar, useStore } from '@context';

import { NumKeyboard } from './components';
import { onHandshake, onFingerprint, onPin } from './modules';
import styles from './Session.style';

const { IS_DEV, VERSION } = C;
const { COLOR } = THEME;

export const Session = ({ onProfile, visible, ...others }) => {
  const { IS_WEB } = useEnvironment();
  const l10n = useL10N();
  const store = useStore();
  const snackbar = useSnackBar();

  const [busy, setBusy] = useState(false);
  const [fingerprint, setFingerprint] = useState(undefined);
  const [pin, setPin] = useState('');

  const handleHandshake = onHandshake.bind(undefined, { onProfile, setBusy, setPin, snackbar, store });
  const handleFingerprint = onFingerprint.bind(undefined, { handleHandshake, setFingerprint, store });
  const handlePin = onPin.bind(undefined, { handleHandshake, setPin, store });

  useEffect(() => {
    const { pin, vaults = [] } = store;
    if (visible && pin && vaults.length > 0) {
      if (IS_DEV && IS_WEB) handleHandshake(pin);
      else if (fingerprint === undefined) setTimeout(handleFingerprint, 400);
    }
  }, [fingerprint, store.pin, visible]);

  const signup = store.authorization === undefined;

  return (
    <Viewport {...others} visible={visible} scroll={false}>
      <View style={styles.container}>
        <Text headline>{signup ? l10n.PIN_CHOOSE : l10n.PIN}</Text>
        <Row justify="center" style={styles.input}>
          {!busy ? (
            <>
              {['•', '•', '•', '•'].map((letter, index) => (
                <Text key={index} headline color={pin.length <= index ? COLOR.LIGHTEN : undefined}>
                  {letter}
                </Text>
              ))}
            </>
          ) : (
            <Activity />
          )}
        </Row>

        <NumKeyboard onPress={(number) => handlePin(`${pin}${number}`)} />
        <Text caption color={COLOR.LIGHTEN} marginBottom="M">{`v${VERSION}`}</Text>
      </View>
    </Viewport>
  );
};

Session.propTypes = {
  onProfile: PropTypes.func,
  signup: PropTypes.bool,
  visible: PropTypes.bool,
};
