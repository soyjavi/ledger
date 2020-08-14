import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import PropTypes from 'prop-types';

import React, { useEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Alert, Button, Dialog, Image, Text, View } from 'reactor/components';

import { Heading, SliderCurrencies } from '@components';
import { useL10N, useSnackBar, useStore } from '@context';

import { askCamera, changeCurrency, getBlockchain } from './DialogSettings.controller';
import styles from './DialogSettings.style';

const { COLOR } = THEME;
const QR_URI = 'https://chart.googleapis.com/chart?cht=qr&chs=512x512&chld=H|1&chl';
const CAMERA_PROPS = {
  barCodeScannerSettings: { barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] },
  type: Camera.Constants.Type.back,
};
const TIMEOUT_CHECK_BLOCKCHAIN = 400;

export const DialogSettings = ({ onClose, visible, ...inherit }) => {
  const l10n = useL10N();
  const store = useStore();
  const snackbar = useSnackBar();

  const [hasCamera, setHasCamera] = useState(undefined);
  const [camera, setCamera] = useState(false);
  const [qr, setQr] = useState(undefined);
  const [blockchain, setBlockchain] = useState(undefined);

  const {
    settings: { authorization, baseCurrency, secret },
    fork,
  } = store;

  useEffect(() => {
    if (!visible) setCamera(false);
  }, [visible]);

  useEffect(() => {
    if (hasCamera === undefined) askCamera({ setHasCamera });
  }, [hasCamera]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (qr) setBlockchain(await getBlockchain({ qr, store }));
      else clearTimeout(timeout);
    }, TIMEOUT_CHECK_BLOCKCHAIN);

    return () => clearTimeout(timeout);
  }, [qr]);

  const handleQRScanned = ({ data } = {}) => {
    if (data) setQr(data);
  };

  const handleFork = async () => {
    const success = await fork(blockchain);
    if (success) {
      setBlockchain(undefined);
      onClose();
      snackbar.success(l10n.FORKED_CORRECTLY);
    }
  };

  const handleCancel = () => {
    setBlockchain(undefined);
    setQr(undefined);
  };

  const handleChangeCurrency = (currency) => changeCurrency({ currency, l10n, snackbar, store });

  console.log({
    hasCamera,
    camera,
    qr,
  });

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
            <Camera {...CAMERA_PROPS} onBarCodeScanned={handleQRScanned} style={styles.camera}>
              <View style={styles.cameraViewport} />
            </Camera>
          )}
        </View>
        <Text caption color={COLOR.LIGHTEN} style={styles.legend}>
          {camera ? l10n.TRANSFER_TXS_CAMERA : l10n.TRANSFER_TXS_CAPTION}
        </Text>

        <Heading marginTop="L" marginBottom="S" small value={l10n.CHOOSE_CURRENCY}></Heading>
        <SliderCurrencies onChange={handleChangeCurrency} selected={baseCurrency} />
      </Dialog>

      <Alert
        accept={l10n.IMPORT}
        cancel={l10n.CANCEL}
        caption={l10n.TRANSFER_TXS_IMPORT}
        onAccept={handleFork}
        onCancel={handleCancel}
        onClose={handleCancel}
        position="bottom"
        title={l10n.WARNING}
        visible={blockchain !== undefined}
      />
    </>
  );
};

DialogSettings.propTypes = {
  onClose: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};
