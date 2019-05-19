import {
  arrayOf, bool, number, string,
} from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';

import { THEME } from '../../reactor/common';
import { Text } from '../../reactor/components';
import { calcHeight, calcRange, calcScaleValues } from './modules';
import styles from './Chart.style';

const { COLOR } = THEME;

class Chart extends Component {
  static propTypes = {
    captions: arrayOf(string),
    color: string,
    highlight: number,
    inverted: bool,
    scale: bool,
    values: arrayOf(number),
  };

  static defaultProps = {
    captions: undefined,
    color: COLOR.PRIMARY,
    highlight: undefined,
    inverted: false,
    scale: true,
    values: [],
  };

  shouldComponentUpdate(nextProps) {
    return (JSON.stringify(nextProps) !== JSON.stringify(this.props));
  }

  render() {
    const {
      captions, color, highlight, inverted, scale, values, ...inherit
    } = this.props;
    const { max, min, avg } = calcRange(values);
    const scaleValues = scale && values.length > 0 ? calcScaleValues({ avg, max, inverted }) : [];

    return (
      <View style={[styles.container, inherit.styleContainer]}>
        { scale && (
          <View style={[styles.scale, captions && styles.scaleCaptions]}>
            <View style={styles.scaleValues}>
              { scaleValues.map((value, index) => (
                <Text key={`scale-${index.toString()}`} lighten style={styles.caption}>
                  {value}
                </Text>
              ))}
            </View>
            <View style={styles.scaleLines}>
              { scaleValues.map((value, index) => (
                <View
                  key={`line-${index.toString()}`}
                  style={[styles.scaleLine, value.length === 0 && styles.scaleLineEmpty]}
                />
              ))}
            </View>
          </View>
        )}

        <View style={[styles.content, styles.row, scale && styles.rowScale, inherit.style]}>
          { values.map((value, index) => (
            <View
              key={`${value}-${index.toString()}`}
              style={[styles.column, inverted && styles.inverted]}
            >
              <View
                style={[
                  styles.item,
                  inverted && styles.itemInverted,
                  value !== 0 && {
                    backgroundColor: (highlight && highlight !== index) ? COLOR.TEXT_LIGHTEN : color,
                    height: `${calcHeight(value, { min, max, avg })}%`,
                    opacity: 1,
                  },
                ]}
              />
            </View>
          ))}
        </View>
        { captions && (
          <View style={[styles.captions, styles.row, scale && styles.rowScale]}>
            { captions.map(caption => (
              <View key={caption} style={styles.column}>
                <Text caption level={2} lighten style={styles.caption}>
                  {caption.substring(0, 3).toUpperCase()}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  }
}

export default Chart;
