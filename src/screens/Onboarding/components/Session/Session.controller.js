import * as LocalAuthentication from 'expo-local-authentication';

import { THEME } from 'reactor/common';

import { ServiceRates, signup } from '@services';

const { MOTION } = THEME;

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

export const onHandshake = async ({ onSession, setBusy, store: { settings, updateRates, updateSettings } }, pin) => {
  const { fingerprint, baseCurrency } = settings;
  const isSignup = settings.pin === undefined;

  setBusy(true);
  if (isSignup) {
    await updateSettings({
      pin,
      onboarded: true,
      authorization: await signup({ fingerprint }),
    });
  } else {
    setTimeout(async () => {
      updateRates(await ServiceRates.get({ baseCurrency }).catch(() => {}));
    }, MOTION.EXPAND * 2);
  }

  onSession();
};
