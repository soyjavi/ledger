import { array, arrayOf, bool, number, oneOfType, string } from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { THEME } from '../../reactor/common';
import { Col, Row, Text } from '../../reactor/components';
import { PriceFriendly } from '../PriceFriendly';

import { ChartHeading } from './components';
import { calcHeight } from './modules';
import styles from './Chart.style';

const { COLOR } = THEME;

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
                  color={COLOR.BACKGROUND}
                  currency={currency}
                  fixed={0}
                  value={avg}
                  style={styles.legend}
                />
              </View>
            </View>
          </View>
        )}

        <Row align="end" justify="space" style={[styles.content, inherit.style]}>
          {values.map((value, index) => (
            <View key={`${value}-${index.toString()}`} style={[styles.column, inverted && styles.columnInverted]}>
              <View
                style={[
                  styles.bar,
                  inverted && styles.barInverted,
                  value !== 0 && { height: `${calcHeight(value, { min, max, avg })}%` },
                  { backgroundColor: highlight !== index ? COLOR.BASE : color },
                ]}
              />
            </View>
          ))}
        </Row>

        {inverted && <ChartHeading {...inherit} />}

        {captions && (
          <Row justify="space" style={styles.captions}>
            {captions.map((caption, index) => (
              <Col align="center" key={caption} paddingTop="S">
                <Text color={highlight !== index ? COLOR.LIGHTEN : undefined} style={styles.legend}>
                  {caption.substring(0, 3).toUpperCase()}
                </Text>
              </Col>
            ))}
          </Row>
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
