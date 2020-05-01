import { bool, func, string } from 'prop-types';
import React, { useState } from 'react';
import { THEME } from 'reactor/common';
import { Button, Dialog, Row, Text } from 'reactor/components';

import { C } from '@common';
import { useL10N, useSnackBar, useStore } from '@context';
import { fork, getProfile } from '@services';

import styles from './DialogFork.style';

const { DELAY_PRESS_MS } = C;
const { COLOR } = THEME;

export const DialogFork = ({ onClose, onForked, query, visible, ...inherit }) => {
  const l10n = useL10N();
  const store = useStore();
  const snackbar = useSnackBar();
  const [busy, setBusy] = useState(false);

  const onSubmit = async () => {
    setBusy(true);
    const forked = await fork(store, snackbar, query, l10n);
    if (forked) {
      await getProfile(store, snackbar);
      onForked();
    }
    onClose();
    setBusy(false);
  };

  const buttonProps = {
    activity: busy,
    color: COLOR.TEXT,
    disabled: busy,
    style: styles.button,
  };

  return (
    <Dialog {...inherit} onClose={onClose} position="bottom" style={styles.dialog} visible={visible}>
      <Text marginBottom="XS" subtitle>
        {l10n.WARNING}
      </Text>
      <Text caption>{l10n.TRANSFER_TXS_IMPORT}</Text>
      <Row marginTop="M" justify="space">
        <Button {...buttonProps} outlined onPress={onClose} title={l10n.CLOSE} marginRight="M" />
        <Button
          {...buttonProps}
          colorText={COLOR.ERROR}
          delay={DELAY_PRESS_MS}
          onPress={onSubmit}
          title={!busy ? l10n.IMPORT : undefined}
        />
      </Row>
    </Dialog>
  );
};

DialogFork.propTypes = {
  onClose: func.isRequired,
  onForked: func.isRequired,
  query: string,
  visible: bool,
};
