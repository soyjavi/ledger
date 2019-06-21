import { bool } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { Image, ScrollView, View } from 'react-native';

import { FLAGS } from '../../assets';
import {
  Footer, Header, Heading, PriceFriendly,
} from '../../components';
import { C, exchange } from '../../common';
import { Consumer } from '../../context';
import { Viewport } from '../../reactor/components';
import { OptionItem } from './components';
import query from './modules/query';
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
            l10n, navigation, store: {
              baseCurrency, onSettings, rates, settings, vaults,
            },
          }) => (
            <Fragment>
              <Header highlight={scroll} title={l10n.SETTINGS} />
              <ScrollView _onScroll={_onScroll} scrollEventThrottle={40} contentContainerStyle={styles.container}>
                <View style={styles.content}>
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
                </View>

                <View style={styles.content}>
                  <Heading title={`${l10n.VAULTS_VISIBILITY}`} />
                  { query(vaults).map(({
                    currency, currentBalance, hash, ...vault
                  }) => (
                    <OptionItem
                      key={hash}
                      active={settings[hash]}
                      onChange={value => onSettings({ [hash]: value })}
                      {...vault}
                    >
                      <View style={styles.row}>
                        <Image source={FLAGS[currency]} style={styles.optionFlag} />
                        <PriceFriendly
                          subtitle
                          level={3}
                          lighten
                          currency={baseCurrency}
                          value={baseCurrency !== currency
                            ? exchange(Math.abs(currentBalance), currency, baseCurrency, rates)
                            : Math.abs(currentBalance)}
                        />
                      </View>
                    </OptionItem>
                  ))}
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
