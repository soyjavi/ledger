import { C } from '../../../common';

const { SCREEN } = C;

export default async (component, { pin, store, navigation }) => {
  const isSignup = store.pin === undefined;
  let hash;

  component.setState({ busy: true });
  if (isSignup) {
    hash = await store.getHash(pin);
    await store.onSync();
  }

  navigation.navigate(SCREEN.DASHBOARD, undefined);

  if (!isSignup) {
    hash = await store.getHash(pin);
    store.onSync();
  }

  component.setState({ busy: false, pin: hash ? pin : '' });
};
