import { bool } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { ScrollView, View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Viewport } from '../../reactor/components';

import { FLAGS } from '../../assets';
import { C } from '../../common';
import {
  Footer, Header, Heading, HorizontalChartItem, OptionItem, PriceFriendly,
} from '../../components';
import { Consumer } from '../../context';
import { query, sort } from './modules';
import styles from './Vaults.style';

const { SCREEN } = C;
const { COLOR } = THEME;

class Vaults extends PureComponent {
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
    this.state = { scroll: true };
  }

  componentWillReceiveProps({ visible, ...inherit }) {
    if (visible) this.setState(query(inherit));
  }

  _onHardwareBack = (navigation) => {
    navigation.goBack();
    this.forceUpdate();
  }

  _onScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    const { state } = this;
    const scroll = y > 58;
    if (scroll !== state.scroll) this.setState({ scroll });
  }

  _onVault = (vault, { navigation }) => {
    navigation.navigate(SCREEN.VAULT, vault);
  }

  render() {
    const {
      _onHardwareBack, _onScroll, _onVault, props: { visible, ...inherit }, state: { currencies = [], scroll },
    } = this;

    console.log('<Vaults>', { visible });

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({
            l10n, navigation, store: {
              baseCurrency, onSettings, settings, vaults,
            },
          }) => (
            <Fragment>
              <Header highlight={scroll} title={l10n.VAULTS} />
              <ScrollView _onScroll={_onScroll} scrollEventThrottle={40} contentContainerStyle={styles.container}>
                <Heading subtitle={l10n.CURRENCIES} />
                <View style={styles.currencies}>
                  { currencies.map(({ base, currency, weight }) => (
                    <Fragment key={currency}>
                      <HorizontalChartItem
                        color={COLOR[currency]}
                        key={currency}
                        currency={baseCurrency}
                        image={FLAGS[currency]}
                        style={styles.horizontalChart}
                        title={currency}
                        value={base}
                        width={weight}
                      />
                      <View style={styles.vaults}>
                        { sort(vaults, currency).map((vault) => (
                          <OptionItem
                            key={vault.hash}
                            active={settings[vault.hash]}
                            onChange={(value) => onSettings({ [vault.hash]: value })}
                            onPress={() => _onVault(vault, { navigation })}
                            {...vault}
                          >
                            <View style={styles.row}>
                              <PriceFriendly
                                subtitle
                                level={3}
                                lighten
                                currency={currency}
                                value={vault.currentBalance}
                              />
                            </View>
                          </OptionItem>
                        ))}
                      </View>
                    </Fragment>
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

export default Vaults;
