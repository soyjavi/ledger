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
      onClose={onClose}
      position="bottom"
      style={styles.dialog}
      title={l10n.WARNING}
      visible={visible}
    >
      <Text marginBottom="XS" subtitle>
        {l10n.EXPENSE}
      </Text>
      <Text caption>{l10n.TRANSFER_TXS_IMPORT}</Text>
      <Button
        activity={busy}
        color={COLOR.TEXT}
        colorText={COLOR.ERROR}
        disabled={busy}
        marginTop="M"
        onPress={onSubmit}
        wide
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
