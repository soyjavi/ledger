import { arrayOf, bool, shape } from 'prop-types';
import React, {
  Fragment, useEffect, useRef, useState,
} from 'react';
import { ScrollView, View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Text, Viewport } from '../../reactor/components';

import { C } from '../../common';
import { Chart, Footer, Header } from '../../components';
import { Consumer, useNavigation } from '../../context';
import { ItemGroupCategories, Locations, SliderMonths } from './components';
import { calcScales, orderCaptions, query } from './modules';
import styles from './Stats.style';

const { COLOR } = THEME;
const { TX: { TYPE: { EXPENSE, INCOME } } } = C;

const Stats = (props) => {
  const {
    vault, vaults, visible, ...inherit
  } = props;
  const [slider, setSlider] = useState({});
  const [values, setValues] = useState({});
  const scrollview = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (visible) {
      const today = new Date();
      const nextSlider = { month: today.getMonth(), year: today.getFullYear(), index: 11 };

      scrollview.current.scrollTo({ y: 0, animated: false });
      setSlider(nextSlider);
      setValues(query(props, nextSlider));
    }
  }, [props, visible]); // @TODO: What this warning means?

  const onChangeSlider = (value) => {
    setSlider(value);
    setValues(query(props, value));
  };

  const {
    chart = {}, currencies = {}, expenses = {}, incomes = {}, locations = {},
  } = values;
  const hasExpenses = Object.keys(expenses).length > 0;
  const hasIncomes = Object.keys(incomes).length > 0;
  const hasPoints = locations.points && locations.points.length > 0;
  const title = vault ? `${vault.title} ` : '';

  console.log('<Stats>', { visible, title, currencies });

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Consumer>
        { ({ l10n, store: { baseCurrency: currency } }) => (
          <Fragment>
            <Header highlight title={`${title}${l10n.ACTIVITY}`} />

            <SliderMonths {...slider} onChange={onChangeSlider} style={styles.sliderMonths} />

            <ScrollView contentContainerStyle={styles.scrollView} ref={scrollview}>
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
                    <Text lighten>{l10n.NO_TRANSACTIONS}</Text>
                  </View>
                )}
            </ScrollView>
            <Footer
              onBack={navigation.goBack}
              onHardwareBack={visible ? () => navigation.goBack : undefined}
            />
          </Fragment>
        )}
      </Consumer>

    </Viewport>
  );
};

Stats.propTypes = {
  backward: bool,
  txs: arrayOf(shape({})),
  vault: shape({}),
  vaults: arrayOf(shape({})),
  visible: bool,
};

Stats.defaultProps = {
  backward: false,
  txs: undefined,
  vault: undefined,
  vaults: undefined,
  visible: true,
};

export default Stats;
