import { bool, func } from 'prop-types';
import React, { useState } from 'react';
import { View } from 'react-native';

import { FLAGS } from '../../../../assets';
import { FORM, setCurrency, translate } from '../../../../common';
import { CardOption } from '../../../../components';
import { useL10N, useSnackBar, useStore } from '../../../../context';
import { createVault } from '../../../../services';
import { THEME } from '../../../../reactor/common';
import { Button, Dialog, Form, Slider, Text } from '../../../../reactor/components';
import queryCurrencies from './modules/queryCurrencies';
import styles, { CARD_WIDTH } from './DialogVault.style';

const { COLOR, SPACE } = THEME;
const INITIAL_STATE = { title: '', balance: '0' };

const DialogVault = ({ onClose, visible }) => {
  const l10n = useL10N();
  const store = useStore();
  const snackbar = useSnackBar();
  const { baseCurrency, rates, vaults = [] } = store;

  const [busy, setBusy] = useState(false);
  const [currency, setVaultCurrency] = useState(baseCurrency);
  const [form, setForm] = useState({ ...INITIAL_STATE });

  const onSubmit = async () => {
    setBusy(true);
    const vault = await createVault(store, snackbar, { currency, ...form });
    if (vault) {
      onClose();
      setVaultCurrency(vault.currency);
      setForm({ ...INITIAL_STATE });
    }
    setBusy(false);
  };

  return (
    <Dialog
      highlight
      onClose={vaults.length > 0 ? onClose : undefined}
      style={styles.frame}
      styleContainer={styles.dialog}
      title={`${l10n.NEW} ${l10n.VAULT}`}
      visible={visible}
    >
      <Text lighten>{vaults.length === 0 ? l10n.FIRST_VAULT_CAPTION : l10n.VAULT_CAPTION}</Text>
      <View style={styles.form}>
        <Text subtitle>{l10n.CURRENCIES}</Text>
        <Slider itemMargin={0} itemWidth={CARD_WIDTH + SPACE.S} style={styles.currencies}>
          {queryCurrencies(baseCurrency, rates).map((item) => (
            <CardOption
              image={FLAGS[item]}
              color={COLOR[currency]}
              key={item}
              onPress={() => setVaultCurrency(item)}
              selected={currency === item}
              style={styles.card}
              title={item}
            />
          ))}
        </Slider>
        <Form attributes={setCurrency(translate(FORM.VAULT, l10n), currency)} onChange={setForm} value={form} />
      </View>
      <Button
        activity={busy}
        color={COLOR.ACCENT}
        disabled={busy || form.title.trim().length === 0}
        onPress={onSubmit}
        shadow
        style={styles.button}
        title={!busy ? l10n.SAVE : undefined}
      />
    </Dialog>
  );
};

DialogVault.propTypes = {
  onClose: func.isRequired,
  visible: bool,
};

DialogVault.defaultProps = {
  visible: false,
};

export default DialogVault;
