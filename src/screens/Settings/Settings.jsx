import { bool } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { Activity, Button, Image, Text, Viewport } from '../../reactor/components';

import { Footer, Header, Heading } from '../../components';
import { useL10N, useNavigation, useSnackBar, useStore } from '../../context';
import { DialogFork } from './components';
import styles from './Settings.style';

const QR_URI = 'https://chart.googleapis.com/chart?cht=qr&chs=512x512&chld=H|1&chl';
const CAMERA_PROPS = {
  barCodeScannerSettings: { barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] },
  type: Camera.Constants.Type.back,
};

const Settings = ({ visible, ...inherit }) => {
  const navigation = useNavigation();
  const l10n = useL10N();
  const { authorization, secret } = useStore();
  const { snackbarSuccess } = useSnackBar();

  const [dialog, setDialog] = useState(false);
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

  const onQR = ({ data = '' } = {}) => {
    const [secure, file] = data.split('|');

    setDialog(secure !== undefined && file !== undefined);
    setQr(data);
  };

  const onForked = () => {
    snackbarSuccess(l10n.FORKED_CORRECTLY);
    navigation.back();
  };

  console.log('<Settings>', { visible });

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Header highlight title={l10n.SETTINGS} />

      <ScrollView contentContainerStyle={styles.container}>
        <Heading value={l10n.TRANSFER_TXS} caption={l10n.IMPORT_EXPORT_CAPTION}>
          {hasCamera === undefined && <Activity color="white" style={styles.activity} />}
          {hasCamera && (
            <Button outlined onPress={() => setCamera(!camera)} small title={camera ? l10n.CLOSE : l10n.QR_READER} />
          )}
        </Heading>
        <View style={styles.content}>
          {!camera ? (
            <Image source={{ uri: `${QR_URI}=${secret}|${authorization}` }} style={styles.qr} />
          ) : (
            <Camera {...CAMERA_PROPS} onBarCodeScanned={onQR} style={styles.qr}>
              <View style={styles.cameraViewport} />
            </Camera>
          )}
        </View>
        <Text caption lighten style={styles.caption}>
          {camera ? l10n.TRANSFER_TXS_CAMERA : l10n.TRANSFER_TXS_CAPTION}
        </Text>
      </ScrollView>

      <Footer onBack={navigation.back} onHardwareBack={visible ? () => navigation.back() : undefined} />

      <DialogFork onClose={() => setDialog(false)} onForked={onForked} query={qr} visible={dialog} />
    </Viewport>
  );
};

Settings.propTypes = {
  visible: bool,
};

Settings.defaultProps = {
  visible: true,
};

export default Settings;
