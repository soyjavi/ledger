import * as LocalAuthentication from 'expo-local-authentication';
import React, { useEffect, useState } from 'react';
import { Image, View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Activity, Text, Viewport } from '../../reactor/components';

import { LOGO } from '../../assets';
import { C } from '../../common';
import { useL10N, useNavigation, useStore } from '../../context';
import { getAuthorization, getProfile } from '../../services';
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


  const onHandshake = async (pin) => {
    const isSignup = store.pin === undefined;

    setBusy(true);
    if (isSignup) {
      const authorization = await getAuthorization(store, pin);
      await getProfile(store, authorization);
      navigation.go(SCREEN.DASHBOARD);
    } else {
      navigation.go(SCREEN.DASHBOARD);
      await getProfile(store);
    }
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
        if (store.pin === undefined || store.pin === next) onHandshake(next);
        else setPin('');
      }, DURATION / 2);
    }
  };

  console.log('<Session>', { fingerprint, busy, pin });
  if (!busy && fingerprint && store.pin) onFingerprint();

  return (
    <Viewport {...props} scroll={false} visible style={{ margin: 0, padding: 0 }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.row}>
            <Image source={LOGO} resizeMode="contain" style={styles.logo} />
            { ['v', 'o', 'l', 't'].map((letter, index) => (
              <Text key={letter} headline style={[styles.name, pin.length > index && styles.active]}>{letter}</Text>
            ))}
          </View>
          <View style={styles.row}>
            { busy && <Activity size="large" style={styles.activity} /> }
          </View>
        </View>

        <Text caption lighten style={styles.textCenter}>
          { store.pin && fingerprint ? l10n.ENTER_PIN_OR_FINGERPRINT : l10n.ENTER_PIN }
        </Text>
        <NumKeyboard onPress={(number) => onPin(`${pin}${number}`)} />
        <Text lighten caption style={styles.textCenter}>{`v${VERSION}`}</Text>
      </View>
    </Viewport>
  );
};

export default Session;
