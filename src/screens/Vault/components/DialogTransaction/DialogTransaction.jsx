import { bool, func, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { THEME } from '../../../../reactor/common';
import { Button, Dialog, Text } from '../../../../reactor/components';

import { C } from '../../../../common';
import { useL10N, useSnackBar, useStore } from '../../../../context';
import { CardOption, HeatMap } from '../../../../components';
import { FormTransaction, FormTransfer } from './components';
import { getLocation, handleSubmit } from './modules';

import styles from './DialogTransaction.style';

const { COLOR } = THEME;
const {
  TX: {
    TYPE: { EXPENSE, TRANSFER },
  },
} = C;

const INITIAL_STATE = {
  busy: false,
  category: undefined,
  form: {},
  type: EXPENSE,
  valid: false,
};

const INITIAL_STATE_LOCATION = { coords: undefined, place: undefined };

const DialogTransaction = (props) => {
  const { onClose, visible, ...inherit } = props;
  const l10n = useL10N();
  const snackbar = useSnackBar();
  const store = useStore();
  const [busy, setBusy] = useState(false);
  const [state, setState] = useState(INITIAL_STATE);
  const [location, setLocation] = useState(INITIAL_STATE_LOCATION);

  useEffect(() => {
    if (visible) {
      setState(INITIAL_STATE);
      setLocation(INITIAL_STATE_LOCATION);
      getLocation(setLocation);
    }
  }, [visible]);

  const onSubmit = handleSubmit.bind(undefined, {
    props,
    store,
    snackbar,
    setBusy,
    state: { ...state, ...location },
    setState,
  });

  const { type = EXPENSE, valid } = state;
  const { coords, place } = location;
  let color = type === EXPENSE ? COLOR.EXPENSE : COLOR.INCOME;
  let Form = FormTransaction;

  if (type === TRANSFER) {
    color = COLOR.TRANSFER;
    Form = FormTransfer;
  }

  const options = store.vaults.length === 1 ? [l10n.EXPENSE, l10n.INCOME] : [l10n.EXPENSE, l10n.INCOME, l10n.TRANSFER];

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
        {options.map((option, index) => (
          <CardOption
            key={option}
            color={color}
            onPress={() =>
              setState({
                ...state,
                category: undefined,
                form: {},
                type: index,
                valid: false,
              })
            }
            selected={type === index}
            style={[styles.cardOption, index === options.length - 1 && styles.cardLast]}
            title={option}
          />
        ))}
      </View>
      <View style={styles.form}>
        <Form {...props} {...state} color={color} onChange={(value) => setState({ ...state, ...value })} />
        <View>
          <HeatMap color={color} points={coords ? [[coords.longitude, coords.latitude]] : undefined} />
          <Text caption lighten>
            {place || l10n.LOADING_PLACE}
          </Text>
        </View>
      </View>

      <Button
        activity={busy}
        color={color}
        colorContent={COLOR.BACKGROUND}
        disabled={busy || !valid}
        large
        onPress={onSubmit}
        style={styles.button}
        title={!busy ? l10n.SAVE : undefined}
      />
    </Dialog>
  );
};

DialogTransaction.propTypes = {
  onClose: func.isRequired,
  vault: string,
  visible: bool,
};

DialogTransaction.defaultProps = {
  vault: undefined,
  visible: false,
};

export default DialogTransaction;
