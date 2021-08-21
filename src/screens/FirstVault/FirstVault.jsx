import {
  // helpers
  ALIGN,
  COLOR,
  SIZE,
  // components
  Button,
  SafeAreaView,
  Text,
  View,
  // hooks
  useStack,
} from '@lookiero/aurora';
import { useRouter } from '@lookiero/router';
import React, { useLayoutEffect, useState } from 'react';
import { Platform, KeyboardAvoidingView } from 'react-native';

import { C, L10N, ROUTE } from '@common';
import { FormVault, Notification, Viewport } from '@components';
import { useStore } from '@context';
import { ServiceNode, ServiceRates } from '@services';

import { style } from './FirstVault.style';

const { CURRENCY } = C;
const INITIAL_STATE = { balance: 0, currency: CURRENCY, title: undefined };

const IS_NATIVE = ['ios', 'android'].includes(Platform.OS);

export const FirstVault = () => {
  const { addVault, blockchain, settings, updateRates, updateSettings, ...store } = useStore();
  const { go } = useRouter();
  const Stack = useStack();

  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState(INITIAL_STATE);

  useLayoutEffect(() => {
    (async () => {
      const rates = await ServiceRates.get(settings).catch(() =>
        Stack.alert('rates', Notification, { text: L10N.ERROR_SERVICE_RATES, timeoutClose: 10000 }),
      );
      if (rates) updateRates(rates);
    })();
  }, []);

  const handleSubmit = async () => {
    setBusy(true);
    const settings = { ...store.settings, baseCurrency: form.currency };

    await updateSettings(settings);
    await ServiceNode.sync({ key: 'vaults', blocks: blockchain.vaults, settings });
    await ServiceNode.sync({ key: 'txs', blocks: blockchain.txs, settings });
    await addVault(form);

    go({ path: ROUTE.COMPLETED });

    setBusy(false);
  };

  return (
    <Viewport path={ROUTE.FIRST_VAULT}>
      <KeyboardAvoidingView behavior={IS_NATIVE ? 'padding' : undefined} style={style.container}>
        <SafeAreaView style={style.container}>
          <View style={[style.content, style.offset]}>
            <Text align={ALIGN.CENTER} heading level={1}>
              {L10N.FIRST_VAULT}
            </Text>
            <Text align={ALIGN.CENTER} color={COLOR.GRAYSCALE_L} detail level={1}>
              {L10N.FIRST_VAULT_CAPTION}
            </Text>

            <FormVault marginTop={SIZE.XL} form={form} onChange={setForm} />

            <Button disabled={busy || !form.valid} marginTop={SIZE.M} onPress={handleSubmit}>
              {L10N.CREATE.toUpperCase()}
            </Button>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Viewport>
  );
};
