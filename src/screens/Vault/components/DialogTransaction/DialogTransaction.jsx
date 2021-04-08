import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Dialog, Row, Text } from 'reactor/components';

import { C, onHardwareBackPress } from '@common';
import { HeatMap } from '@components';
import { useConnection, useL10N, useSnackBar, useStore } from '@context';

import { FormTransaction, FormTransfer } from './components';
import { getLocation, handleSubmit } from './modules';

const {
  DELAY_PRESS_MS,
  TX: {
    TYPE: { TRANSFER },
  },
} = C;

const INITIAL_STATE = {
  busy: false,
  form: {},
  valid: false,
};

const INITIAL_STATE_LOCATION = { coords: undefined, place: undefined };

const DialogTransaction = (props = {}) => {
  const { onClose, visible, ...inherit } = props;
  const { online } = useConnection();
  const l10n = useL10N();
  const snackbar = useSnackBar();
  const store = useStore();

  const [busy, setBusy] = useState(false);
  const [location, setLocation] = useState(INITIAL_STATE_LOCATION);
  const [state, setState] = useState(INITIAL_STATE);
  const [type, setType] = useState();

  useEffect(() => {
    if (visible && props.type !== undefined && props.type !== type) setType(props.type);
  }, [visible, props, type]);

  useEffect(() => {
    if (visible) {
      setState(INITIAL_STATE);
      setLocation(INITIAL_STATE_LOCATION);
      getLocation({ online, setLocation });
    }
    onHardwareBackPress(visible, onClose);

    return () => onHardwareBackPress(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const onSubmit = handleSubmit.bind(undefined, {
    props,
    setBusy,
    setState,
    snackbar,
    state: { ...state, ...location },
    store,
  });

  const { valid } = state;
  const { coords, place } = location;

  const Form = type === TRANSFER ? FormTransfer : FormTransaction;

  return (
    <Dialog {...inherit} onClose={onClose} position="bottom" visible={visible}>
      <Row justify="center" marginVertical="L">
        <Text bold subtitle>
          {l10n.TRANSACTION[type]}
        </Text>
      </Row>

      <Form {...props} {...state} type={type} onChange={(value) => setState({ ...state, ...value })} />

      {online && type !== TRANSFER && (
        <HeatMap
          caption={place || l10n.LOADING_PLACE}
          points={coords ? [[coords.longitude, coords.latitude]] : undefined}
          small
        />
      )}

      <Row marginTop="XL" marginBottom="M">
        <Button disabled={busy} marginRight="M" outlined text={l10n.CLOSE.toUpperCase()} wide onPress={onClose} />
        <Button
          delay={DELAY_PRESS_MS}
          disabled={busy || !valid}
          text={l10n.SAVE.toUpperCase()}
          wide
          onPress={onSubmit}
        />
      </Row>
    </Dialog>
  );
};

DialogTransaction.propTypes = {
  currency: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.number,
  vault: PropTypes.shape({}),
  visible: PropTypes.bool,
};

export default DialogTransaction;
