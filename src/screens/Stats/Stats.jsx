import {
  // helpers
  COLOR,
  Theme,
  // components
  View,
} from '@lookiero/aurora';
import React, { useLayoutEffect, useMemo, useState } from 'react';

import { C, L10N, ROUTE } from '@common';
import { Viewport } from '@components';
import { useStore } from '@context';

import { Chart, ItemGroupCategories, Locations, SliderMonths } from './components';
import { calcScales, orderCaptions, queryMonth, queryChart } from './modules';
import { style } from './Stats.style';

const {
  STATS_MONTHS_LIMIT,
  TX: {
    TYPE: { EXPENSE, INCOME },
  },
} = C;

const captions = orderCaptions(L10N);

const Stats = () => {
  const store = useStore();

  const [chart, setChart] = useState({});
  const [slider, setSlider] = useState({});
  const [month, setMonth] = useState(undefined);

  const {
    settings: { baseCurrency },
    txs,
  } = store;

  useLayoutEffect(() => {
    const today = new Date();
    const { month = today.getMonth(), year = today.getFullYear(), index = STATS_MONTHS_LIMIT - 1 } = slider;

    setChart(queryChart(store));
    setMonth(queryMonth(store, { month, year }));
    if (!slider.index) setTimeout(() => setSlider({ month, year, index }), Theme.get('motionExpand'));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txs]);

  const handleSliderChange = (next) => {
    if (next.index !== slider.index) {
      setSlider(next);
      setMonth(queryMonth(store, next));
    }
  };

  const { expenses = {}, incomes = {}, locations = {} } = month || {};
  const hasExpenses = Object.keys(expenses).length > 0;
  const hasIncomes = Object.keys(incomes).length > 0;
  const hasPoints = locations.points && locations.points.length > 0;

  const chartProps = { currency: baseCurrency, highlight: slider.index };

  return (
    <Viewport path={ROUTE.TAB_STATS} stackMode={false}>
      <SliderMonths {...slider} onChange={handleSliderChange} />

      <Chart
        {...useMemo(() => calcScales(chart.balance), [chart.balance])}
        {...chartProps}
        captions={captions}
        color={COLOR.PRIMARY}
        style={style.chartMargin}
        title={L10N.OVERALL_BALANCE}
        values={chart.balance}
      />

      <Chart
        {...useMemo(() => calcScales(chart.incomes), [chart.incomes])}
        {...chartProps}
        color={COLOR.PRIMARY}
        title={`${L10N.INCOMES} & ${L10N.EXPENSES}`}
        values={chart.incomes}
      />
      <Chart
        {...useMemo(() => calcScales(chart.expenses), [chart.expenses])}
        {...chartProps}
        captions={captions}
        inverted
        style={style.chartMargin}
        values={chart.expenses}
      />

      {(hasExpenses || hasIncomes || hasPoints) && (
        <>
          {hasIncomes && <ItemGroupCategories color={COLOR.PRIMARY} type={INCOME} dataSource={incomes} />}
          {hasExpenses && <ItemGroupCategories type={EXPENSE} dataSource={expenses} />}
          {hasPoints && <Locations {...locations} />}
        </>
      )}

      <View style={style.chartMargin} />

      <Chart
        {...useMemo(() => calcScales(chart.investments), [chart.investments])}
        {...chartProps}
        captions={captions}
        style={style.chartMargin}
        title={L10N.INVESTMENTS}
        values={chart.investments}
      />

      <Chart
        {...useMemo(() => calcScales(chart.transfers), [chart.transfers])}
        {...chartProps}
        captions={captions}
        title={L10N.TRANSFERS}
        values={chart.transfers}
      />
    </Viewport>
  );
};

Stats.displayName = 'Stats';

export { Stats };
