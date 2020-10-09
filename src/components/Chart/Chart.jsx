import PropTypes from 'prop-types';

import React from 'react';
import { View } from 'react-native';
import { THEME } from 'reactor/common';
import { Col, Row, Text } from 'reactor/components';

import { colorOpacity } from '@common';

import { PriceFriendly } from '../PriceFriendly';
import styles from './Chart.style';
import { ChartHeading } from './components';
import { calcHeight } from './modules';

const { COLOR, FONT, OPACITY } = THEME;

export const Chart = ({ captions, highlight, inverted = false, values = [], styleContainer, ...others }) => {
  const { color = COLOR.TEXT, currency, max, min, med: avg } = others;
  let firstValueIndex = values.findIndex((value) => value !== 0);
  if (firstValueIndex === -1) firstValueIndex = undefined;

  return (
    <View style={styleContainer}>
      {!inverted && <ChartHeading {...others} />}
      <View style={[styles.container, inverted && styles.containerInverted]}>
        {avg > 0 && (
          <View style={styles.scales}>
            <View
              style={[
                styles.scaleAvg,
                { top: inverted ? `${calcHeight(avg, { min, max })}%` : `${100 - calcHeight(avg, { min, max })}%` },
              ]}
            >
              <View style={[styles.scaleLine, { backgroundColor: color }]} />
              <View style={[styles.tag, { backgroundColor: color }]}>
                <PriceFriendly
                  //
                  bold
                  caption
                  color={COLOR.BACKGROUND}
                  currency={currency}
                  fixed={0}
                  value={avg}
                />
              </View>
            </View>
          </View>
        )}

        <Row align="end" justify="space" style={[styles.content, others.style]}>
          {values.map((value, index) => (
            <View key={`${value}-${index.toString()}`} style={[styles.column, inverted && styles.columnInverted]}>
              <View
                style={[
                  styles.bar,
                  value !== 0 && { height: `${calcHeight(value, { min, max })}%` },
                  {
                    // backgroundColor: highlight !== index ? COLOR.BASE : color,
                    backgroundColor: highlight !== index ? colorOpacity(color, OPACITY.S) : color,
                  },
                ]}
              />
            </View>
          ))}
        </Row>

        {inverted && <ChartHeading {...others} inverted />}

        {captions && (
          <Row justify="space" style={styles.captions}>
            {captions.map((caption, index) => (
              <Col align="center" key={`${caption}-${index}`} paddingTop="S">
                <Text
                  bold={highlight === index}
                  color={highlight !== index ? COLOR.LIGHTEN : undefined}
                  style={FONT.LEGEND}
                >
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
  captions: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.string,
  currency: PropTypes.string,
  highlight: PropTypes.number,
  inverted: PropTypes.bool,
  styleContainer: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  title: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.number),
};
