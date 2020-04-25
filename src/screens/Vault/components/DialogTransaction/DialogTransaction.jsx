import { bool, func, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { THEME } from '../../../../reactor/common';
import { Button, Dialog, Row, Text } from '../../../../reactor/components';

import { C } from '../../../../common';
import { useL10N, useSnackBar, useStore } from '../../../../context';
import { CardOption, HeatMap } from '../../../../components';
import { FormTransaction, FormTransfer } from './components';
import { getLocation, handleSubmit } from './modules';

const { COLOR } = THEME;
const {
  DELAY_PRESS_MS,
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
    color = COLOR.TEXT;
    Form = FormTransfer;
  }

  const options = store.vaults.length === 1 ? [l10n.EXPENSE, l10n.INCOME] : [l10n.EXPENSE, l10n.INCOME, l10n.TRANSFER];

  return (
    <Dialog {...inherit} onClose={onClose} position="bottom" visible={visible}>
      <Text color={color} subtitle marginBottom="M">{`${l10n.NEW} ${l10n.TRANSACTION[type]}`}</Text>

      <Text bold caption>
        {l10n.TYPE}
      </Text>
      <Row marginTop="XS" marginBottom="M">
        {options.map((option, index) => (
          <CardOption
            key={option}
            color={color}
            marginRight={index < options.length - 1 ? 'S' : '0'}
            onPress={() => setState({ ...state, category: undefined, form: {}, type: index, valid: false })}
            selected={type === index}
            title={option}
          />
        ))}
      </Row>

      <Form {...props} {...state} color={color} onChange={(value) => setState({ ...state, ...value })} />
      <HeatMap
        caption={place || l10n.LOADING_PLACE}
        color={color}
        points={coords ? [[coords.longitude, coords.latitude]] : undefined}
      />

      <Button
        activity={busy}
        color={color}
        colorText={COLOR.BACKGROUND}
        delay={DELAY_PRESS_MS}
        disabled={busy || !valid}
        marginTop="L"
        onPress={onSubmit}
        title={!busy ? l10n.SAVE : undefined}
        wide
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
