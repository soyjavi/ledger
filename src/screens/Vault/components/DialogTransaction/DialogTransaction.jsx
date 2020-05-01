import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Button, Dialog, Row, Text } from 'reactor/components';

import { C } from '@common';
import { useL10N, useSnackBar, useStore } from '@context';
import { HeatMap } from '@components';

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
  form: { value: 0 },
  type: EXPENSE,
  valid: false,
};

const INITIAL_STATE_LOCATION = { coords: undefined, place: undefined };

const DialogTransaction = (props = {}) => {
  const { onClose, visible, type, ...inherit } = props;
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

  const { valid } = state;
  const { coords, place } = location;
  const Form = type === TRANSFER ? FormTransfer : FormTransaction;

  console.log('DialogTransaction.state', state);

  return (
    <Dialog {...inherit} onClose={onClose} position="bottom" visible={visible}>
      <Text subtitle marginBottom="M">{`${l10n.NEW} ${l10n.TRANSACTION[type]}`}</Text>

      <Form {...props} {...state} onChange={(value) => setState({ ...state, ...value })} />
      <HeatMap
        caption={place || l10n.LOADING_PLACE}
        points={coords ? [[coords.longitude, coords.latitude]] : undefined}
        small
      />

      <Row marginTop="L">
        <Button
          activity={busy}
          color={COLOR.BASE}
          colorText={COLOR.TEXT}
          disabled={busy}
          marginRight="M"
          onPress={onClose}
          title={l10n.CLOSE}
          wide
        />
        <Button
          activity={busy}
          delay={DELAY_PRESS_MS}
          disabled={busy || !valid}
          onPress={onSubmit}
          title={!busy ? l10n.SAVE : undefined}
          wide
        />
      </Row>
    </Dialog>
  );
};

DialogTransaction.propTypes = {
  onClose: PropTypes.func.isRequired,
  type: PropTypes.number,
  vault: PropTypes.string,
  visible: PropTypes.bool,
};

export default DialogTransaction;
