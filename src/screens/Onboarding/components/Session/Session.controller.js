import * as LocalAuthentication from 'expo-local-authentication';

import { L10N } from '@common';
import { ServiceNode } from '@services';

export const askLocalAuthentication = async ({
  setPin,
  store: {
    settings: { pin },
  },
}) => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (hasHardware && isEnrolled) {
    const { success } = await LocalAuthentication.authenticateAsync({
      promptMessage: L10N.AUTHENTICATE,
      cancelLabel: L10N.CANCEL,
      disableDeviceFallback: true,
    });

    if (success) setPin(pin);
  }
};

export const onHandshake = async ({ onSession, store: { settings, updateSettings } }, pin) => {
  const { fingerprint } = settings;
  const isSignup = settings.pin === undefined;

  if (isSignup)
    await updateSettings({
      pin,
      onboarded: true,
      authorization: await ServiceNode.signup({ fingerprint }),
    });

  onSession();
};
