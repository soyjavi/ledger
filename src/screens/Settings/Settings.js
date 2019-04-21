import { bool, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { ScrollView, View } from 'react-native';

import { Footer, Header, Heading } from '../../components';
import { Consumer } from '../../context';
import { Text, Viewport } from '../../reactor/components';
import { OptionItem, VaultItem } from './components';
import query from './modules/query';
import styles from './Settings.style';

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

  _onSetting = (key, value) => {

  }

  _onScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    const { state } = this;
    const scroll = y > 58;
    if (scroll !== state.scroll) this.setState({ scroll });
  }

  render() {
    const {
      _onSetting, _onScroll, props: { visible, ...inherit }, state: { scroll },
    } = this;

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        { visible && (
          <Consumer>
            { ({ l10n, navigation, store: { vaults } }) => (
              <Fragment>
                <Header highlight={scroll} title={l10n.SETTINGS} />
                <ScrollView _onScroll={_onScroll} scrollEventThrottle={40} contentContainerStyle={styles.container}>
                  <View style={styles.content}>
                    <Heading title={l10n.DASHBOARD} />
                    <OptionItem
                      active={false}
                      caption={l10n.SETTING_1_CAPTION}
                      title={l10n.SETTING_1_TITLE}
                      onChange={_onSetting}
                    />
                    <OptionItem
                      caption={l10n.SETTING_2_CAPTION}
                      title={l10n.SETTING_2_TITLE}
                      onChange={_onSetting}
                    />
                    <Heading breakline lighten subtitle={`${l10n.VAULTS_VISIBILITY}`} />
                    { query(vaults).map(vault => <VaultItem key={vault.hash} {...vault} />)}
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
