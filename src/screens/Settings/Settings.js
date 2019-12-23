import { MaterialCommunityIcons } from '@expo/vector-icons';
import { bool } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { THEME } from '../../reactor/common';
import {
  Activity, Button, Image, Text, Viewport,
} from '../../reactor/components';

import { C } from '../../common';
import { Footer, Header, Heading } from '../../components';
import {
  useL10N, useNavigation, useSettings, useStore,
} from '../../context';
import { DialogFork, VaultItem } from './components';
import { sort } from './modules';
import styles from './Settings.style';

const { SCREEN } = C;
const { COLOR } = THEME;

const QR_URI = 'https://chart.googleapis.com/chart?cht=qr&chs=512x512&chld=H|1&chl';
const CAMERA_PROPS = {
  barCodeScannerSettings: { barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] },
  type: Camera.Constants.Type.back,
};

const Settings = ({ visible, ...inherit }) => {
  const { state = {}, dispatch } = useSettings();
  const navigation = useNavigation();
  const l10n = useL10N();
  const { authorization, secret, vaults } = useStore();

  const [dialog, setDialog] = useState(false);
  const [hasCamera, setHasCamera] = useState(undefined);
  const [camera, setCamera] = useState(false);
  const [qr, setQr] = useState(undefined);
  const [order, setOrder] = useState(true);

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
    setDialog(false);
    navigation.back();
  };

  console.log('<Settings>', { visible });

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Header highlight title={l10n.SETTINGS} />

      <ScrollView contentContainerStyle={styles.container}>
        <Heading subtitle={`${l10n.VAULTS} ${l10n.VISIBILITY}`}>
          <Button contained={false} small onPress={() => setOrder(!order)}>
            <MaterialCommunityIcons
              name={order ? 'sort-descending' : 'sort-ascending'}
              color={COLOR.TEXT}
              size={20}
            />
          </Button>
        </Heading>
        <View style={styles.currencies}>
          { sort(vaults, order).map((vault) => (
            <VaultItem
              key={vault.hash}
              active={state[vault.hash]}
              dataSource={vault}
              onChange={(value) => dispatch({ type: 'VAULT_VISIBLE', vault: vault.hash, value })}
              onPress={() => navigation.go(SCREEN.VAULT, vault)}
            />
          ))}
        </View>

        <View style={styles.content}>
          <Heading color={COLOR.TEXT_CONTRAST} subtitle={l10n.TRANSFER_TXS} caption={l10n.IMPORT_EXPORT_CAPTION}>
            { hasCamera === undefined && <Activity color="white" style={styles.activity} /> }
            { hasCamera && (
              <Button
                contained={false}
                onPress={() => setCamera(!camera)}
                small
                style={styles.button}
                title={camera ? l10n.CLOSE : l10n.QR_READER}
              />
            )}
          </Heading>
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
        onBack={navigation.back}
        onHardwareBack={visible ? () => navigation.back() : undefined}
      />

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
