import { C } from '../../../common';

const { SCREEN } = C;

export default async (component, { pin, store, navigation }) => {
  const { props } = component;

  component.setState({ busy: true });
  const hash = await store.getHash(pin).catch(error => component.setState({ error }));
  if (hash) {
    await store.onHandshake().catch(error => component.setState({ error }));
    navigation.navigate(SCREEN.DASHBOARD, undefined, props.navigation);
  }
  component.setState({ busy: false, pin: hash ? pin : '' });
};
