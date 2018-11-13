import { C } from 'common';

const { SCREEN } = C;

export default async (component, { pin, store, navigation }) => {
  const hash = await store.getHash(pin).catch(error => component.setState({ error }));
  if (hash) {
    await store.getProfile().catch(error => component.setState({ error }));
    await store.getTransactions().catch(error => component.setState({ error }));
    if (hash) navigation.navigate(SCREEN.DASHBOARD);
  }
  component.setState({ busy: false });
};
