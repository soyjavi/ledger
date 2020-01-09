import { C } from '../../../common';
import { getAuthorization, getProfile } from '../../../services';

const { SCREEN } = C;

export const onHandshake = async ({ navigation, store, setBusy, setPin, snackbar }, pin) => {
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
