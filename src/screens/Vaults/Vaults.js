import { bool } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { Image, ScrollView, View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Viewport } from '../../reactor/components';
import { format } from '../../reactor/components/Price/modules';

import { FLAGS } from '../../assets';
import {
  Footer, Header, Heading, HorizontalChartItem, OptionItem, PriceFriendly,
} from '../../components';
import { C, exchange } from '../../common';
import { Consumer } from '../../context';
import { query, sort } from './modules';
import styles from './Vaults.style';

const { COLOR } = THEME;
const { SYMBOL } = C;

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

  render() {
    const {
      _onHardwareBack, _onScroll, props: { visible, ...inherit }, state: { currencies = [], scroll },
    } = this;

    console.log('<Vaults>', { visible });

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({
            l10n, navigation, store: {
              baseCurrency, onSettings, rates, settings, vaults,
            },
          }) => (
            <Fragment>
              <Header highlight={scroll} title={l10n.VAULTS} />
              <ScrollView _onScroll={_onScroll} scrollEventThrottle={40} contentContainerStyle={styles.container}>
                <Heading subtitle={l10n.CURRENCIES} />
                <View style={styles.currencies}>
                  { currencies.map(({
                    balance, base, currency, weight,
                  }) => (
                    <Fragment key={currency}>
                      <HorizontalChartItem
                        color={COLOR[currency]}
                        key={currency}
                        currency={baseCurrency}
                        image={FLAGS[currency]}
                        style={styles.horizontalChart}
                        _title={format({ symbol: SYMBOL[currency], value: balance })}
                        title={currency}
                        value={base}
                        width={weight}
                      />
                      <View style={styles.vaults}>
                        { sort(vaults, currency).map(({ currentBalance, hash, ...vault }) => (
                          <OptionItem
                            key={hash}
                            active={settings[hash]}
                            onChange={(value) => onSettings({ [hash]: value })}
                            {...vault}
                          >
                            <View style={styles.row}>
                              { 1 === 2 && <Image source={FLAGS[currency]} style={styles.optionFlag} /> }
                              <PriceFriendly
                                subtitle
                                level={3}
                                lighten
                                currency={currency}
                                value={currentBalance}
                                _currency={baseCurrency}
                                _value={baseCurrency !== currency
                                  ? exchange(Math.abs(currentBalance), currency, baseCurrency, rates)
                                  : Math.abs(currentBalance)}
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
