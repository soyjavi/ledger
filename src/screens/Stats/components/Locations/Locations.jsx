import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';

import { HeatMap, Heading, HorizontalChartItem } from '@components';
import { useL10N } from '@context';

import { orderByAmount } from '../../modules';
import styles from './Locations.style';

const Locations = ({ cities = {}, color, countries = {}, points = [], precission = 0.001 }) => {
  const l10n = useL10N();
  const citiesTxs = Object.values(cities).length > 0 ? Object.values(cities).reduce((a, b) => a + b) : 1;
  const countriesTxs = Object.values(countries).length > 1 ? Object.values(countries).reduce((a, b) => a + b) : 1;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Heading value={l10n.LOCATIONS} />
        <HeatMap color={color} points={points} precission={precission} style={styles.heatMap} />
      </View>

      <View style={styles.content}>
        <Heading value={l10n.CITIES} />
        <>
          {orderByAmount(cities).map(({ key, amount }) => (
            <HorizontalChartItem
              key={key}
              color={color}
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
                color={color}
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
  cities: PropTypes.shape({}),
  color: PropTypes.string,
  countries: PropTypes.shape({}),
  points: PropTypes.arrayOf(PropTypes.array),
  precission: PropTypes.number,
};

export { Locations };
