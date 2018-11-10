import { C } from 'common';

const { SCREEN } = C;

export default async (component, { pin, store, navigation }) => {
  component.setState({ busy: true });
  const hash = await store.getHash(pin).catch(error => component.setState({ error }));
  if (hash) {
    const profile = await store.getProfile().catch(error => component.setState({ error }));
    await store.getTransactions().catch(error => component.setState({ error }));
    if (hash) navigation.navigate(SCREEN.DASHBOARD);
    if (hash) navigation.navigate(SCREEN.VAULT, profile.vaults[0]);
  }
  component.setState({ busy: false });
};
