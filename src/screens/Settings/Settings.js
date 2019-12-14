import { bool } from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

import ASSETS from '../../assets';
import {
  Footer, Header, Heading, OptionItem,
} from '../../components';
import { Consumer, useSettings } from '../../context';
import {
  Activity, Button, Image, Text, Viewport,
} from '../../reactor/components';
import { DialogFork } from './components';
import styles from './Settings.style';

const QR_URI = 'https://chart.googleapis.com/chart?cht=qr&chs=512x512&chld=H|1&chl';
const CAMERA_PROPS = {
  barCodeScannerSettings: { barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] },
  type: Camera.Constants.Type.back,
};

const Settings = ({ visible, ...inherit }) => {
  const { state: { maskAmount } = {}, dispatch } = useSettings();
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

  const onForked = (navigation) => {
    setDialog(false);
    navigation.goBack();
  };

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Consumer>
        { ({ l10n, navigation, store: { authorization, secret } }) => (
          <Fragment>
            <Header highlight title={l10n.SETTINGS} />

            <ScrollView contentContainerStyle={styles.container}>
              <Heading subtitle={l10n.DASHBOARD} />
              <View style={styles.options}>
                <OptionItem
                  active={maskAmount}
                  caption={l10n.SETTING_1_CAPTION}
                  title={l10n.SETTING_1_TITLE}
                  onChange={(value) => dispatch({ type: 'MASK_AMOUNT', value })}
                />
              </View>

              <Heading subtitle={l10n.TRANSFER_TXS} caption={l10n.IMPORT_EXPORT_CAPTION} lighten>
                { hasCamera === undefined && <Activity color="white" style={styles.activity} /> }
                { hasCamera && (
                  <Button
                    contained={false}
                    icon={camera ? undefined : ASSETS.camera}
                    onPress={() => setCamera(!camera)}
                    small
                    style={styles.button}
                    title={camera ? l10n.CLOSE : l10n.QR_READER}
                  />
                )}
              </Heading>
              <View style={styles.content}>
                { !camera
                  ? <Image source={{ uri: `${QR_URI}=${secret}|${authorization}` }} style={styles.qr} />
                  : (
                    <Camera {...CAMERA_PROPS} onBarCodeScanned={onQR} style={styles.qr}>
                      <View style={styles.cameraViewport} />
                    </Camera>
                  )}
                <Text caption lighten style={styles.caption}>
                  {camera ? l10n.TRANSFER_TXS_CAMERA : l10n.TRANSFER_TXS_CAPTION}
                </Text>
              </View>
            </ScrollView>

            <Footer
              onBack={navigation.goBack}
              onHardwareBack={visible ? () => navigation.goBack() : undefined}
            />

            <DialogFork
              onClose={() => setDialog(false)}
              onForked={() => onForked(navigation)}
              query={qr}
              visible={dialog}
            />
          </Fragment>
        )}
      </Consumer>
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
