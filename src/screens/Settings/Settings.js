import { bool } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { ScrollView, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

import ASSETS from '../../assets';
import {
  Footer, Header, Heading, OptionItem,
} from '../../components';
import { C } from '../../common';
import { Consumer } from '../../context';
import {
  Activity, Button, Image, Text, Viewport,
} from '../../reactor/components';
import { DialogFork } from './components';
import styles from './Settings.style';

const { SETTINGS: { HIDE_OVERALL_BALANCE, SHOW_VAULT_CURRENCY } } = C;
const QR_URI = 'https://chart.googleapis.com/chart?cht=qr&chs=512x512&chld=H|1&chl';
const CAMERA_PROPS = {
  barCodeScannerSettings: { barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] },
  type: Camera.Constants.Type.back,
};

class Settings extends PureComponent {
  static propTypes = {
    backward: bool,
    visible: bool,
  };

  static defaultProps = {
    backward: false,
    visible: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      dialog: false,
      hasCamera: undefined,
      qr: undefined,
      showCamera: false,
      scroll: true,

    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCamera: status === 'granted' });
  }

  componentWillReceiveProps({ visible: nextVisible }) {
    const { props: { visible } } = this;

    if (!nextVisible && visible) this.setState({ qr: undefined, showCamera: false });
  }

  _onCloseDialog = () => this.setState({ dialog: false })

  _onForked = (navigation) => {
    const { _onCloseDialog } = this;

    _onCloseDialog();
    navigation.goBack();
  }

  _onHardwareBack = (navigation) => {
    navigation.goBack();
    this.forceUpdate();
  }

  _onQR = ({ data = '' } = {}) => {
    const [secure, file] = data.split('|');

    this.setState({ dialog: secure !== undefined && file !== undefined, qr: data });
  }

  _onScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    const { state } = this;
    const scroll = y > 58;
    if (scroll !== state.scroll) this.setState({ scroll });
  }

  _onToggleCamera = () => {
    const { state: { showCamera } } = this;
    this.setState({ showCamera: !showCamera });
  }

  render() {
    const {
      _onCloseDialog, _onForked, _onHardwareBack, _onQR, _onScroll, _onToggleCamera,
      props: { visible, ...inherit },
      state: {
        dialog, hasCamera, qr, showCamera, scroll,
      },
    } = this;

    console.log('<Settings>', { visible, hasCamera });

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({
            l10n, navigation,
            store: {
              authorization, onSettings, secret, settings,
            },
          }) => (
            <Fragment>
              <Header highlight={scroll} title={l10n.SETTINGS} />

              <ScrollView _onScroll={_onScroll} scrollEventThrottle={40} contentContainerStyle={styles.container}>
                <Heading subtitle={l10n.DASHBOARD} />
                <View style={styles.options}>
                  <OptionItem
                    active={settings[HIDE_OVERALL_BALANCE]}
                    caption={l10n.SETTING_1_CAPTION}
                    title={l10n.SETTING_1_TITLE}
                    onChange={(value) => onSettings({ [HIDE_OVERALL_BALANCE]: value })}
                  />
                  <OptionItem
                    active={settings[SHOW_VAULT_CURRENCY]}
                    caption={l10n.SETTING_2_CAPTION}
                    title={l10n.SETTING_2_TITLE}
                    onChange={(value) => onSettings({ [SHOW_VAULT_CURRENCY]: value })}
                  />
                </View>

                <Heading subtitle={l10n.TRANSFER_TXS} caption={l10n.IMPORT_EXPORT_CAPTION} lighten>
                  { hasCamera === undefined && <Activity color="white" style={styles.activity} /> }
                  { hasCamera && (
                    <Button
                      contained={false}
                      icon={!showCamera ? ASSETS.camera : undefined}
                      onPress={_onToggleCamera}
                      small
                      style={styles.button}
                      title={!showCamera ? l10n.QR_READER : l10n.CLOSE}
                    />
                  )}
                </Heading>
                <View style={styles.content}>
                  { !showCamera
                    ? <Image source={{ uri: `${QR_URI}=${secret}|${authorization}` }} style={styles.qr} />
                    : (
                      <Camera {...CAMERA_PROPS} onBarCodeScanned={_onQR} style={styles.qr}>
                        <View style={styles.cameraViewport} />
                      </Camera>
                    )}
                  <Text caption lighten style={styles.caption}>
                    {showCamera ? l10n.TRANSFER_TXS_CAMERA : l10n.TRANSFER_TXS_CAPTION}
                  </Text>
                </View>
              </ScrollView>

              <Footer
                onBack={navigation.goBack}
                onHardwareBack={visible ? () => _onHardwareBack(navigation) : undefined}
              />

              <DialogFork
                onClose={_onCloseDialog}
                onForked={() => _onForked(navigation)}
                query={qr}
                visible={dialog}
              />
            </Fragment>
          )}
        </Consumer>

      </Viewport>
    );
  }
}

export default Settings;
