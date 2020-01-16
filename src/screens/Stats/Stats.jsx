import { arrayOf, bool, shape } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Text, Viewport } from '../../reactor/components';

import { C } from '../../common';
import { Chart, Footer, Header } from '../../components';
import { useL10N, useNavigation, useStore } from '../../context';
import { ItemGroupCategories, Locations, SliderMonths } from './components';
import { calcScales, orderCaptions, query } from './modules';
import styles from './Stats.style';

const { COLOR } = THEME;
const {
  TX: {
    TYPE: { EXPENSE, INCOME },
  },
} = C;

const Stats = (props) => {
  const { visible, ...inherit } = props;
  const [slider, setSlider] = useState({});
  const [values, setValues] = useState({});
  const scrollview = useRef(null);
  const {
    params: { vault },
    ...navigation
  } = useNavigation();
  const l10n = useL10N();
  const store = useStore();
  const { baseCurrency: currency } = store;

  useEffect(() => {
    if (visible) {
      const today = new Date();
      const nextSlider = { month: today.getMonth(), year: today.getFullYear(), index: 11 };

      scrollview.current.scrollTo({ y: 0, animated: false });
      setSlider(nextSlider);
      setValues(query(vault, store, nextSlider));
    }
  }, [store, vault, visible]); // @TODO: What this warning means?

  const onChangeSlider = (value) => {
    setSlider(value);
    setValues(query(vault, store, value));
  };

  const { chart = {}, currencies = {}, expenses = {}, incomes = {}, locations = {} } = values;
  const hasExpenses = Object.keys(expenses).length > 0;
  const hasIncomes = Object.keys(incomes).length > 0;
  const hasPoints = locations.points && locations.points.length > 0;
  const title = vault ? `${vault.title} ` : '';

  console.log('<Stats>', { visible, title, currencies });

  const common = {
    currency,
    highlight: slider.index,
  };

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Header highlight title={`${title}${l10n.ACTIVITY}`} />

      <SliderMonths {...slider} onChange={onChangeSlider} style={styles.sliderMonths} />

      <ScrollView contentContainerStyle={styles.scrollView} ref={scrollview}>
        <Chart
          {...calcScales(chart.balance)}
          {...common}
          captions={orderCaptions(l10n)}
          styleContainer={[styles.chart, styles.chartMargin]}
          style={styles.chartBalance}
          title={l10n.OVERALL_BALANCE}
          values={chart.balance}
        />
        <Chart
          {...calcScales(chart.incomes)}
          {...common}
          color={COLOR.INCOME}
          styleContainer={[styles.chart]}
          title={`${l10n.INCOMES} & ${l10n.EXPENSES}`}
          values={chart.incomes}
        />
        <Chart
          {...calcScales(chart.expenses)}
          {...common}
          captions={orderCaptions(l10n)}
          color={COLOR.EXPENSE}
          inverted
          styleContainer={[styles.chart, styles.chartMargin]}
          values={chart.expenses}
        />
        {!vault && (
          <Chart
            {...calcScales(chart.transfers)}
            {...common}
            captions={orderCaptions(l10n)}
            color={COLOR.TRANSFER}
            styleContainer={[styles.chart, styles.chartMargin]}
            title={l10n.TRANSFERS}
            values={chart.transfers}
          />
        )}

        {hasExpenses || hasIncomes ? (
          <>
            {hasIncomes && <ItemGroupCategories type={INCOME} dataSource={incomes} />}
            {hasExpenses && <ItemGroupCategories type={EXPENSE} dataSource={expenses} />}
            {hasPoints && <Locations {...inherit} {...locations} />}
          </>
        ) : (
          <View style={styles.contentEmpty}>
            <Text lighten>{l10n.NO_TRANSACTIONS}</Text>
          </View>
        )}
      </ScrollView>
      <Footer onBack={navigation.back} onHardwareBack={visible ? () => navigation.back : undefined} />
    </Viewport>
  );
};

Stats.propTypes = {
  backward: bool,
  txs: arrayOf(shape({})),
  // vault: shape({}),
  vaults: arrayOf(shape({})),
  visible: bool,
};

Stats.defaultProps = {
  backward: false,
  txs: undefined,
  // vault: undefined,
  vaults: undefined,
  visible: true,
};

export default Stats;
