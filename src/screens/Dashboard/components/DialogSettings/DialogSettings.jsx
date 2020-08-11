// import { View } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';

import React, { useEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Button, Dialog, Image, Text, View } from 'reactor/components';

import { Heading, SliderCurrencies } from '@components';
import { useL10N, useSnackBar, useStore } from '@context';
import { getRates } from '@services';

import { DialogFork } from '../DialogFork';
import styles from './DialogSettings.style';

const { COLOR } = THEME;
const QR_URI = 'https://chart.googleapis.com/chart?cht=qr&chs=512x512&chld=H|1&chl';
const CAMERA_PROPS = {
  barCodeScannerSettings: { barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] },
  type: Camera.Constants.Type.back,
};

export const DialogSettings = ({ onClose, visible, ...inherit }) => {
  const l10n = useL10N();
  const {
    settings: { authorization, baseCurrency, secret },
    updateRates,
    updateSettings,
  } = useStore();
  const snackbar = useSnackBar();

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

  const handleQr = ({ data = '' } = {}) => {
    const [secure, file] = data.split('|');

    setDialogFork(secure !== undefined && file !== undefined);
    setQr(data);
  };

  const handleForked = () => {
    setDialogFork(false);
    inherit.onClose();
    snackbar.success(l10n.FORKED_CORRECTLY);
  };

  const handleChangeCurrency = async (currency) => {
    updateSettings('baseCurrency', currency);
    await updateRates(await getRates({ baseCurrency: currency, snackbar }));
  };

  return (
    <>
      <Dialog {...inherit} onClose={onClose} position="bottom" visible={visible}>
        <Text marginTop="S" subtitle>
          {l10n.SETTINGS}
        </Text>

        <Heading marginTop="L" small value={l10n.TRANSFER_TXS}>
          {hasCamera && (
            <Button onPress={() => setCamera(!camera)} size="S" title={camera ? l10n.CLOSE : l10n.QR_READER} />
          )}
        </Heading>

        <View marginTop="S" marginBottom="XS" style={styles.content}>
          {!camera ? (
            <Image source={{ uri: `${QR_URI}=${secret}|${authorization}` }} style={styles.qr} />
          ) : (
            <Camera {...CAMERA_PROPS} onBarCodeScanned={handleQr} style={styles.camera}>
              <View style={styles.cameraViewport} />
            </Camera>
          )}
        </View>
        <Text caption color={COLOR.LIGHTEN} style={styles.legend}>
          {camera ? l10n.TRANSFER_TXS_CAMERA : l10n.TRANSFER_TXS_CAPTION}
        </Text>

        <Heading marginTop="L" marginBottom="XS" small value="$ Choose your base currency"></Heading>
        <SliderCurrencies onChange={handleChangeCurrency} selected={baseCurrency} />
      </Dialog>

      {visible && camera && (
        <DialogFork onClose={() => setDialogFork(false)} onForked={handleForked} query={qr} visible={dialogFork} />
      )}
    </>
  );
};

DialogSettings.propTypes = {
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};
