import { arrayOf, bool, shape } from 'prop-types';
import React, { Fragment, Component } from 'react';
import { ScrollView, View } from 'react-native';

import ASSETS from '../../assets';
import {
  Chart, Footer, Header, Heading,
} from '../../components';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Image, Viewport } from '../../reactor/components';
import { ItemGroupCategories, Locations } from './components';
import { orderCaptions, query } from './modules';
import styles from './Stats.style';

const { COLOR, SPACE } = THEME;
const MONTHLY = 0;
const WEEKLY = 1;

class Stats extends Component {
  static propTypes = {
    backward: bool,
    txs: arrayOf(shape({})),
    vault: shape({}),
    vaults: arrayOf(shape({})),
    visible: bool,
  };

  static defaultProps = {
    backward: false,
    txs: undefined,
    vault: undefined,
    vaults: undefined,
    visible: true,
  };

  state = {
    locations: undefined,
    scroll: false,
    typeQuery: MONTHLY,
    values: {},
  };

  async componentWillReceiveProps({
    backward, visible, ...inherit
  }) {
    const typeQuery = MONTHLY;

    if (visible) {
      this.setState({ locations: undefined, typeQuery, scroll: false, values: query(inherit, typeQuery) });

      if (!inherit.vault) {
        const today = new Date();
        this.setState({
          locations: await inherit.getLocations({ year: today.getFullYear(), month: today.getMonth() + 1 }),
        });
      }
    }
  }

  shouldComponentUpdate({ visible }, { locations, scroll, typeQuery }) {
    const { props, state } = this;

    return visible !== props.visible
      || locations !== state.locations
      || scroll !== state.scroll
      || typeQuery !== state.typeQuery;
  }

  _onScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    const { state } = this;
    const scroll = y > SPACE.MEDIUM;
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
      props: {
        vault, vaults, visible, ...inherit
      },
      state: {
        locations, scroll, typeQuery, values,
      },
    } = this;
    const { chart = {} } = values || {};
    const title = vault ? `${vault.title} ` : '';

    console.log('<Stats>', { typeQuery, visible, title });

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        { visible && (
          <Consumer>
            { ({ l10n, navigation }) => (
              <Fragment>
                <Header
                  highlight={scroll}
                  right={{ title: typeQuery === MONTHLY ? l10n.WEEKLY : l10n.MONTHLY, onPress: _onQuery }}
                  title={`${title}${l10n.ACTIVITY}`}
                />
                <ScrollView onScroll={_onScroll} scrollEventThrottle={40} contentContainerStyle={styles.container}>
                  <View style={styles.content}>
                    <Heading title={`${title}${l10n.ACTIVITY}`} image={ASSETS.logo} />
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

                  { locations && <Locations dataSource={locations} /> }
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

export default Stats;
