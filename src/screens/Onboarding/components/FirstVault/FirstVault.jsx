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
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Platform, KeyboardAvoidingView } from 'react-native';

import { C, L10N } from '@common';
import { FormVault, Viewport } from '@components';
import { useSnackBar, useStore } from '@context';

import { fetchRates, createVault } from './FirstVault.controller';
import { style } from './FirstVault.style';

const { CURRENCY } = C;
const INITIAL_STATE = { balance: 0, currency: undefined, title: undefined };

const IS_NATIVE = ['ios', 'android'].includes(Platform.OS);

const FirstVault = ({ onVault, visible, ...others }) => {
  const store = useStore();
  const snackbar = useSnackBar();

  const { updateSettings } = store;

  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState(INITIAL_STATE);

  useEffect(() => {
    if (visible) {
      setForm({ ...INITIAL_STATE, currency: CURRENCY });
      fetchRates({ L10N, snackbar, store });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (form.currency) updateSettings({ baseCurrency: form.currency });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.currency]);

  const handleSubmit = async () => {
    setBusy(true);
    const vault = createVault({ form, store });
    if (vault) onVault(vault);
    setBusy(false);
  };

  return (
    <Viewport {...others} visible={visible}>
      <SafeAreaView flex={SIZE.XS}>
        <View alignItems={ALIGN.CENTER} style={style.content} justifyContent={ALIGN.END} padding={SIZE.M}>
          <KeyboardAvoidingView behavior={IS_NATIVE ? 'padding' : undefined}>
            <Text align={ALIGN.CENTER} heading level={1}>
              Your first account
            </Text>

            <View marginVertical={SIZE.L}>
              <FormVault form={form} onChange={setForm} />
              <Text align={ALIGN.CENTER} color={COLOR.GRAYSCALE_XL} detail marginTop={SIZE.S}>
                {L10N.FIRST_VAULT_CAPTION}
              </Text>
            </View>

            <Button busy={busy} disabled={busy || !form.valid} outlined={!form.valid && !busy} onPress={handleSubmit}>
              {L10N.CREATE.toUpperCase()}
            </Button>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </Viewport>
  );
};

FirstVault.propTypes = {
  visible: PropTypes.bool,
  onVault: PropTypes.func,
};

export { FirstVault };
