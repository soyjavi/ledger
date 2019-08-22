import { bool } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { ScrollView, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

import {
  Footer, Header, Heading, OptionItem,
} from '../../components';
import { C } from '../../common';
import { Consumer } from '../../context';
import {
  Activity, Button, Image, Viewport,
} from '../../reactor/components';
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
      hasCamera: undefined,
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

    if (!nextVisible && visible) this.setState({ showCamera: false });
  }

  _onHardwareBack = (navigation) => {
    navigation.goBack();
    this.forceUpdate();
  }

  _onQR = (output) => {
    console.log('::onQR::', output);
  }

  _onScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    const { state } = this;
    const scroll = y > 58;
    if (scroll !== state.scroll) this.setState({ scroll });
  }

  _onToggleCamera = () => this.setState({ showCamera: !this.state.showCamera })

  render() {
    const {
      _onHardwareBack, _onQR, _onScroll, _onToggleCamera,
      props: { visible, ...inherit },
      state: { hasCamera, showCamera, scroll },
    } = this;

    console.log('<Settings>', { visible, hasCamera });

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({
            l10n, navigation, store: { onSettings, secret, settings },
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

                <Heading subtitle={l10n.IMPORT_EXPORT_TITLE} caption={l10n.IMPORT_EXPORT_CAPTION} lighten />
                { !showCamera
                  ? <Image source={{ uri: `${QR_URI}=${secret}` }} style={styles.qr} />
                  : (
                    <Camera {...CAMERA_PROPS} onBarCodeScanned={_onQR} style={styles.qr}>
                      <View style={styles.cameraViewport} />
                    </Camera>
                  )}

                { hasCamera && (
                  <Button
                    outlined
                    onPress={_onToggleCamera}
                    title={!showCamera ? l10n.QR_READER : l10n.CLOSE}
                    style={styles.button}
                  />
                )}

                { hasCamera === undefined && <Activity color="white" size="large" style={styles.activity} /> }
              </ScrollView>

              <Footer
                onBack={navigation.goBack}
                onHardwareBack={visible ? () => _onHardwareBack(navigation) : undefined}
              />
            </Fragment>
          )}
        </Consumer>

      </Viewport>
    );
  }
}

export default Settings;
