import { bool, func } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Button, Dialog, Row, Slider, Text, View } from 'reactor/components';

import { FLAGS } from '@assets';
import { C } from '@common';
import { useL10N, useSnackBar, useStore } from '@context';
import { createVault } from '@services';

import { Option, OPTION_SIZE } from '../Option';
import { Input } from '../Input';
import queryCurrencies from './modules/queryCurrencies';

const { DELAY_PRESS_MS } = C;
const { COLOR, SPACE } = THEME;
const INITIAL_STATE = { title: '', balance: '', currency: undefined };

export const DialogVault = ({ onClose, visible }) => {
  const l10n = useL10N();
  const store = useStore();
  const snackbar = useSnackBar();
  const { baseCurrency, rates, vaults = [] } = store;

  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState(INITIAL_STATE);

  useEffect(() => {
    if (visible) {
      // setVaultCurrency(vault.currency);
      setForm({ ...INITIAL_STATE, currency: baseCurrency });
    }
  }, [visible]);

  const handleSubmit = async () => {
    setBusy(true);
    const vault = await createVault(store, snackbar, form);
    if (vault) {
      onClose();
      console.log({ vault });
      // @TODO: Should send to the vault
      // navigation.go(SCREEN.VAULT, vault);
    }
    setBusy(false);
  };

  const handleField = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <Dialog onClose={vaults.length > 0 ? onClose : undefined} position="bottom" visible={visible}>
      <Text subtitle marginBottom="XS">{`${l10n.NEW} ${l10n.VAULT}`}</Text>
      <Text color={COLOR.LIGHTEN} marginBottom="M">
        {vaults.length === 0 ? l10n.FIRST_VAULT_CAPTION : l10n.VAULT_CAPTION}
      </Text>
      <Slider itemMargin={SPACE.S} itemWidth={OPTION_SIZE} style={{ marginRight: -100 }}>
        {queryCurrencies(baseCurrency, rates).map((item) => (
          <Option
            caption={item}
            image={FLAGS[item]}
            key={item}
            onPress={() => handleField('currency', item)}
            marginRight="S"
            selected={form.currency === item}
          />
        ))}
      </Slider>

      <View marginTop="M" marginBottom="XL">
        <Input
          currency={form.currency}
          marginBottom="M"
          onChange={(value) => handleField('balance', value)}
          placeholder={l10n.INITIAL_BALANCE}
          value={form.balance}
        />
        <Input onChange={(value) => handleField('title', value)} placeholder={l10n.NAME} value={form.title} />
      </View>

      <Row>
        <Button
          color={COLOR.BASE}
          colorText={COLOR.TEXT}
          disabled={busy}
          marginRight="M"
          onPress={onClose}
          title={l10n.CLOSE.toUpperCase()}
          wide
        />
        <Button
          activity={busy}
          delay={DELAY_PRESS_MS}
          disabled={busy || form.title.trim().length === 0}
          onPress={handleSubmit}
          title={l10n.SAVE.toUpperCase()}
          wide
        />
      </Row>
    </Dialog>
  );
};

DialogVault.propTypes = {
  onClose: func.isRequired,
  visible: bool,
};
