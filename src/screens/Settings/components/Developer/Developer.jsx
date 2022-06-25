export * from './Developer';
import {
  // helpers,
  SIZE,
  // components
  View,
  useStack,
} from '@lookiero/aurora';
import React, { useState } from 'react';

import { L10N } from '@common';
import { Button, Heading, Notification } from '@components';
import { useStore } from '@context';

import { getBlockchain } from '../QR/helpers';

const Developer = () => {
  const Stack = useStack();
  const store = useStore();

  const [busy, setBusy] = useState(false);

  const handleImport = async () => {
    setBusy(true);
    const qr = '9C9C1EF6-9F69-4EC0-8B62-A5CB05CD6167|00aa0c49884d4e674ead7d1e530dff8c3a82b72c5d6652a34dc50b3ce12aa30f';

    const blockchain = await getBlockchain({ qr, store });

    const success = await store.fork(blockchain);
    if (success) Stack.success('forked', Notification, { text: L10N.FORKED_CORRECTLY });
    setBusy(false);
  };

  return (
    <View marginHorizontal={SIZE.M} marginBottom={SIZE.L}>
      <Heading value={L10N.DEVELOPER_SETTINGS} />

      <Button busy={busy} marginTop={SIZE.S} wide onPress={handleImport}>
        Import from another device
      </Button>
    </View>
  );
};

export { Developer };
