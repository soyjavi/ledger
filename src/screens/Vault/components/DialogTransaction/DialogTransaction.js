import { bool, func, string } from 'prop-types';
import React, { useState } from 'react';
import { View } from 'react-native';
import { THEME } from '../../../../reactor/common';
import { Button, Dialog, Text } from '../../../../reactor/components';

import { C } from '../../../../common';
import { useL10N, useStore } from '../../../../context';
import { CardOption, HeatMap } from '../../../../components';
import { FormTransaction, FormTransfer } from './components';
import { getLocation, onTransaction, onTransfer } from './modules';

import styles from './DialogTransaction.style';

const { COLOR } = THEME;
const { CURRENCY, TX: { TYPE: { EXPENSE, TRANSFER } } } = C;

const INITIAL_STATE = {
  busy: false,
  category: undefined,
  coords: undefined,
  form: {},
  location: false,
  place: undefined,
  type: EXPENSE,
  valid: false,
};

const DialogTransaction = (props) => {
  const {
    currency, onClose, visible, ...inherit
  } = props;
  const l10n = useL10N();
  const store = useStore();
  const [busy, setBusy] = useState(false);
  const [state, setState] = useState(INITIAL_STATE);

  const onLocation = () => { getLocation(setState); };

  const onSubmit = async () => {
    setBusy(true);
    const method = state.type === TRANSFER ? onTransfer : onTransaction;
    const tx = await method({ props, state, store });
    if (tx) onClose();
    setBusy(false);
    setState(INITIAL_STATE);
  };

  const {
    coords, location, place, type = EXPENSE, valid,
  } = state;
  let color = COLOR.TRANSFER;
  if (type !== TRANSFER) color = type === EXPENSE ? COLOR.EXPENSE : COLOR.INCOME;

  const formProps = {
    ...props,
    ...INITIAL_STATE,
    ...state,
    color,
    onChange: (value) => setState({ ...state, ...value }),
  };

  return (
    <Dialog
      {...inherit}
      highlight
      onClose={onClose}
      style={styles.frame}
      styleContainer={styles.dialog}
      title={`${l10n.NEW} ${l10n.TRANSACTION}`}
      visible={visible}
    >
      <Text subtitle>{l10n.TYPE}</Text>
      <View style={styles.cards}>
        { [l10n.EXPENSE, l10n.INCOME, l10n.TRANSFER].map((option, index) => (
          <CardOption
            key={option}
            color={color}
            onPress={() => setState({
              ...state, category: undefined, form: {}, type: index, valid: false,
            })}
            selected={type === index}
            style={[styles.cardOption, index === 2 && styles.cardLast]}
            title={option}
          />
        ))}
      </View>
      <View style={styles.form}>
        { type !== TRANSFER ? <FormTransaction {...formProps} /> : <FormTransfer {...formProps} /> }

        <View>
          { visible && location === false && onLocation(this) }
          <HeatMap color={color} points={coords ? [[coords.longitude, coords.latitude]] : undefined} />
          <Text caption lighten>{place || l10n.LOADING_PLACE}</Text>
        </View>
      </View>

      <Button
        activity={busy}
        color={color || COLOR.PRIMARY}
        disabled={busy || !valid}
        onPress={onSubmit}
        shadow
        style={styles.button}
        title={!busy ? l10n.SAVE : undefined}
      />
    </Dialog>
  );
};

DialogTransaction.propTypes = {
  currency: string,
  onClose: func.isRequired,
  vault: string,
  visible: bool,
};

DialogTransaction.defaultProps = {
  currency: CURRENCY,
  vault: undefined,
  visible: false,
};

export default DialogTransaction;
