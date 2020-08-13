import { signup, getRates } from '@services';

export const onHandshake = async ({ onProfile, setBusy, store: { settings, updateRates, updateSettings } }, pin) => {
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

  onProfile();
};
