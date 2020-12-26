import * as LocalAuthentication from 'expo-local-authentication';

import { ServiceNode } from '@services';

export const askLocalAuthentication = async ({
  l10n,
  setPin,
  store: {
    settings: { pin },
  },
}) => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (hasHardware && isEnrolled) {
    const { success } = await LocalAuthentication.authenticateAsync({
      promptMessage: l10n.AUTHENTICATE,
      cancelLabel: l10n.CANCEL,
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
