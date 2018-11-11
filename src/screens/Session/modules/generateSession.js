import { C } from 'common';

const { SCREEN } = C;

export default async (component, { pin, store, navigation }) => {
  component.setState({ busy: true });
  const hash = await store.getHash(pin).catch(error => component.setState({ error }));
  if (hash) {
    const session = await store.getProfile().catch(error => component.setState({ error }));
    await store.getTransactions().catch(error => component.setState({ error }));
    if (hash) navigation.navigate(SCREEN.DASHBOARD);

  console.log('session', session);
    // if (hash) navigation.navigate(SCREEN.VAULT, session.vaults[0]);
  }
  component.setState({ busy: false });
};
