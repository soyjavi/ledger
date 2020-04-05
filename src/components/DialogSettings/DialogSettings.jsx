import { bool } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { Button, Dialog, Image, Text } from '../../reactor/components';
import { THEME } from '../../reactor/common';
import { useL10N, useSnackBar, useStore } from '../../context';
import { DialogFork } from '..';

import styles from './DialogSettings.style';

const { COLOR } = THEME;
const QR_URI = 'https://chart.googleapis.com/chart?cht=qr&chs=512x512&chld=H|1&chl';
const CAMERA_PROPS = {
  barCodeScannerSettings: { barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] },
  type: Camera.Constants.Type.back,
};

export const DialogSettings = ({ visible, ...inherit }) => {
  const l10n = useL10N();
  const { authorization, secret } = useStore();
  const { snackbarSuccess } = useSnackBar();

  const [dialogFork, setDialogFork] = useState(false);
  const [hasCamera, setHasCamera] = useState(undefined);
  const [camera, setCamera] = useState(false);
  const [qr, setQr] = useState(undefined);

  useEffect(() => {
    async function askCamera() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasCamera(status === 'granted');
    }
    if (hasCamera === undefined) askCamera();
  }, [hasCamera]);

  useEffect(() => {
    if (!visible) setCamera(false);
  }, [visible]);

  const onQR = ({ data = '' } = {}) => {
    const [secure, file] = data.split('|');

    setDialogFork(secure !== undefined && file !== undefined);
    setQr(data);
  };

  const onForked = () => {
    setDialogFork(false);
    inherit.onClose();
    snackbarSuccess(l10n.FORKED_CORRECTLY);
  };

  return (
    <Dialog {...inherit} style={styles.dialog} styleButton={styles.dialogButton} position="bottom" visible={visible}>
      <Text color={COLOR.BACKGROUND} marginBottom="XS" subtitle>
        {l10n.TRANSFER_TXS}
      </Text>
      <Text caption color={COLOR.LIGHTEN}>
        {camera ? l10n.TRANSFER_TXS_CAMERA : l10n.TRANSFER_TXS_CAPTION}
      </Text>

      <View style={styles.content}>
        {!camera ? (
          <Image source={{ uri: `${QR_URI}=${secret}|${authorization}` }} style={styles.qr} />
        ) : (
          <Camera {...CAMERA_PROPS} onBarCodeScanned={onQR} style={styles.camera}>
            <View style={styles.cameraViewport} />
          </Camera>
        )}
      </View>

      {hasCamera && (
        <Button
          color={COLOR.BASE}
          outlined
          onPress={() => setCamera(!camera)}
          title={camera ? l10n.CLOSE : l10n.QR_READER}
          wide
        />
      )}

      <DialogFork onClose={() => setDialogFork(false)} onForked={onForked} query={qr} visible={dialogFork} />
    </Dialog>
  );
};

DialogSettings.propTypes = {
  visible: bool,
};
