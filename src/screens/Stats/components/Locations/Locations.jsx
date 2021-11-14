import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { L10N } from '@common';
import { HeatMap, Heading, HorizontalChartItem } from '@components';

import { orderByAmount } from '../../modules';
import { style } from './Locations.style';

const Locations = ({ cities = {}, countries = {}, points = [], precission = 0.001 }) => {
  const citiesTxs = Object.values(cities).length > 0 ? Object.values(cities).reduce((a, b) => a + b) : 1;
  const countriesTxs = Object.values(countries).length > 1 ? Object.values(countries).reduce((a, b) => a + b) : 1;

  const totalCities = Object.keys(cities).length;

  return (
    <>
      <Heading value={L10N.LOCATIONS} />
      <View style={style.offset}>
        <HeatMap points={points} precission={precission} />
      </View>

      {totalCities > 1 && Object.keys(cities).length > 0 && (
        <>
          <Heading value={L10N.CITIES} style={style.heading} />
          <View style={style.offset}>
            {orderByAmount(cities).map(({ key, amount }) => (
              <HorizontalChartItem
                key={key}
                currency="x"
                title={key}
                value={amount}
                width={Math.floor((amount / citiesTxs) * 100)}
              />
            ))}
          </View>
        </>
      )}

      {totalCities > 1 && Object.keys(countries).length > 1 && (
        <>
          <Heading value={L10N.COUNTRIES} style={style.heading} />
          <View style={style.offset}>
            {orderByAmount(countries).map(({ key, amount }) => (
              <HorizontalChartItem
                key={key}
                currency="x"
                title={key}
                value={amount}
                width={Math.floor((amount / countriesTxs) * 100)}
              />
            ))}
          </View>
        </>
      )}
    </>
  );
};

Locations.propTypes = {
  cities: PropTypes.shape({}),
  countries: PropTypes.shape({}),
  points: PropTypes.arrayOf(PropTypes.array),
  precission: PropTypes.number,
};

export { Locations };
