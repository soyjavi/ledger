import { array, arrayOf, number, shape } from 'prop-types';

import React from 'react';
import { View } from 'react-native';
import { THEME } from 'reactor/common';

import { HeatMap, Heading, HorizontalChartItem } from '@components';
import { useL10N } from '@context';

import { orderByAmount } from '../../modules';
import styles from './Locations.style';

const { COLOR } = THEME;

const Locations = ({ cities, countries, points, precission }) => {
  const l10n = useL10N();
  const citiesTxs = Object.values(cities).length > 0 ? Object.values(cities).reduce((a, b) => a + b) : 1;
  const countriesTxs = Object.values(countries).length > 1 ? Object.values(countries).reduce((a, b) => a + b) : 1;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Heading value={l10n.LOCATIONS} />
        <HeatMap color={COLOR.LOCATION} points={points} precission={precission} style={styles.heatMap} />
      </View>

      <View style={styles.content}>
        <Heading value={l10n.CITIES} />
        <>
          {orderByAmount(cities).map(({ key, amount }) => (
            <HorizontalChartItem
              key={key}
              color={COLOR.LOCATION}
              currency="x"
              title={key}
              value={amount}
              width={Math.floor((amount / citiesTxs) * 100)}
            />
          ))}
        </>
      </View>

      {Object.keys(countries).length > 1 && (
        <View style={styles.content}>
          <Heading value={l10n.COUNTRIES} />
          <>
            {orderByAmount(countries).map(({ key, amount }) => (
              <HorizontalChartItem
                key={key}
                color={COLOR.LOCATION}
                currency="x"
                title={key}
                value={amount}
                width={Math.floor((amount / countriesTxs) * 100)}
              />
            ))}
          </>
        </View>
      )}
    </View>
  );
};

Locations.propTypes = {
  cities: shape({}),
  countries: shape({}),
  points: arrayOf(array),
  precission: number,
};

Locations.defaultProps = {
  cities: {},
  countries: {},
  points: [],
  precission: 0.001,
};

export default Locations;
