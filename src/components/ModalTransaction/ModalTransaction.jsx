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
import { useEvent } from '@lookiero/event';
import React, { useEffect, useState } from 'react';

import { C, EVENTS, L10N, onHardwareBackPress } from '@common';
import { HeatMap } from '@components';
import { useConnection, useStore } from '@context';

import { FormTransaction, FormTransfer } from './components';
import { createTransaction, createTransfer, getLocation } from './helpers';

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

const ModalTransaction = () => {
  const { subscribe } = useEvent();
  const { online } = useConnection();
  const store = useStore();

  const [busy, setBusy] = useState(false);
  const [dataSource, setDataSource] = useState({});
  const [location, setLocation] = useState(INITIAL_STATE_LOCATION);
  const [state, setState] = useState(INITIAL_STATE);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    subscribe({ event: EVENTS.NEW_TRANSACTION }, ({ type, vault }) => {
      setVisible(() => {
        setDataSource({ type, vault });
        setState(INITIAL_STATE);
        setLocation(INITIAL_STATE_LOCATION);
        getLocation({ online, setLocation });

        return true;
      });
    });
  }, []);

  useEffect(() => {
    onHardwareBackPress(visible, handleClose);

    return () => onHardwareBackPress(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
  };

  const handleSubmit = async () => {
    setBusy(true);

    const method = type === TRANSFER ? createTransfer : createTransaction;
    const value = await method({ props: dataSource, state, store });
    setBusy(false);

    if (value) handleClose();
  };

  const { type } = dataSource;
  const { valid } = state;
  const { coords, place } = location;

  const Form = type === TRANSFER ? FormTransfer : FormTransaction;

  return (
    <Modal color={COLOR.INFO} isVisible={visible} swipeable onClose={handleClose}>
      <View alignItems={ALIGN.CENTER} marginBottom={SIZE.L}>
        <Text heading level={2}>
          {L10N.TRANSACTION[type]}
        </Text>
      </View>

      {type !== undefined && <Form {...dataSource} {...state} onChange={(value) => setState({ ...state, ...value })} />}

      {online && type !== TRANSFER && (
        <HeatMap
          caption={place || L10N.LOADING_PLACE}
          points={coords ? [[coords.longitude, coords.latitude]] : undefined}
          small
        />
      )}

      <View flexDirection={FLEX_DIRECTION.ROW} marginTop={SIZE.XL}>
        <Button busy={busy} marginRight={SIZE.M} outlined onPress={handleClose}>
          {L10N.CLOSE.toUpperCase()}
        </Button>
        <Button busy={busy} color={COLOR.CONTENT} disabled={!valid} onPress={handleSubmit}>
          {L10N.SAVE.toUpperCase()}
        </Button>
      </View>
    </Modal>
  );
};

ModalTransaction.displayName = 'ModalTransaction';

ModalTransaction.propTypes = {};

export { ModalTransaction };
