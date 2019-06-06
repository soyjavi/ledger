import { arrayOf, bool, shape } from 'prop-types';
import React, { createRef, Fragment, Component } from 'react';
import { ScrollView, View } from 'react-native';

import ASSETS from '../../assets';
import { C } from '../../common';
import {
  Chart, Footer, Header, Heading, SliderMonths,
} from '../../components';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Text, Viewport } from '../../reactor/components';
import { ItemGroupCategories, Locations } from './components';
import { orderCaptions, query } from './modules';
import styles from './Stats.style';

const { COLOR, SPACE } = THEME;
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
      scroll: false,
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
      this.setState({ scroll: false, slider, values: query(inherit, slider) });
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

  _onScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    const { state } = this;
    const scroll = y > SPACE.MEDIUM;
    if (scroll !== state.scroll) this.setState({ scroll });
  }

  render() {
    const {
      _onChangeSlider, _onHardwareBack, _onScroll,
      props: {
        vault, vaults, visible, ...inherit
      },
      state: {
        scroll, slider, values,
      },
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
          { ({ l10n, navigation }) => (
            <Fragment>
              <Header highlight={scroll} title={`${title}${l10n.ACTIVITY}`} />
              <ScrollView
                contentContainerStyle={styles.container}
                onScroll={_onScroll}
                ref={this.scrollview}
                scrollEventThrottle={40}
              >
                <View style={styles.content}>
                  <Heading title={`${title}${l10n.ACTIVITY}`} image={ASSETS.logo} />
                  <Heading caption={l10n.BALANCE} />
                  <Chart
                    captions={orderCaptions(l10n)}
                    highlight={slider.index}
                    values={chart.balance}
                    styleContainer={[styles.chart, styles.chartMargin]}
                    style={styles.chartBalance}
                  />
                  <Heading caption={`${l10n.INCOMES} vs. ${l10n.EXPENSES}`} />
                  <Chart
                    color={COLOR.INCOMES}
                    highlight={slider.index}
                    styleContainer={styles.chart}
                    values={chart.incomes}
                  />
                  <Chart
                    captions={orderCaptions(l10n)}
                    highlight={slider.index}
                    inverted
                    values={chart.expenses}
                    color={COLOR.EXPENSES}
                    styleContainer={[styles.chart, styles.chartMargin]}
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
