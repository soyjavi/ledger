import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';

import { Activity, Row, Text, Viewport } from '../../reactor/components';
import { useEnvironment } from '../../reactor/hooks';

import { LOGO } from '../../assets';
import { C } from '../../common';
import { useL10N, useNavigation, useSnackBar, useStore } from '../../context';
import { NumKeyboard } from './components';
import { onHandshake, onFingerprint, onPin } from './modules';
import styles from './Session.style';

const { IS_DEV, VERSION } = C;

const Session = (props) => {
  const { IS_WEB } = useEnvironment();
  const l10n = useL10N();
  const navigation = useNavigation();
  const store = useStore();
  const snackbar = useSnackBar();
  const [fingerprint, setFingerprint] = useState(undefined);
  const [pin, setPin] = useState('');
  const [busy, setBusy] = useState(false);

  const handleHandshake = onHandshake.bind(undefined, { navigation, setBusy, setPin, snackbar, store });
  const handleFingerprint = onFingerprint.bind(undefined, { handleHandshake, setFingerprint, store });
  const handlePin = onPin.bind(undefined, { handleHandshake, setPin, store });

  useEffect(() => {
    if (store.pin) {
      if (IS_DEV && IS_WEB) handleHandshake(store.pin);
      else if (fingerprint === undefined) setTimeout(handleFingerprint, 400);
    }
  }, [fingerprint, store.pin]);

  console.log('  <Session>', { fingerprint, busy, pin });

  return (
    <Viewport {...props} scroll={false}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Row justify="center">
            <Image source={LOGO} resizeMode="contain" style={styles.logo} />
            {['v', 'o', 'l', 't'].map((letter, index) => (
              <Text key={letter} headline style={[styles.name, pin.length > index && styles.active]}>
                {letter}
              </Text>
            ))}
          </Row>
          <Row>{busy && <Activity size="large" style={styles.activity} />}</Row>
        </View>

        <Text caption style={styles.textCenter}>
          {store.pin && fingerprint ? l10n.ENTER_PIN_OR_FINGERPRINT : l10n.ENTER_PIN}
        </Text>
        <NumKeyboard onPress={(number) => handlePin(`${pin}${number}`)} />
        <Text caption marginBottom="M" style={styles.textCenter}>{`v${VERSION}`}</Text>
      </View>
    </Viewport>
  );
};

export default React.memo(Session);
