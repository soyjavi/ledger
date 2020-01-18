import { array, arrayOf, bool, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { THEME } from '../../reactor/common';
import { Text } from '../../reactor/components';
import { PriceFriendly } from '../PriceFriendly';

import { ChartHeading } from './components';
import { calcHeight } from './modules';
import styles from './Chart.style';

const { COLOR, OPACITY } = THEME;

const Chart = ({ captions, highlight, inverted, values, styleContainer, ...inherit }) => {
  const { color, currency, max, min, med: avg } = inherit;
  let firstValueIndex = values.findIndex((value) => value !== 0);
  if (firstValueIndex === -1) firstValueIndex = undefined;

  return (
    <View style={styleContainer}>
      {!inverted && <ChartHeading {...inherit} />}
      <View style={[styles.container, inverted && styles.containerInverted]}>
        {avg > 0 && (
          <View style={styles.scales}>
            <View style={[styles.scaleAvg, { top: `${100 - parseInt(((avg - min) * 100) / (max - min), 10)}%` }]}>
              <View style={[styles.scaleLine, { backgroundColor: color }]} />
              <View style={[styles.tag, { backgroundColor: color }]}>
                <PriceFriendly
                  bold
                  color={color === COLOR.TEXT || color === COLOR.PRIMARY ? COLOR.BACKGROUND : COLOR.TEXT}
                  currency={currency}
                  value={avg}
                  style={styles.legend}
                />
              </View>
            </View>
          </View>
        )}

        <View style={[styles.content, styles.row, inherit.style]}>
          {values.map((value, index) => (
            <View key={`${value}-${index.toString()}`} style={[styles.column, inverted && styles.columnInverted]}>
              <View
                style={[
                  styles.bar,
                  inverted && styles.barInverted,
                  value !== 0 && { height: `${calcHeight(value, { min, max, avg })}%` },
                  highlight !== index && styles.noHighlight,
                  { backgroundColor: color },
                ]}
              />
            </View>
          ))}
        </View>

        {inverted && <ChartHeading {...inherit} />}

        {captions && (
          <View style={[styles.captions, styles.row]}>
            {captions.map((caption, index) => (
              <View key={caption} style={styles.column}>
                <Text bold={highlight === index} style={[styles.legend, highlight !== index && styles.noHighlight]}>
                  {caption.substring(0, 3).toUpperCase()}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

Chart.propTypes = {
  captions: arrayOf(string),
  color: string,
  currency: string,
  highlight: number,
  inverted: bool,
  styleContainer: oneOfType([array, number]),
  title: string,
  values: arrayOf(number),
};

Chart.defaultProps = {
  captions: undefined,
  color: COLOR.TEXT,
  currency: undefined,
  highlight: undefined,
  inverted: false,
  styleContainer: undefined,
  title: undefined,
  values: [],
};

export { Chart };
