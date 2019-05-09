import { arrayOf, bool, shape } from 'prop-types';
import React, { Fragment, Component } from 'react';
import { ScrollView, View } from 'react-native';

import ASSETS from '../../assets';
import {
  Chart, Footer, Header, Heading, SliderMonths,
} from '../../components';
import { Consumer } from '../../context';
import { THEME } from '../../reactor/common';
import { Viewport } from '../../reactor/components';
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
    scroll: false,
    slider: {},
    values: {},
  };

  componentWillReceiveProps({ backward, visible, ...inherit }) {
    if (visible) {
      const today = new Date();
      const slider = { month: today.getMonth(), year: today.getFullYear(), index: 11 };
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
    this.setState({ scroll: false, slider, values: query(props, slider) });
  }

  _onScroll = ({ nativeEvent: { contentOffset: { y } } }) => {
    const { state } = this;
    const scroll = y > SPACE.MEDIUM;
    if (scroll !== state.scroll) this.setState({ scroll });
  }

  render() {
    const {
      _onChangeSlider, _onScroll,
      props: {
        vault, vaults, visible, ...inherit
      },
      state: {
        scroll, slider, values,
      },
    } = this;
    const { chart = {} } = values || {};
    const title = vault ? `${vault.title} ` : '';

    console.log('<Stats>', { visible, title });

    return (
      <Viewport {...inherit} scroll={false} visible={visible}>
        { visible && (
          <Consumer>
            { ({ l10n, navigation }) => (
              <Fragment>
                <Header highlight={scroll} title={`${title}${l10n.ACTIVITY}`} />
                <ScrollView onScroll={_onScroll} scrollEventThrottle={40} contentContainerStyle={styles.container}>
                  <View style={styles.content}>
                    <Heading title={`${title}${l10n.ACTIVITY}`} image={ASSETS.logo} />
                    <Heading subtitle={l10n.BALANCE} />
                    <Chart
                      captions={orderCaptions(l10n)}
                      values={chart.balance}
                      styleContainer={[styles.chart, styles.chartMargin]}
                      style={styles.chartBalance}
                    />

                    <Heading subtitle={`${l10n.INCOMES} vs. ${l10n.EXPENSES}`} />
                    <Chart color={COLOR.INCOMES} styleContainer={styles.chart} values={chart.incomes} />
                    <Chart
                      captions={orderCaptions(l10n)}
                      inverted
                      values={chart.expenses}
                      color={COLOR.EXPENSES}
                      styleContainer={[styles.chart, styles.chartMargin]}
                    />
                  </View>

                  <SliderMonths {...slider} onChange={_onChangeSlider} style={styles.sliderMonths}/>

                  { !vault && <Locations {...inherit} {...values.locations} /> }

                  { Object.keys(values[1]).length > 0 && <ItemGroupCategories type={1} dataSource={values[1]} /> }
                  { Object.keys(values[0]).length > 0 && <ItemGroupCategories type={0} dataSource={values[0]} /> }
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
