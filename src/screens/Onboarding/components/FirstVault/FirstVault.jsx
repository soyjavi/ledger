import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Button, Text, Viewport } from 'reactor/components';

import { C } from '@common';
import { FormVault } from '@components';
import { useL10N, useSnackBar, useStore } from '@context';

import { fetchRates, createVault } from './FirstVault.controller';
import styles from './FirstVault.style';

const { CURRENCY, DELAY_PRESS_MS } = C;

const FirstVault = ({ onVault, visible, ...others }) => {
  const l10n = useL10N();
  const store = useStore();
  const snackbar = useSnackBar();

  const { updateSettings } = store;

  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    if (visible) {
      setForm({ currency: CURRENCY });
      fetchRates({ l10n, snackbar, store });
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
      <KeyboardAvoidingView behavior="position" contentContainerStyle={styles.form}>
        <Text bold subtitle style={styles.text}>
          Your first account
        </Text>
        <Text caption marginTop="S" marginBottom="L" style={styles.text}>
          {l10n.FIRST_VAULT_CAPTION}
        </Text>
        <FormVault form={form} onChange={setForm} showExchange={false} />

        <Button
          delay={DELAY_PRESS_MS}
          disabled={busy || !form.valid}
          marginTop="XL"
          onPress={handleSubmit}
          style={styles.button}
          text={l10n.CREATE.toUpperCase()}
        />
      </KeyboardAvoidingView>
    </Viewport>
  );
};

FirstVault.propTypes = {
  onVault: PropTypes.func,
  visible: PropTypes.bool,
};

export { FirstVault };
