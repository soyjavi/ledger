import { C } from '../../../common';

const { SCREEN } = C;

export default async (component, { pin, store, navigation }) => {
  component.setState({ busy: true });

  const hash = await store.getHash(pin).catch(error => component.setState({ error }));
  if (hash) {
    await store.handshake().catch(error => component.setState({ error }));
    navigation.navigate(SCREEN.DASHBOARD);
  }

  component.setState({ busy: false, pin: hash ? pin : '' });
};
