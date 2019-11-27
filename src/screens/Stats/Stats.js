import { arrayOf, bool, shape } from 'prop-types';
import React, { createRef, Fragment, Component } from 'react';
import { ScrollView, View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Text, Viewport } from '../../reactor/components';

import { C } from '../../common';
import { Chart, Footer, Header } from '../../components';
import { Consumer } from '../../context';
import { ItemGroupCategories, Locations, SliderMonths } from './components';
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
      || (
        visible && (
          scroll !== state.scroll
          || slider.index !== state.slider.index
          || typeQuery !== state.typeQuery)
      );
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
      state: {
        slider,
        values: {
          chart = {}, currencies = {}, expenses = {}, incomes = {}, locations = {},
        } = {},
      },
    } = this;
    const title = vault ? `${vault.title} ` : '';
    const hasExpenses = Object.keys(expenses).length > 0;
    const hasIncomes = Object.keys(incomes).length > 0;
    const hasPoints = locations.points && locations.points.length > 0;

    console.log('<Stats>', { visible, title, currencies });

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        <Consumer>
          { ({ l10n, navigation, store: { baseCurrency: currency } }) => (
            <Fragment>
              <Header highlight title={`${title}${l10n.ACTIVITY}`} />

              <SliderMonths {...slider} onChange={_onChangeSlider} style={styles.sliderMonths} />

              <ScrollView contentContainerStyle={styles.scrollView} ref={this.scrollview}>
                <Chart
                  {...calcScales(chart.balance)}
                  captions={orderCaptions(l10n)}
                  color={COLOR.ACCENT}
                  currency={currency}
                  highlight={slider.index}
                  styleContainer={[styles.chart, styles.chartMargin]}
                  style={styles.chartBalance}
                  title={l10n.OVERALL_BALANCE}
                  values={chart.balance}
                />
                <Chart
                  {...calcScales(chart.incomes)}
                  color={COLOR.INCOME}
                  currency={currency}
                  highlight={slider.index}
                  styleContainer={styles.chart}
                  title={`${l10n.INCOMES} vs. ${l10n.EXPENSES}`}
                  values={chart.incomes}
                />
                <Chart
                  {...calcScales(chart.expenses)}
                  captions={orderCaptions(l10n)}
                  currency={currency}
                  color={COLOR.EXPENSE}
                  highlight={slider.index}
                  inverted
                  styleContainer={[styles.chart, styles.chartMargin]}
                  values={chart.expenses}
                />
                { !vault && (
                  <Chart
                    {...calcScales(chart.transfers)}
                    captions={orderCaptions(l10n)}
                    color={COLOR.TRANSFER}
                    currency={currency}
                    highlight={slider.index}
                    styleContainer={[styles.chart, styles.chartMargin]}
                    title={l10n.TRANSFERS}
                    values={chart.transfers}
                  />
                )}

                { (hasExpenses || hasIncomes)
                  ? (
                    <Fragment>
                      { hasIncomes && <ItemGroupCategories type={INCOME} dataSource={incomes} /> }
                      { hasExpenses && <ItemGroupCategories type={EXPENSE} dataSource={expenses} /> }
                      { hasPoints && <Locations {...inherit} {...locations} /> }
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
