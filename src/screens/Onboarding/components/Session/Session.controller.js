import * as LocalAuthentication from 'expo-local-authentication';

import { signup, getRates } from '@services';

export const askLocalAuthentication = async ({
  l10n,
  setPin,
  store: {
    settings: { pin },
  },
}) => {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    console.log({ hasHardware, isEnrolled });
    if (hasHardware && isEnrolled) {
      const { success } = await LocalAuthentication.authenticateAsync({
        promptMessage: l10n.AUTHENTICATE,
        cancelLabel: l10n.CANCEL,
        disableDeviceFallback: true,
      });

      if (success) setPin(pin);
    }
  } catch (e) {
    // @TODO
    console.log();
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
    updateRates(await getRates({ baseCurrency }).catch(() => {}));
  }

  onSession();
};
