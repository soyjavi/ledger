import { bool } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { ScrollView, View } from 'react-native';

import PKG from '../../../package.json';
import {
  Footer, Header, Heading, OptionItem,
} from '../../components';
import { C } from '../../common';
import { Consumer } from '../../context';
import { Text, Viewport } from '../../reactor/components';
import styles from './Settings.style';

const { SETTINGS: { HIDE_OVERALL_BALANCE, SHOW_VAULT_CURRENCY } } = C;

class Settings extends PureComponent {
  static propTypes = {
    backward: bool,
    visible: bool,
  };

  static defaultProps = {
    backward: false,
    visible: true,
  };

  state = {
    scroll: true,
  };

  _onHardwareBack = (navigation) => {
    navigation.goBack();
    this.forceUpdate();
  }

  _onScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    const { state } = this;
    const scroll = y > 58;
    if (scroll !== state.scroll) this.setState({ scroll });
  }

  render() {
    const {
      _onHardwareBack, _onScroll, props: { visible, ...inherit }, state: { scroll },
    } = this;

    console.log('<Settings>', { visible });

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({
            l10n, navigation, store: { onSettings, secret, settings },
          }) => (
            <Fragment>
              <Header highlight={scroll} title={l10n.SETTINGS} />
              <ScrollView _onScroll={_onScroll} scrollEventThrottle={40} contentContainerStyle={styles.container}>
                <Heading title={l10n.DASHBOARD} />
                <OptionItem
                  active={settings[HIDE_OVERALL_BALANCE]}
                  caption={l10n.SETTING_1_CAPTION}
                  title={l10n.SETTING_1_TITLE}
                  onChange={value => onSettings({ [HIDE_OVERALL_BALANCE]: value })}
                />
                <OptionItem
                  active={settings[SHOW_VAULT_CURRENCY]}
                  caption={l10n.SETTING_2_CAPTION}
                  title={l10n.SETTING_2_TITLE}
                  onChange={value => onSettings({ [SHOW_VAULT_CURRENCY]: value })}
                />

                <View style={styles.frame}>
                  <Text caption>{`v${PKG.version}`}</Text>
                  <Text caption lighten>{secret}</Text>
                </View>
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
