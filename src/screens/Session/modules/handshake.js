import { C } from '../../../common';

const { SCREEN } = C;

export default async (component, { pin, store, navigation }) => {
  const { props: { isConnected } } = component;

  const isSignup = store.pin === undefined;

  component.setState({ busy: true });
  if (isSignup) {
    await store.getHash(pin);
    await store.onSync();
  }

  navigation.navigate(SCREEN.DASHBOARD);

  if (!isSignup && isConnected) {
    await store.getHash(pin);
    store.onSync();
  }

  // navigation.navigate(SCREEN.STATS);

  component.setState({ busy: false, pin: '' });
};
