import { arrayOf, bool, shape } from 'prop-types';
import React, { createRef, Fragment, Component } from 'react';
import { ScrollView, View } from 'react-native';

import { C } from '../../common';
import {
  Chart, Footer, Header, Heading, SliderMonths,
} from '../../components';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Text, Viewport } from '../../reactor/components';
import { ItemGroupCategories, Locations } from './components';
import { calcScales, orderCaptions, query } from './modules';
import styles from './Stats.style';

const { COLOR } = THEME;
const { TX: { TYPE: { EXPENSE, INCOME } } } = C;

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

  constructor(props) {
    super(props);
    this.scrollview = createRef();
    this.state = {
      slider: {},
      values: {},
    };
  }

  componentWillReceiveProps({ backward, visible, ...inherit }) {
    if (visible) {
      const { props } = this;
      const today = new Date();
      const slider = { month: today.getMonth(), year: today.getFullYear(), index: 11 };

      if (visible !== props.visible) this.scrollview.current.scrollTo({ y: 0, animated: false });
      this.setState({ slider, values: query(inherit, slider) });
    }
  }

  shouldComponentUpdate({ visible }, { scroll, slider = {}, typeQuery }) {
    const { props, state } = this;

    return visible !== props.visible
      || scroll !== state.scroll
      || slider.index !== state.slider.index
      || typeQuery !== state.typeQuery;
  }

  _onChangeSlider = (slider) => {
    const { props } = this;
    this.setState({ slider, values: query(props, slider) });
  }

  _onHardwareBack = (navigation) => {
    navigation.goBack();
    this.forceUpdate();
  }

  render() {
    const {
      _onChangeSlider, _onHardwareBack,
      props: {
        vault, vaults, visible, ...inherit
      },
      state: { slider, values },
    } = this;
    const {
      chart = {}, [EXPENSE]: expenses = {}, [INCOME]: incomes = {}, locations = {},
    } = values || {};
    const title = vault ? `${vault.title} ` : '';
    const hasExpenses = Object.keys(expenses).length > 0;
    const hasIncomes = Object.keys(incomes).length > 0;
    const hasPoints = locations.points && locations.points.length > 0;

    console.log('<Stats>', { visible, title });

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({ l10n, navigation, store }) => (
            <Fragment>
              <Header highlight title={`${title}${l10n.ACTIVITY}`} />
              <ScrollView contentContainerStyle={styles.container} ref={this.scrollview}>
                <View style={styles.content}>
                  <Heading caption={l10n.BALANCE} />
                  <Chart
                    captions={orderCaptions(l10n)}
                    color={COLOR.ACCENT}
                    highlight={slider.index}
                    scales={calcScales(chart.balance, store)}
                    styleContainer={[styles.chart, styles.chartMargin]}
                    style={styles.chartBalance}
                    values={chart.balance}
                  />
                  <Heading caption={`${l10n.INCOMES} vs. ${l10n.EXPENSES}`} />
                  <Chart
                    color={COLOR.INCOME}
                    highlight={slider.index}
                    scales={calcScales(chart.incomes, store)}
                    styleContainer={styles.chart}
                    values={chart.incomes}
                  />
                  <Chart
                    captions={orderCaptions(l10n)}
                    color={COLOR.EXPENSE}
                    highlight={slider.index}
                    inverted
                    scales={calcScales(chart.expenses, store)}
                    styleContainer={[styles.chart, styles.chartMargin]}
                    values={chart.expenses}
                  />
                </View>

                <SliderMonths {...slider} onChange={_onChangeSlider} style={styles.sliderMonths} />
                { (hasExpenses || hasIncomes)
                  ? (
                    <Fragment>
                      { hasPoints && <Locations {...inherit} {...locations} /> }
                      { hasIncomes && <ItemGroupCategories type={INCOME} dataSource={incomes} /> }
                      { hasExpenses && <ItemGroupCategories type={EXPENSE} dataSource={expenses} /> }
                    </Fragment>
                  )
                  : (
                    <View style={styles.contentEmpty}>
                      <Text level={2} lighten>{l10n.NO_TRANSACTIONS}</Text>
                    </View>
                  )}
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

export default Stats;
