import { bool, func, string } from 'prop-types';
import React, { useState } from 'react';

import { useL10N, useSnackBar, useStore } from '../../../../context';
import { THEME } from '../../../../reactor/common';
import { Button, Dialog, Text } from '../../../../reactor/components';
import { fork, getProfile } from '../../../../services';

import styles from './DialogFork.style';

const { COLOR } = THEME;

const DialogFork = ({ onClose, onForked, query, visible, ...inherit }) => {
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

  return (
    <Dialog
      {...inherit}
      highlight
      onClose={onClose}
      style={styles.frame}
      styleContainer={styles.dialog}
      title={l10n.WARNING}
      visible={visible}
    >
      <Text>{l10n.TRANSFER_TXS_IMPORT}</Text>
      <Button
        activity={busy}
        color={COLOR.TEXT}
        colorContent={COLOR.BACKGROUND}
        disabled={busy}
        large
        onPress={onSubmit}
        style={styles.button}
        title={!busy ? l10n.IMPORT : undefined}
      />
    </Dialog>
  );
};

DialogFork.propTypes = {
  onClose: func.isRequired,
  onForked: func.isRequired,
  query: string,
  visible: bool,
};

DialogFork.defaultProps = {
  query: undefined,
  visible: false,
};

export default DialogFork;
