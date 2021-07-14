import {
  // helpers
  ALIGN,
  COLOR,
  FLEX_DIRECTION,
  SIZE,
  // components
  Button,
  Modal,
  Portal,
  Text,
  View,
} from '@lookiero/aurora';
import { useEvent } from '@lookiero/event';
import React, { useEffect, useState } from 'react';

import { C, EVENTS, L10N, onHardwareBackPress } from '@common';
import { useNavigation, useStore } from '@context';

import { FormVault } from '../FormVault';

const { SCREEN } = C;
const INITIAL_STATE = { balance: 0, currency: undefined, title: undefined };

const ModalVault = () => {
  const { subscribe } = useEvent();
  const navigation = useNavigation();
  const {
    addVault,
    settings: { baseCurrency },
  } = useStore();

  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState(INITIAL_STATE);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    subscribe({ event: EVENTS.NEW_VAULT }, () => setVisible(true));
  }, []);

  useEffect(() => {
    if (visible) setForm({ ...INITIAL_STATE, currency: baseCurrency });
    onHardwareBackPress(visible, handleClose);

    return () => onHardwareBackPress(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
  };

  const handleSubmit = async () => {
    setBusy(true);
    const vault = await addVault(form);
    if (vault) {
      handleClose();
      navigation.go(SCREEN.VAULT, vault);
    }
    setBusy(false);
  };

  return (
    <Portal id="modal-vault">
      <Modal color={COLOR.INFO} isVisible={visible} swipeable onClose={handleClose}>
        <View alignItems={ALIGN.CENTER} marginBottom={SIZE.L}>
          <Text heading level={2}>
            {`${L10N.NEW} ${L10N.VAULT}`}
          </Text>
        </View>

        <FormVault form={form} modal onChange={setForm} />

        <View flexDirection={FLEX_DIRECTION.ROW} marginTop={SIZE.M}>
          <Button disabled={busy} marginRight={SIZE.M} outlined onPress={handleClose}>
            {L10N.CLOSE.toUpperCase()}
          </Button>
          <Button busy={busy} color={COLOR.CONTENT} disabled={busy || form.title === undefined} onPress={handleSubmit}>
            {L10N.SAVE.toUpperCase()}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

ModalVault.displayName = 'ModalVault';

ModalVault.propTypes = {};

export { ModalVault };
