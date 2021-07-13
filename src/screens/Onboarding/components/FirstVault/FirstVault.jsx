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
        <View justifyContent={ALIGN.END} style={style.content}>
          <KeyboardAvoidingView behavior={IS_NATIVE ? 'padding' : undefined}>
            <Text align={ALIGN.CENTER} heading level={1}>
              {L10N.FIRST_VAULT}
            </Text>
            <Text align={ALIGN.CENTER} color={COLOR.GRAYSCALE_L} detail level={1}>
              {L10N.FIRST_VAULT_CAPTION}
            </Text>

            <FormVault marginTop={SIZE.XL} form={form} onChange={setForm} />

            <Button
              busy={busy}
              disabled={busy || !form.valid}
              marginTop={SIZE.M}
              outlined={!form.valid && !busy}
              onPress={handleSubmit}
            >
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
