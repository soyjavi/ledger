import {
  // helpers
  COLOR,
  // components
  Image,
  Portal,
  Text,
  View,
  // hooks
  useStack,
} from '@lookiero/aurora';
import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';

import { L10N } from '@common';
import { Action, Dialog, Heading, Notification } from '@components';
import { useConnection, useStore } from '@context';
import { ServiceQR } from '@services';

import { askCamera, getBlockchain } from './helpers';
import { CAMERA_PROPS } from './QR.definition';
import { style } from './QR.style';

const QR = () => {
  const { connected } = useConnection();
  const Stack = useStack();
  const store = useStore();
  const {
    settings: { authorization, secret },
    fork,
  } = store;

  const [blockchain, setBlockchain] = useState();
  const [camera, setCamera] = useState(false);
  const [hasCamera, setHasCamera] = useState(undefined);
  const [qr, setQr] = useState(undefined);

  useEffect(() => {
    if (hasCamera === undefined) setHasCamera(askCamera());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!camera) {
      setBlockchain(undefined);
      setQr(undefined);
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

  return (
    <View style={style.container}>
      <Heading value={L10N.TRANSFER_TXS}>
        {connected && hasCamera && (
          <Action onPress={() => setCamera(!camera)}>{camera ? L10N.CLOSE : L10N.QR_READER}</Action>
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

      <Dialog
        accept={L10N.IMPORT}
        cancel={L10N.CANCEL}
        text={L10N.TRANSFER_TXS_IMPORT}
        title={L10N.WARNING}
        isVisible={blockchain !== undefined}
        onAccept={handleFork}
        onCancel={handleCancel}
      />
    </View>
  );
};

QR.displayName = 'QR';

export { QR };
