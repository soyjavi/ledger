import { bool, func } from 'prop-types';
import React, { useState } from 'react';
import { View } from 'react-native';

import { FLAGS } from '../../../../assets';
import { FORM, setCurrency, translate } from '../../../../common';
import { CardOption } from '../../../../components';
import { useL10N, useStore } from '../../../../context';
import { THEME } from '../../../../reactor/common';
import {
  Button, Dialog, Form, Slider, Text,
} from '../../../../reactor/components';
import queryCurrencies from './modules/queryCurrencies';
import styles, { CARD_WIDTH } from './DialogVault.style';

const { COLOR, SPACE } = THEME;
const INITIAL_STATE = { busy: false, form: { title: '', balance: '0' } };

const DialogVault = ({ onClose, visible }) => {
  const l10n = useL10N();
  const store = useStore();
  const { baseCurrency, vaults = [] } = store;

  const [state, setState] = useState({ currency: baseCurrency, ...INITIAL_STATE });

  const onSubmit = async () => {
    const { currency, form } = state;

    setState({ ...state, busy: true });
    const vault = await store.onVault({ currency, ...form });
    if (vault) onClose();
    setState({ currency: baseCurrency, ...INITIAL_STATE });
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
      <Text lighten>
        { vaults.length === 0 ? l10n.FIRST_VAULT_CAPTION : l10n.VAULT_CAPTION }
      </Text>
      <View style={styles.form}>
        <Text subtitle>{l10n.CURRENCIES}</Text>
        <Slider itemMargin={0} itemWidth={CARD_WIDTH + SPACE.S} style={styles.currencies}>
          { queryCurrencies(store).map((item) => (
            <CardOption
              image={FLAGS[item]}
              key={item}
              onPress={() => setState({ currency: item, ...INITIAL_STATE })}
              selected={state.currency === item}
              style={styles.card}
              title={item}
            />
          ))}
        </Slider>
        <Form
          attributes={setCurrency(translate(FORM.VAULT, l10n), state.currency)}
          onChange={(form) => setState({ ...state, form })}
          value={state.form}
        />
      </View>
      <Button
        activity={state.busy}
        color={COLOR.PRIMARY}
        disabled={state.busy || state.form.title.trim().length === 0}
        onPress={onSubmit}
        shadow
        style={styles.button}
        title={!state.busy ? l10n.SAVE : undefined}
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
