import { C } from '../../../common';
import { getAuthorization, getProfile } from '../../../services';

const { SCREEN } = C;

export const onHandshake = async ({ navigation, store, setBusy, setPin, snackbar }, pin) => {
  const isSignup = store.pin === undefined;

  setBusy(true);
  if (isSignup) {
    const authorization = await getAuthorization(store, snackbar, pin);
    await getProfile(store, snackbar, authorization);
  } else {
    getProfile(store, snackbar);
  }
  navigation.go(SCREEN.DASHBOARD);
  // navigation.go(SCREEN.VAULT, store.vaults[1]);

  setBusy(false);
  setPin('');
};
