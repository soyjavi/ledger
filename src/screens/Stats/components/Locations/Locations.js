import {
  array, arrayOf, number, shape,
} from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { View } from 'react-native';

import { C, objectToQueryString } from '../../../../common';
import { Consumer } from '../../../../context';
import { THEME } from '../../../../reactor/common';
import { Image } from '../../../../reactor/components';
import { Heading, HorizontalChartItem } from '../../../../components';
import styles, { MAP_HEIGHT, MAP_WIDTH } from './Locations.style';

const { ENDPOINT } = C;
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

    const query = objectToQueryString({
      color: COLOR.PRIMARY,
      points: JSON.stringify(points),
      precission,
      resolution: `${MAP_WIDTH}x${MAP_HEIGHT}@2x`,
    });
    const citiesTotalTxs = Object.values(cities).reduce((a, b) => a + b);
    const countriesTotalTxs = Object.values(countries).reduce((a, b) => a + b);

    return (
      <Consumer>
        { ({ l10n }) => (
          <View style={styles.container}>
            <Heading breakline title={l10n.LOCATIONS} />
            <View>
              <Image
                resizeMode="cover"
                source={points.length > 0 ? { uri: `${ENDPOINT}/heatmap?${query}` } : undefined}
                style={[styles.content, styles.map]}
              />
              <Heading breakline title={l10n.CITIES} style={styles.heading} />
              <View style={styles.content}>
                { Object.keys(cities).map(item => (
                  <HorizontalChartItem
                    key={item}
                    currency="x"
                    style={{ order: Math.floor((cities[item] / citiesTotalTxs) * 100) }}
                    title={item}
                    value={cities[item]}
                    width={Math.floor((cities[item] / citiesTotalTxs) * 100)}
                  />
                ))}
              </View>

              { Object.keys(countries).length > 1 && (
                <Fragment>
                  <Heading breakline title={l10n.COUNTRIES} />
                  <View style={styles.content}>
                    { Object.keys(countries).map(item => (
                      <HorizontalChartItem
                        key={item}
                        currency="x"
                        style={{ order: Math.floor((countries[item] / countriesTotalTxs) * 100) }}
                        title={item}
                        value={countries[item]}
                        width={Math.floor((countries[item] / countriesTotalTxs) * 100)}
                      />
                    ))}
                  </View>
                </Fragment>
              )}
            </View>
          </View>
        )}
      </Consumer>
    );
  }
}

export default Locations;
