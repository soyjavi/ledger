import {
  // helpers
  ALIGN,
  COLOR,
  FLEX_DIRECTION,
  SIZE,
  // components
  Button,
  Modal,
  Text,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { C, L10N, onHardwareBackPress } from '@common';
import { HeatMap } from '@components';
import { useConnection, useSnackBar, useStore } from '@context';

import { FormTransaction, FormTransfer } from './components';
import { getLocation, handleSubmit } from './modules';

const {
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
  const { onClose, isVisible, ...inherit } = props;
  const { online } = useConnection();
  const snackbar = useSnackBar();
  const store = useStore();

  const [busy, setBusy] = useState(false);
  const [location, setLocation] = useState(INITIAL_STATE_LOCATION);
  const [state, setState] = useState(INITIAL_STATE);
  const [type, setType] = useState();

  useEffect(() => {
    if (isVisible && props.type !== undefined && props.type !== type) setType(props.type);
  }, [isVisible, props, type]);

  useEffect(() => {
    if (isVisible) {
      setState(INITIAL_STATE);
      setLocation(INITIAL_STATE_LOCATION);
      getLocation({ online, setLocation });
    }
    onHardwareBackPress(isVisible, onClose);

    return () => onHardwareBackPress(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

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
    <Modal {...inherit} color={COLOR.INFO} isVisible={isVisible} swipeable onClose={onClose}>
      <View alignItems={ALIGN.CENTER} marginBottom={SIZE.L}>
        <Text heading level={2}>
          {L10N.TRANSACTION[type]}
        </Text>
      </View>

      <Form {...props} {...state} type={type} onChange={(value) => setState({ ...state, ...value })} />

      {online && type !== TRANSFER && (
        <HeatMap
          caption={place || L10N.LOADING_PLACE}
          points={coords ? [[coords.longitude, coords.latitude]] : undefined}
          small
        />
      )}

      <View flexDirection={FLEX_DIRECTION.ROW} marginTop={SIZE.XL}>
        <Button disabled={busy} marginRight={SIZE.M} outlined onPress={onClose}>
          {L10N.CLOSE.toUpperCase()}
        </Button>
        <Button color={COLOR.CONTENT} disabled={busy || !valid} onPress={onSubmit}>
          {L10N.SAVE.toUpperCase()}
        </Button>
      </View>
    </Modal>
  );
};

DialogTransaction.propTypes = {
  currency: PropTypes.string,
  isVisible: PropTypes.bool,
  type: PropTypes.number,
  vault: PropTypes.shape({}),
  onClose: PropTypes.func.isRequired,
};

export { DialogTransaction };
