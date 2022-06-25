import {
  // helpers
  ALIGN,
  COLOR,
  FLEX_DIRECTION,
  SIZE,
  // components
  Modal,
  Text,
  View,
} from '@lookiero/aurora';
import { useEvent } from '@lookiero/event';
import React, { useEffect, useState } from 'react';

import { C, EVENTS, L10N, onHardwareBackPress } from '@common';
import { Button } from '@components';
import { useStore } from '@context';

import { FormTransaction, FormTransfer } from './components';
import { createTransaction, createTransfer } from './helpers';
import { style } from './ModalTransaction.style';

const {
  TIMEOUT,
  TX: {
    TYPE: { TRANSFER },
  },
} = C;

const INITIAL_STATE = {
  busy: false,
  form: {},
  valid: false,
};

const ModalTransaction = () => {
  const { subscribe } = useEvent();
  const store = useStore();

  const [busy, setBusy] = useState(false);
  const [dataSource, setDataSource] = useState({});

  const [state, setState] = useState(INITIAL_STATE);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    subscribe({ event: EVENTS.NEW_TRANSACTION }, ({ type, vault }) => {
      setVisible(() => {
        setDataSource({ type, vault });
        setState(INITIAL_STATE);

        return true;
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // ! @TODO: Research why we need this
    setTimeout(async () => {
      const method = type === TRANSFER ? createTransfer : createTransaction;
      const value = await method({ props: dataSource, state, store });
      if (value) handleClose();
      setBusy(false);
    }, TIMEOUT.BUSY);
  };

  const { type } = dataSource;
  const { valid } = state;

  const Form = type === TRANSFER ? FormTransfer : FormTransaction;

  return (
    <Modal color={COLOR.INFO} contentStyle={style.modalContent} isVisible={visible} swipeable onClose={handleClose}>
      <View alignItems={ALIGN.CENTER} marginBottom={SIZE.L}>
        <Text heading level={2}>
          {L10N.TRANSACTION[type]}
        </Text>
      </View>

      {type !== undefined && (
        <Form {...dataSource} {...state} debounce={200} onChange={(value) => setState({ ...state, ...value })} />
      )}

      <View flexDirection={FLEX_DIRECTION.ROW} marginTop={SIZE.XL}>
        <Button disabled={busy} marginRight={SIZE.M} secondary onPress={handleClose}>
          {L10N.CLOSE.toUpperCase()}
        </Button>
        <Button disabled={busy || !valid} onPress={handleSubmit}>
          {L10N.SAVE.toUpperCase()}
        </Button>
      </View>
    </Modal>
  );
};

ModalTransaction.displayName = 'ModalTransaction';

ModalTransaction.propTypes = {};

export { ModalTransaction };
