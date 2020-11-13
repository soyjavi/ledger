import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { THEME } from 'reactor/common';
import { Viewport } from 'reactor/components';

import { BANNERS } from '@assets';
import { C } from '@common';
import { Banner, Chart, Header, ScrollView, Summary } from '@components';
import { useL10N, useNavigation, useStore } from '@context';

import { ItemGroupCategories, Locations, SliderMonths } from './components';
import { calcScales, orderCaptions, queryMonth, queryChart } from './modules';
import styles from './Stats.style';

const {
  STATS_MONTHS_LIMIT,
  TX: {
    TYPE: { EXPENSE, INCOME },
  },
} = C;
const { COLOR } = THEME;

const Stats = ({ visible, ...inherit }) => {
  const scrollview = useRef(null);
  const navigation = useNavigation();
  const l10n = useL10N();
  const store = useStore();

  const [chart, setChart] = useState({});
  const [slider, setSlider] = useState({});
  const [month, setMonth] = useState({});
  const [scroll, setScroll] = useState(false);

  const {
    settings: { baseCurrency },
  } = store;

  useEffect(() => {
    if (visible) {
      const today = new Date();
      setChart(queryChart(store));
      setSlider({ month: today.getMonth(), year: today.getFullYear(), index: STATS_MONTHS_LIMIT - 1 });
    } else if (scroll) scrollview.current.scrollTo({ y: 0, animated: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (visible) setMonth(queryMonth(store, slider));
  }, [slider, store, visible]);

  const handleSliderChange = (next) => {
    if (next.index !== slider.index) setSlider(next);
  };

  const { expenses = {}, incomes = {}, locations = {} } = month;
  const hasExpenses = Object.keys(expenses).length > 0;
  const hasIncomes = Object.keys(incomes).length > 0;
  const hasPoints = locations.points && locations.points.length > 0;

  const chartProps = { currency: baseCurrency, highlight: slider.index };

  console.log('  <Stats>', { visible });

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Header highlight={scroll} onBack={navigation.back} title={`${l10n.MONTHS[slider.month]} ${slider.year}`} />

      <ScrollView contentContainerStyle={styles.scrollView} onScroll={(value) => setScroll(value)} ref={scrollview}>
        <Summary currency={baseCurrency} title={`${l10n.MONTHS[slider.month]} ${slider.year}`} />

        <SliderMonths {...slider} onChange={handleSliderChange} marginBottom="XL" />

        <Chart
          {...calcScales(chart.balance)}
          {...chartProps}
          captions={orderCaptions(l10n)}
          color={COLOR.BRAND}
          styleContainer={[styles.chart, styles.chartMargin]}
          style={styles.chartBalance}
          title={l10n.OVERALL_BALANCE}
          values={chart.balance}
        />

        <Chart
          {...calcScales(chart.incomes)}
          {...chartProps}
          color={COLOR.BRAND}
          styleContainer={[styles.chart]}
          title={`${l10n.INCOMES} & ${l10n.EXPENSES}`}
          values={chart.incomes}
        />
        <Chart
          {...calcScales(chart.expenses)}
          {...chartProps}
          captions={orderCaptions(l10n)}
          inverted
          styleContainer={[styles.chart, styles.chartMargin]}
          values={chart.expenses}
        />

        {hasExpenses || hasIncomes ? (
          <>
            {hasIncomes && <ItemGroupCategories color={COLOR.BRAND} type={INCOME} dataSource={incomes} />}
            {hasExpenses && <ItemGroupCategories type={EXPENSE} dataSource={expenses} />}
          </>
        ) : (
          <Banner image={BANNERS.NOT_FOUND} paddingHorizontal="M" paddingVertical="M" title={l10n.NO_TRANSACTIONS} />
        )}

        {(hasExpenses || hasIncomes) && (
          <>
            {hasPoints && <Locations {...locations} />}
            <Chart
              {...calcScales(chart.transfers)}
              {...chartProps}
              captions={orderCaptions(l10n)}
              styleContainer={[styles.chart, styles.chartMargin]}
              title={l10n.TRANSFERS}
              values={chart.transfers}
            />
          </>
        )}
      </ScrollView>
    </Viewport>
  );
};

Stats.propTypes = {
  visible: PropTypes.bool,
};

export { Stats };
