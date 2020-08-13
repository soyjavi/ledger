import PropTypes from 'prop-types';

import React, { useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { Button, Text, Viewport } from 'reactor/components';

import { C } from '@common';
import { FormVault } from '@components';
import { useL10N, useSnackBar, useStore } from '@context';
import { getRates } from '@services';

import styles from './FirstVault.style';

const { CURRENCY, DELAY_PRESS_MS } = C;

export const FirstVault = ({ onVault, ...others }) => {
  const l10n = useL10N();
  const {
    addVault,
    settings: { onboarded },
    rates,
    updateRates,
    updateSettings,
  } = useStore();
  const snackbar = useSnackBar();

  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ currency: CURRENCY });

  useLayoutEffect(() => {
    const call = async () => {
      const rates = await getRates().catch(() => snackbar.error(l10n.ERROR_SERVICE_RATES));
      if (rates) updateRates(rates);
    };
    if (!onboarded) call();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    setBusy(true);
    const vault = await addVault(form);
    if (vault) {
      await updateSettings({ baseCurrency: form.currency });
      onVault(vault);
    }
    setBusy(false);
  };

  return (
    <Viewport {...others}>
      <KeyboardAvoidingView behavior="position" contentContainerStyle={styles.form}>
        <Text marginBottom="M" headline>
          Your first account
        </Text>
        <Text caption marginBottom="L" style={styles.caption}>
          {l10n.FIRST_VAULT_CAPTION}
        </Text>
        <FormVault form={form} onChange={setForm} rates={rates} />

        <Button
          delay={DELAY_PRESS_MS}
          disabled={busy || !form.valid}
          marginTop="XL"
          onPress={handleSubmit}
          style={styles.button}
          title={l10n.NEXT}
        />
      </KeyboardAvoidingView>
    </Viewport>
  );
};

FirstVault.propTypes = {
  onVault: PropTypes.func,
};
