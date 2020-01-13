import * as LocalAuthentication from 'expo-local-authentication';

export const onFingerprint = async ({ handleHandshake, setFingerprint, store }) => {
  try {
    if ((await LocalAuthentication.hasHardwareAsync()) && (await LocalAuthentication.isEnrolledAsync())) {
      setFingerprint(true);
      const { success } = await LocalAuthentication.authenticateAsync();
      if (success) handleHandshake(store.pin);
    } else setFingerprint(false);
  } catch (e) {
    setFingerprint(false);
  }
};
