import {
  // helpers
  ALIGN,
  COLOR,
  FLEX_DIRECTION,
  SIZE,
  Theme,
  // components
  Button,
  Modal,
  Text,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { C, L10N, onHardwareBackPress } from '@common';
import { FormVault } from '@components';
import { useNavigation, useStore } from '@context';

const { SCREEN } = C;
const INITIAL_STATE = { balance: 0, currency: undefined, title: undefined };

const DialogVault = ({ onClose, isVisible }) => {
  const navigation = useNavigation();
  const {
    addVault,
    settings: { baseCurrency },
  } = useStore();

  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState(INITIAL_STATE);

  useEffect(() => {
    if (isVisible) setForm({ ...INITIAL_STATE, currency: baseCurrency });
    onHardwareBackPress(isVisible, onClose);

    return () => onHardwareBackPress(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const handleSubmit = async () => {
    setBusy(true);
    const vault = await addVault(form);
    if (vault) {
      onClose();
      setTimeout(() => navigation.go(SCREEN.VAULT, vault), Theme.get('motionCollapse'));
    }
    setBusy(false);
  };

  return (
    <Modal color={COLOR.INFO} isVisible={isVisible} swipeable onClose={onClose}>
      <View alignItems={ALIGN.CENTER} marginBottom={SIZE.L}>
        <Text heading level={2}>
          {`${L10N.NEW} ${L10N.VAULT}`}
        </Text>
      </View>

      <FormVault form={form} optionColor={COLOR.GRAYSCALE_XL} onChange={setForm} />

      <View flexDirection={FLEX_DIRECTION.ROW} marginTop={SIZE.XL}>
        <Button disabled={busy} marginRight={SIZE.M} outlined onPress={onClose}>
          {L10N.CLOSE.toUpperCase()}
        </Button>
        <Button busy={busy} color={COLOR.CONTENT} disabled={busy || form.title === undefined} onPress={handleSubmit}>
          {L10N.SAVE.toUpperCase()}
        </Button>
      </View>
    </Modal>
  );
};

DialogVault.propTypes = {
  isVisible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export { DialogVault };
