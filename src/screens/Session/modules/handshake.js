import { C } from '../../../common';

const { SCREEN } = C;

export default async (component, { pin, store, navigation }) => {
  const { props: { isConnected } } = component;
  const isSignup = store.pin === undefined;

  component.setState({ busy: true });
  if (isSignup) {
    await store.signup(pin);
    await store.onSync();
  }

  navigation.navigate(SCREEN.DASHBOARD);
  // navigation.navigate(SCREEN.VAULTS);

  if (!isSignup && isConnected) store.onSync();

  component.setState({ busy: false, pin: '' });
};
