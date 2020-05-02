import { getAuthorization, getProfile } from '@services';

export const onHandshake = async ({ onProfile, store, setBusy, setPin, snackbar }, pin) => {
  const isSignup = store.pin === undefined;

  const handleError = () => {
    setBusy(false);
    setPin('');
  };

  setBusy(true);

  if (isSignup) {
    const authorization = await getAuthorization(store, snackbar, pin).catch(handleError);
    await getProfile(store, snackbar, authorization).catch(handleError);
  } else {
    getProfile(store, snackbar).catch(handleError);
  }

  onProfile();
};
