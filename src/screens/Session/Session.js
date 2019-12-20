import * as LocalAuthentication from 'expo-local-authentication';
import React, { Fragment, useEffect, useState } from 'react';
import { Image, View } from 'react-native';

import { LOGO } from '../../assets';
import { C } from '../../common';
import { useL10N, useNavigation, useStore } from '../../context';
import { THEME } from '../../reactor/common';
import {
  Activity, Motion, Text, Viewport,
} from '../../reactor/components';
import { NumKeyboard } from './components';
import styles from './Session.style';

const { IS_DEV, SCREEN, VERSION } = C;
const { MOTION: { DURATION } } = THEME;

const Session = (props) => {
  const l10n = useL10N();
  const navigation = useNavigation();
  const store = useStore();
  const [fingerprint, setFingerprint] = useState(undefined);
  const [pin, setPin] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    async function askFingerprint() {
      setFingerprint(
        IS_DEV || (await LocalAuthentication.hasHardwareAsync() && await LocalAuthentication.isEnrolledAsync()),
      );
    }
    if (fingerprint === undefined) askFingerprint();
  }, [fingerprint]);


  const onHandshake = async (usedPin) => {
    const isSignup = store.pin === undefined;

    setBusy(true);
    if (isSignup) {
      await store.signup(usedPin);
      await store.onSync();
    }

    navigation.go(SCREEN.DASHBOARD);
    if (!isSignup) store.onSync();

    setBusy(false);
    setPin('');
  };

  const onFingerprint = async () => {
    setFingerprint(false);
    let needHandshake = false;

    try {
      const { error, success } = await LocalAuthentication.authenticateAsync();
      if (success) needHandshake = true;
      else if (error) setFingerprint(true);
    } catch (error) {
      if (IS_DEV) needHandshake = true;
    }

    if (needHandshake) onHandshake(store.pin);
  };

  const onPin = (next) => {
    setPin(next);

    if (next.length === 4) {
      setTimeout(() => {
        console.log('onPin()', { next, store: store.pin });
        if (store.pin === undefined || store.pin === next) onHandshake(next);
        else setPin('');
      }, DURATION / 2);
    }
  };

  console.log('<Session>', { fingerprint, busy, pin });

  return (
    <Viewport {...props} scroll={false} visible>
      <View style={styles.container}>
        { fingerprint && store.pin ? (onFingerprint() && <Fragment />) : undefined }
        <View style={styles.content}>
          <View style={styles.row}>
            <Image source={LOGO} resizeMode="contain" style={styles.logo} />
            <Text headline style={styles.textName}>volt.</Text>
          </View>
          <View style={styles.pin}>
            { busy
              ? <Activity size="large" style={styles.activity} />
              : [1, 2, 3, 4].map((number) => (
                <Motion
                  key={number}
                  style={[styles.bullet, pin.length >= number && styles.bulletActive]}
                  timeline={[{ property: 'scale', value: pin.length >= number ? 1 : 0.8 }]}
                />
              ))}
          </View>
          <Text lighten>
            { store.pin && fingerprint ? l10n.ENTER_PIN_OR_FINGERPRINT : l10n.ENTER_PIN }
          </Text>
        </View>

        <NumKeyboard onPress={(number) => onPin(`${pin}${number}`)} />
        <Text lighten caption style={styles.textVersion}>{`v${VERSION}`}</Text>
      </View>
    </Viewport>
  );
};

export default Session;
