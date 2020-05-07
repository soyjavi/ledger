import { arrayOf, bool, shape } from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { THEME } from 'reactor/common';
import { Viewport } from 'reactor/components';

import { BANNERS } from '@assets';
import { C } from '@common';
import { Banner, Chart, Footer, Header, Heading, ScrollView } from '@components';
import { useL10N, useNavigation, useStore } from '@context';

import { ItemGroupCategories, Locations, SliderMonths } from './components';
import { calcScales, orderCaptions, queryMonth, queryChart } from './modules';
import styles from './Stats.style';

const { COLOR } = THEME;
const {
  TX: {
    TYPE: { EXPENSE, INCOME },
  },
} = C;

const Stats = (props) => {
  const { visible, ...inherit } = props;

  const [chart, setChart] = useState({});
  const [slider, setSlider] = useState({});
  const [month, setMonth] = useState({});
  const [scroll, setScroll] = useState(false);

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
      setChart(queryChart(vault, store));
      setMonth(queryMonth(vault, store, nextSlider));
    }
  }, [store, vault, visible]); // @TODO: What this warning means?

  const onChangeSlider = (value) => {
    setSlider(value);
    setMonth(queryMonth(vault, store, value));
  };

  const { expenses = {}, incomes = {}, locations = {} } = month;
  const hasExpenses = Object.keys(expenses).length > 0;
  const hasIncomes = Object.keys(incomes).length > 0;
  const hasPoints = locations.points && locations.points.length > 0;
  const title = vault ? `${vault.title} ` : `${l10n.MONTHS[slider.month]} ${slider.year}`;

  const common = {
    currency,
    highlight: slider.index,
  };

  const hasData = hasExpenses || hasIncomes;

  return (
    <Viewport {...inherit} scroll={false} visible={visible}>
      <Heading />
      <Header highlight={scroll} onBack={scroll ? navigation.back : undefined} title={title} />

      <ScrollView contentContainerStyle={styles.scrollView} onScroll={setScroll} ref={scrollview}>
        <SliderMonths {...slider} onChange={onChangeSlider} marginBottom="M" />

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
          color={COLOR.BRAND}
          styleContainer={[styles.chart]}
          title={`${l10n.INCOMES} & ${l10n.EXPENSES}`}
          values={chart.incomes}
        />
        <Chart
          {...calcScales(chart.expenses)}
          {...common}
          captions={orderCaptions(l10n)}
          inverted
          styleContainer={[styles.chart, styles.chartMargin]}
          values={chart.expenses}
        />

        {hasData ? (
          <>
            {hasIncomes && <ItemGroupCategories type={INCOME} dataSource={incomes} />}
            {hasExpenses && <ItemGroupCategories type={EXPENSE} dataSource={expenses} />}
          </>
        ) : (
          <Banner image={BANNERS.NOT_FOUND} paddingHorizontal="M" paddingVertical="M" title={l10n.NO_TRANSACTIONS} />
        )}

        {hasData && (
          <>
            {hasPoints && <Locations {...inherit} {...locations} />}
            {!vault && (
              <Chart
                {...calcScales(chart.transfers)}
                {...common}
                captions={orderCaptions(l10n)}
                styleContainer={[styles.chart, styles.chartMargin]}
                title={l10n.TRANSFERS}
                values={chart.transfers}
              />
            )}
          </>
        )}
      </ScrollView>
      <Footer onBack={navigation.back} onHardwareBack={visible ? navigation.back : undefined} visible={!scroll} />
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
