import {
  array, arrayOf, number, shape,
} from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { View } from 'react-native';

import { Consumer } from '../../../../context';
import { Heading, HeatMap, HorizontalChartItem } from '../../../../components';
import styles, { MAP_HEIGHT, MAP_WIDTH } from './Locations.style';

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
            <Heading breakline title={l10n.LOCATIONS} />
            <View>
              <HeatMap
                points={points}
                precission={precission}
                height={MAP_HEIGHT}
                width={MAP_WIDTH}
                style={[styles.content, styles.map]}
              />
              <Heading breakline title={l10n.CITIES} style={styles.heading} />
              <View style={styles.content}>
                { Object.keys(cities).map(item => (
                  <HorizontalChartItem
                    key={item}
                    currency="x"
                    style={{ order: Math.floor((cities[item] / citiesTxs) * 100) }}
                    title={item}
                    value={cities[item]}
                    width={Math.floor((cities[item] / citiesTxs) * 100)}
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
                        style={{ order: Math.floor((countries[item] / countriesTxs) * 100) }}
                        title={item}
                        value={countries[item]}
                        width={Math.floor((countries[item] / countriesTxs) * 100)}
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
