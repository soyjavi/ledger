import {
  // helpers
  COLOR,
  // components
  Image,
  Notification,
  Text,
  Touchable,
  View,
  // hooks
  useStack,
} from '@lookiero/aurora';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

import { L10N } from '@common';
import { Dialog, Header, Heading, ScrollView, SliderCurrencies } from '@components';
import { useStore } from '@context';
import { ServiceQR } from '@services';

import { askCamera, changeCurrency, getBlockchain, getLatestRates } from './Settings.controller';
import { style } from './Settings.style';

const CAMERA_PROPS = {
  barCodeScannerSettings: { barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] },
  type: Camera.Constants.Type.back,
};

const Settings = ({ timestamp }) => {
  const scrollview = useRef(null);
  const store = useStore();
  const Stack = useStack();

  const [blockchain, setBlockchain] = useState();
  const [camera, setCamera] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [hasCamera, setHasCamera] = useState(undefined);
  const [qr, setQr] = useState(undefined);
  const [syncRates, setSyncRates] = useState(undefined);

  const {
    settings: { authorization, baseCurrency, secret },
    fork,
  } = store;

  useEffect(() => {
    // setQr('1CC0A669-249E-428F-88FF-4EAF27ABED4B|backup');
    if (hasCamera === undefined) setHasCamera(askCamera());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timestamp) scrollview.current.scrollTo({ y: 0, animated: true });
  }, [timestamp]);

  useEffect(() => {
    if (!camera) {
      setBlockchain(undefined);
      setQr(false);
    }
  }, [camera]);

  useEffect(() => {
    (async () => {
      if (qr) setBlockchain(await getBlockchain({ qr, store }));
    })();
  }, [qr, store]);

  const handleCancel = () => {
    setBlockchain(undefined);
    setQr(undefined);
  };

  const handleChangeCurrency = (currency) => changeCurrency({ currency, L10N, Stack, store });

  const handleQRScanned = ({ data } = {}) => {
    if (data) setQr(data);
  };

  const handleFork = async () => {
    const success = await fork(blockchain);
    if (success) {
      setBlockchain(undefined);
      Stack.success('forked', Notification, { text: L10N.FORKED_CORRECTLY });
    }
  };

  const handleUpdateRates = async () => {
    setSyncRates(true);
    await getLatestRates({ Stack, store });
    setSyncRates(false);
  };

  return (
    <>
      <Header visible={scroll} title={L10N.SETTINGS} />

      <ScrollView onScroll={setScroll} ref={scrollview}>
        <Heading value={L10N.TRANSFER_TXS}>
          {hasCamera && (
            <Touchable onPress={() => setCamera(!camera)}>
              <Text action>{(camera ? L10N.CLOSE : L10N.QR_READER).toUpperCase()}</Text>
            </Touchable>
          )}
        </Heading>

        <View style={[style.qrBackground, style.offset]}>
          {!camera ? (
            <Image src={ServiceQR.uri({ secret, authorization })} style={style.qr} />
          ) : (
            <Camera {...CAMERA_PROPS} onBarCodeScanned={handleQRScanned} style={style.camera}>
              <View style={style.cameraViewport} />
            </Camera>
          )}

          <Text color={camera ? COLOR.CONTENT : COLOR.GRAYSCALE_L} detail level={2} style={style.qrHint}>
            {camera ? L10N.TRANSFER_TXS_CAMERA : L10N.TRANSFER_TXS_CAPTION}
          </Text>
        </View>

        <Heading value={L10N.CHOOSE_CURRENCY}>
          <Touchable onPress={handleUpdateRates}>
            <Text action>{L10N.SYNC_RATES_CTA.toUpperCase()}</Text>
          </Touchable>
        </Heading>

        <SliderCurrencies style={style.slider} selected={baseCurrency} onChange={handleChangeCurrency} />

        <Text color={COLOR.GRAYSCALE_L} detail level={2} style={style.offset}>
          {!syncRates
            ? `${L10N.SYNC_RATES_SENTENCE} ${new Date().toString().split(' ').slice(0, 5).join(' ')}.`
            : L10N.WAIT}
        </Text>
      </ScrollView>

      <Dialog
        accept={L10N.IMPORT}
        cancel={L10N.CANCEL}
        text={L10N.TRANSFER_TXS_IMPORT}
        title={L10N.WARNING}
        isVisible={blockchain !== undefined}
        onAccept={handleFork}
        onCancel={handleCancel}
      />
    </>
  );
};

Settings.propTypes = {
  timestamp: PropTypes.number,
  visible: PropTypes.boolean,
};

export { Settings };
