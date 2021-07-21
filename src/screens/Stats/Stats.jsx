import { COLOR, View } from '@lookiero/aurora';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';

import { C, L10N } from '@common';
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

const Stats = () => {
  const store = useStore();

  const [chart, setChart] = useState({});
  const [slider, setSlider] = useState({});
  const [month, setMonth] = useState(undefined);

  const {
    settings: { baseCurrency },
  } = store;

  useLayoutEffect(() => {
    const today = new Date();

    setChart(queryChart(store));
    setSlider({ month: today.getMonth(), year: today.getFullYear(), index: STATS_MONTHS_LIMIT - 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMonth(queryMonth(store, slider));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slider]);

  const handleSliderChange = (next) => {
    if (next.index !== slider.index) setSlider(next);
  };

  const { expenses = {}, incomes = {}, locations = {} } = month || {};
  const hasExpenses = Object.keys(expenses).length > 0;
  const hasIncomes = Object.keys(incomes).length > 0;
  const hasPoints = locations.points && locations.points.length > 0;

  const chartProps = { currency: baseCurrency, highlight: slider.index };

  console.log('  <Stats>');

  return (
    <>
      <SliderMonths {...slider} onChange={handleSliderChange} />

      <Chart
        {...useMemo(() => calcScales(chart.balance), [chart.balance])}
        {...chartProps}
        captions={orderCaptions(L10N)}
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
        captions={orderCaptions(L10N)}
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
        {...useMemo(() => calcScales(chart.transfers), [chart.transfers])}
        {...chartProps}
        captions={orderCaptions(L10N)}
        title={L10N.TRANSFERS}
        values={chart.transfers}
      />
    </>
  );
};

Stats.displayName = 'Stats';

export { Stats };
