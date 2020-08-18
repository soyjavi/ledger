import { bool, func } from 'prop-types';

import React, { useEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Button, Dialog, Row, Text } from 'reactor/components';

import { C, onHardwareBackPress } from '@common';
import { FormVault } from '@components';
import { useNavigation, useL10N, useStore } from '@context';

const { DELAY_PRESS_MS, SCREEN } = C;
const { COLOR, MOTION } = THEME;
const INITIAL_STATE = { currency: undefined };

export const DialogVault = ({ onClose, visible }) => {
  const navigation = useNavigation();
  const l10n = useL10N();
  const {
    addVault,
    settings: { baseCurrency },
    vaults = [],
  } = useStore();

  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState(INITIAL_STATE);

  useEffect(() => {
    if (visible) setForm({ ...INITIAL_STATE, currency: baseCurrency });
    onHardwareBackPress(visible, onClose);

    return () => onHardwareBackPress(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleSubmit = async () => {
    setBusy(true);
    const vault = await addVault(form);
    if (vault) {
      onClose();
      setTimeout(() => navigation.go(SCREEN.VAULT, vault), MOTION.COLLAPSE);
    }
    setBusy(false);
  };

  return (
    <Dialog onClose={vaults.length > 0 ? onClose : undefined} position="bottom" visible={visible}>
      <Text subtitle marginTop="S" marginBottom="M">{`${l10n.NEW} ${l10n.VAULT}`}</Text>
      <FormVault form={form} onChange={setForm} rates={{}} />
      <Row marginTop="XL">
        <Button
          color={COLOR.BASE}
          colorText={COLOR.TEXT}
          disabled={busy}
          marginRight="M"
          onPress={onClose}
          title={l10n.CLOSE.toUpperCase()}
          wide
        />
        <Button
          delay={DELAY_PRESS_MS}
          disabled={busy || form.title === undefined}
          onPress={handleSubmit}
          title={l10n.SAVE.toUpperCase()}
          wide
        />
      </Row>
    </Dialog>
  );
};

DialogVault.propTypes = {
  onClose: func.isRequired,
  visible: bool,
};
