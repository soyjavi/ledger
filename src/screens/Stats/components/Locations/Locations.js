import {
  array, arrayOf, number, shape,
} from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { View } from 'react-native';
import { THEME } from '../../../../reactor/common';
import { Text } from '../../../../reactor/components';

import { Consumer } from '../../../../context';
import { HeatMap, HorizontalChartItem } from '../../../../components';
import { orderByAmount } from '../../modules';
import styles, { MAP_HEIGHT, MAP_WIDTH } from './Locations.style';

const { COLOR } = THEME;

class Locations extends PureComponent {
  static propTypes = {
    cities: shape({}),
    countries: shape({}),
    points: arrayOf(array),
    precission: number,
  };

  static defaultProps = {
    cities: {},
    countries: {},
    points: [],
    precission: 0.001,
  };

  render() {
    const {
      cities, countries, points, precission,
    } = this.props;
    const citiesTxs = Object.values(cities).length > 0 ? Object.values(cities).reduce((a, b) => a + b) : 1;
    const countriesTxs = Object.values(countries).length > 1 ? Object.values(countries).reduce((a, b) => a + b) : 1;

    return (
      <Consumer>
        { ({ l10n }) => (
          <View style={styles.container}>
            <View style={styles.content}>
              <Text headline level={6} style={styles.headline}>{l10n.LOCATIONS}</Text>
              <HeatMap
                color={COLOR.LOCATION}
                points={points}
                precission={precission}
                height={MAP_HEIGHT}
                width={MAP_WIDTH}
                style={styles.map}
              />
            </View>

            <View style={styles.content}>
              <Text headline level={6} style={styles.headline}>{l10n.CITIES}</Text>
              <Fragment>
                { orderByAmount(cities).map(({ key, amount }) => (
                  <HorizontalChartItem
                    color={COLOR.LOCATION}
                    key={key}
                    currency="x"
                    title={key}
                    value={amount}
                    width={Math.floor((amount / citiesTxs) * 100)}
                  />
                ))}
              </Fragment>
            </View>

            { Object.keys(countries).length > 1 && (
              <View style={styles.content}>
                <Text headline level={6} style={styles.headline}>{l10n.COUNTRIES}</Text>
                <Fragment>
                  { orderByAmount(countries).map(({ key, amount }) => (
                    <HorizontalChartItem
                      color={COLOR.LOCATION}
                      key={key}
                      currency="x"
                      title={key}
                      value={amount}
                      width={Math.floor((amount / countriesTxs) * 100)}
                    />
                  ))}
                </Fragment>
              </View>
            )}
          </View>
        )}
      </Consumer>
    );
  }
}

export default Locations;
