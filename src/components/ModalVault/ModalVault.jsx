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
import { useRouter } from '@lookiero/router';
import React, { useEffect, useState } from 'react';

import { EVENTS, L10N, ROUTE, onHardwareBackPress } from '@common';
import { useStore } from '@context';

import { FormVault } from '../FormVault';
import { style } from './ModalVault.style';

const INITIAL_STATE = { balance: 0, currency: undefined, title: undefined };

const ModalVault = () => {
  const { subscribe } = useEvent();
  const { go } = useRouter();
  const { addVault } = useStore();

  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState(INITIAL_STATE);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    subscribe({ event: EVENTS.NEW_VAULT }, () => setVisible(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (visible) setForm({ ...INITIAL_STATE });
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
      go({ path: `${ROUTE.VAULT}/${vault.hash}`, props: vault });
    }
    setBusy(false);
  };

  return (
    <Modal contentStyle={style.modalContent} color={COLOR.INFO} isVisible={visible} swipeable onClose={handleClose}>
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
        <Button color={COLOR.CONTENT} disabled={busy || !form.currency || !form.title} onPress={handleSubmit}>
          {L10N.SAVE.toUpperCase()}
        </Button>
      </View>
    </Modal>
  );
};

ModalVault.displayName = 'ModalVault';

ModalVault.propTypes = {};

export { ModalVault };
