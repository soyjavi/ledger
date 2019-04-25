import { bool, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { ScrollView, View } from 'react-native';

import { Footer, Header, Heading } from '../../components';
import { C } from '../../common';
import { Consumer } from '../../context';
import { Viewport } from '../../reactor/components';
import { OptionItem, VaultItem } from './components';
import query from './modules/query';
import styles from './Settings.style';

const { SETTINGS: { HIDE_OVERALL_BALANCE, SHOW_VAULT_CURRENCY } } = C;

class Settings extends PureComponent {
  static propTypes = {
    backward: bool,
    navigation: shape({}),
    visible: bool,
  };

  static defaultProps = {
    backward: false,
    navigation: undefined,
    visible: true,
  };

  state = {
    scroll: true,
  };

  _onScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    const { state } = this;
    const scroll = y > 58;
    if (scroll !== state.scroll) this.setState({ scroll });
  }

  render() {
    const {
      _onScroll, props: { visible, ...inherit }, state: { scroll },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        { visible && (
          <Consumer>
            { ({ l10n, navigation, store: { onSettings, settings, vaults } }) => (
              <Fragment>
                <Header highlight={scroll} title={l10n.SETTINGS} />
                <ScrollView _onScroll={_onScroll} scrollEventThrottle={40} contentContainerStyle={styles.container}>
                  <View style={styles.content}>
                    <Heading breakline title={l10n.DASHBOARD} />
                    <OptionItem
                      active={settings[HIDE_OVERALL_BALANCE] !== undefined ? settings[HIDE_OVERALL_BALANCE] : false}
                      caption={l10n.SETTING_1_CAPTION}
                      title={l10n.SETTING_1_TITLE}
                      onChange={value => onSettings({ [HIDE_OVERALL_BALANCE]: value })}
                    />
                    <OptionItem
                      active={settings[SHOW_VAULT_CURRENCY] !== undefined ? settings[SHOW_VAULT_CURRENCY] : true}
                      caption={l10n.SETTING_2_CAPTION}
                      title={l10n.SETTING_2_TITLE}
                      onChange={value => onSettings({ [SHOW_VAULT_CURRENCY]: value })}
                    />
                    <Heading breakline lighten subtitle={`${l10n.VAULTS_VISIBILITY}`} />
                    { query(vaults).map(vault => <VaultItem key={vault.hash} {...vault} />)}
                  </View>

                  <View style={styles.content}>
                    <Heading breakline title={l10n.OTHERS} />
                    <OptionItem
                      active={false}
                      caption={l10n.COMING_SOON}
                      disabled
                      onChange={() => {}}
                      title={l10n.NIGHT_MODE}
                    />
                  </View>
                </ScrollView>

                <Footer onBack={navigation.goBack} onHardwareBack={navigation.goBack} visible={visible} />

              </Fragment>
            )}
          </Consumer>
        )}

      </Viewport>
    );
  }
}

export default Settings;
