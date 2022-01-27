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
    const blockchain = await getBlockchain({ qr: 'C8647639-4826-4AC7-9655-6BDC2C15D9D2|backup', store });
    const success = await store.fork(blockchain);
    if (success) Stack.success('forked', Notification, { text: L10N.FORKED_CORRECTLY });
    setBusy(false);
  };

  const handlePort = async () => {
    setBusy(true);
    await store.port();
    setBusy(false);
  };

  return (
    <View marginHorizontal={SIZE.M} marginBottom={SIZE.L}>
      <Heading value={L10N.DEVELOPER_SETTINGS} />

      <Button busy={busy} marginTop={SIZE.S} wide onPress={handleImport}>
        Import from another device
      </Button>
      <Button busy={busy} marginTop={SIZE.M} wide onPress={handlePort}>
        Port Blockchain
      </Button>
    </View>
  );
};

export { Developer };
