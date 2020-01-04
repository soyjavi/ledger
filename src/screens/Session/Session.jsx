import * as LocalAuthentication from 'expo-local-authentication';
import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';

import { ENV, THEME } from '../../reactor/common';
import { Activity, Text, Viewport } from '../../reactor/components';

import { LOGO } from '../../assets';
import { C } from '../../common';
import { useL10N, useNavigation, useSnackBar, useStore } from '../../context';
import { getAuthorization, getProfile } from '../../services';
import { NumKeyboard } from './components';
import styles from './Session.style';

const { IS_DEV, SCREEN, VERSION } = C;
const {
  MOTION: { DURATION },
} = THEME;

const Session = (props) => {
  const l10n = useL10N();
  const navigation = useNavigation();
  const store = useStore();
  const snackbar = useSnackBar();
  const [fingerprint, setFingerprint] = useState(undefined);
  const [pin, setPin] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    async function askFingerprint() {
      try {
        if ((await LocalAuthentication.hasHardwareAsync()) && (await LocalAuthentication.isEnrolledAsync())) {
          setFingerprint(true);
          const { success } = await LocalAuthentication.authenticateAsync();
          if (success) onHandshake(store.pin);
        } else setFingerprint(false);
      } catch (e) {
        setFingerprint(false);
      }
    }

    if (store.pin) {
      if (IS_DEV && ENV.IS_WEB) onHandshake(store.pin);
      else if (fingerprint === undefined) askFingerprint();
    }
  }, [fingerprint, store.pin]);

  const onHandshake = async (pin) => {
    const isSignup = store.pin === undefined;

    setBusy(true);
    if (isSignup) {
      const authorization = await getAuthorization(store, snackbar, pin);
      await getProfile(store, snackbar, authorization);
      navigation.go(SCREEN.DASHBOARD);
    } else {
      navigation.go(SCREEN.DASHBOARD);
      await getProfile(store, snackbar);
    }
    setBusy(false);
    setPin('');
  };

  const onPin = (next) => {
    setPin(next);

    if (next.length === 4) {
      setTimeout(() => {
        if (store.pin === undefined || store.pin === next) onHandshake(next);
        else setPin('');
      }, DURATION / 2);
    }
  };

  console.log('<Session>', { fingerprint, busy, pin });

  return (
    <Viewport {...props} scroll={false}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.row}>
            <Image source={LOGO} resizeMode="contain" style={styles.logo} />
            {['v', 'o', 'l', 't'].map((letter, index) => (
              <Text key={letter} headline style={[styles.name, pin.length > index && styles.active]}>
                {letter}
              </Text>
            ))}
          </View>
          <View style={styles.row}>{busy && <Activity size="large" style={styles.activity} />}</View>
        </View>

        <Text caption lighten style={styles.textCenter}>
          {store.pin && fingerprint ? l10n.ENTER_PIN_OR_FINGERPRINT : l10n.ENTER_PIN}
        </Text>
        <NumKeyboard onPress={(number) => onPin(`${pin}${number}`)} />
        <Text lighten caption style={styles.textCenter}>{`v${VERSION}`}</Text>
      </View>
    </Viewport>
  );
};

export default Session;
