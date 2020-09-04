import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import PropTypes from 'prop-types';

import React, { useEffect, useState } from 'react';
import { THEME } from 'reactor/common';
import { Alert, Button, Dialog, Image, Row, Text, Touchable, View } from 'reactor/components';

import { C, onHardwareBackPress } from '@common';
import { Heading, SliderCurrencies } from '@components';
import { useL10N, useSnackBar, useStore } from '@context';
import { ServiceQR, ServiceRates } from '@services';

import { askCamera, changeCurrency, getBlockchain } from './DialogSettings.controller';
import styles from './DialogSettings.style';

const { DELAY_PRESS_MS } = C;
const { COLOR } = THEME;
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
  const [syncRates, setSyncRates] = useState(undefined);

  const {
    settings: { authorization, baseCurrency, secret },
    updateRates,
    fork,
  } = store;

  useEffect(() => {
    if (!visible) setCamera(false);
    else if (hasCamera === undefined) setHasCamera(askCamera());
    // else setQr('41B17C23-F1A6-46EE-9EEA-6D8AF3EADD33|backup');

    onHardwareBackPress(visible, onClose);

    return () => onHardwareBackPress(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

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

  const handleUpdateRates = async () => {
    setSyncRates(true);
    updateRates(await ServiceRates.get({ baseCurrency }).catch(() => {}));
    setSyncRates(false);
  };

  return (
    <>
      <Dialog {...inherit} onClose={onClose} position="bottom" visible={visible}>
        <Row justify="center" marginVertical="L">
          <Text headline>{l10n.SETTINGS}</Text>
        </Row>

        <Heading small value={l10n.TRANSFER_TXS}>
          {hasCamera && (
            <Button
              color={COLOR.TEXT}
              onPress={() => setCamera(!camera)}
              outlined
              size="S"
              text={camera ? l10n.CLOSE.toUpperCase() : l10n.QR_READER.toUpperCase()}
            />
          )}
        </Heading>

        <View marginTop="S" marginBottom="XS" style={styles.content}>
          {!camera ? (
            <Image source={{ uri: ServiceQR.uri({ secret, authorization }) }} style={styles.qr} />
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
        <Row marginTop="S">
          {!syncRates ? (
            <>
              <Text caption color={COLOR.LIGHTEN}>
                {`${l10n.SYNC_RATES_SENTENCE_1} ${new Date().toString().split(' ').slice(0, 5).join(' ')} click `}
              </Text>
              <Touchable onPress={handleUpdateRates}>
                <Text bold caption color={COLOR.LIGHTEN} underlined>
                  {l10n.SYNC_RATES_CTA}
                </Text>
              </Touchable>
              <Text caption color={COLOR.LIGHTEN}>
                {l10n.SYNC_RATES_SENTENCE_2}
              </Text>
            </>
          ) : (
            <Text caption color={COLOR.LIGHTEN}>
              {l10n.WAIT}
            </Text>
          )}
        </Row>
      </Dialog>

      <Alert
        accept={l10n.IMPORT}
        cancel={l10n.CANCEL}
        caption={l10n.TRANSFER_TXS_IMPORT}
        delay={DELAY_PRESS_MS}
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
