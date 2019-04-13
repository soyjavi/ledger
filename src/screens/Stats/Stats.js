import { arrayOf, bool, shape } from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { BackHandler, ScrollView, View } from 'react-native';

import ASSETS from '../../assets';
import {
  Chart, Footer, Header, Heading,
} from '../../components';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Viewport } from '../../reactor/components';
import { ItemGroupCategories } from './components';
import { orderCaptions, query } from './modules';
import styles from './Stats.style';

const { iconBack } = ASSETS;
const { COLOR } = THEME;
const MONTHLY = 0;
const WEEKLY = 1;

class Stats extends PureComponent {
  static propTypes = {
    backward: bool,
    txs: arrayOf(shape({})),
    navigation: shape({}),
    vault: shape({}),
    vaults: arrayOf(shape({})),
    visible: bool,
  };

  static defaultProps = {
    backward: false,
    txs: undefined,
    navigation: undefined,
    vault: undefined,
    vaults: undefined,
    visible: true,
  };

  state = {
    scroll: false,
    typeQuery: MONTHLY,
    values: {},
  };

  componentWillReceiveProps({
    backward, visible, ...inherit
  }) {
    const method = backward ? 'removeEventListener' : 'addEventListener';
    const typeQuery = MONTHLY;

    if (visible) this.setState({ typeQuery, values: query(inherit, typeQuery) });
    BackHandler[method]('hardwareBackPress', () => true);
  }

  _onScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    const { state } = this;
    const scroll = y > 58;
    if (scroll !== state.scroll) this.setState({ scroll });
  }

  _onQuery = () => {
    const { props, state } = this;
    const typeQuery = state.typeQuery === MONTHLY ? WEEKLY : MONTHLY;

    this.setState({ typeQuery, values: query(props, typeQuery) });
  }

  render() {
    const {
      _onScroll, _onQuery,
      props: { visible, ...inherit },
      state: { scroll, typeQuery, values },
    } = this;
    const { chart = {} } = values || {};

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        { visible && (
          <Consumer>
            { ({ l10n, navigation }) => (
              <Fragment>
                <Header
                  highlight={scroll}
                  right={{ title: typeQuery === MONTHLY ? l10n.WEEKLY : l10n.MONTHLY, onPress: _onQuery }}
                  title={l10n.ACTIVITY}
                  visible={visible}
                />
                <ScrollView onScroll={_onScroll} scrollEventThrottle={40} contentContainerStyle={styles.container}>
                  <View style={styles.content}>
                    <Heading title={l10n.ACTIVITY} image={ASSETS.logo} />
                    <Heading subtitle={l10n.BALANCE} />
                    <Chart
                      captions={orderCaptions(l10n, typeQuery)}
                      values={chart.balance}
                      styleContainer={[styles.chart, styles.chartMargin]}
                      style={styles.chartBalance}
                    />

                    <Heading subtitle={`${l10n.INCOMES} vs. ${l10n.EXPENSES}`} />
                    <Chart color={COLOR.INCOMES} styleContainer={styles.chart} values={chart.incomes} />
                    <Chart
                      captions={orderCaptions(l10n, typeQuery)}
                      inverted
                      values={chart.expenses}
                      color={COLOR.EXPENSES}
                      styleContainer={[styles.chart, styles.chartMargin]}
                    />
                  </View>


                  { Object.keys(values[1]).length > 0 && <ItemGroupCategories type={1} dataSource={values[1]} /> }
                  { Object.keys(values[0]).length > 0 && <ItemGroupCategories type={0} dataSource={values[0]} /> }
                </ScrollView>
                <Footer onBack={navigation.goBack} />
              </Fragment>
            )}
          </Consumer>
        )}

      </Viewport>
    );
  }
}

export default Stats;