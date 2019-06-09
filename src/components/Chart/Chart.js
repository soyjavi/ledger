import {
  arrayOf, bool, number, shape, string,
} from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { THEME } from '../../reactor/common';
import { Text } from '../../reactor/components';

import { calcHeight, calcRange } from './modules';
import styles from './Chart.style';

const { COLOR } = THEME;

class Chart extends Component {
  static propTypes = {
    captions: arrayOf(string),
    color: string,
    highlight: number,
    inverted: bool,
    scales: arrayOf(shape({})),
    values: arrayOf(number),
  };

  static defaultProps = {
    captions: undefined,
    color: COLOR.PRIMARY,
    highlight: undefined,
    inverted: false,
    scales: undefined,
    values: [],
  };

  shouldComponentUpdate(nextProps) {
    return (JSON.stringify(nextProps) !== JSON.stringify(this.props));
  }

  render() {
    const {
      captions, color, highlight, inverted, scales, values, ...inherit
    } = this.props;
    const { max, min, avg } = calcRange(values);
    const avgProps = { backgroundColor: color };

    return (
      <View style={[!inverted && styles.container, inherit.styleContainer]}>
        { scales && (
          <View style={[styles.scales, captions && styles.scaleCaptions]}>
            <View style={[styles.scaleValues, inverted && styles.scaleValuesInverted]}>
              { scales.map((scale, index) => (
                <View
                  key={`scale-${index.toString()}`}
                  style={[styles.tag, scale.highlight && avgProps]}
                >
                  { scale.value !== 0 && (
                    <Text lighten style={[styles.legend, scale.highlight && styles.legendHighlight]}>
                      {scale.value}
                    </Text>
                  )}
                </View>
              ))}
            </View>
            <View style={styles.scaleLines}>
              { scales.map((scale, index) => (
                <View
                  key={`line-${index.toString()}`}
                  style={[
                    styles.scaleLine,
                    scale.highlight && [styles.scaleLineAverage, avgProps],
                  ]}
                />
              ))}
            </View>
          </View>
        )}

        <View style={[styles.content, styles.row, scales && styles.rowScale, inherit.style]}>
          { values.map((value, index) => (
            <View
              key={`${value}-${index.toString()}`}
              style={[styles.column, inverted && styles.columnInverted]}
            >
              <View
                style={[
                  styles.bar,
                  inverted && styles.barInverted,
                  value !== 0
                    ? { backgroundColor: color, height: `${calcHeight(value, { min, max, avg })}%` }
                    : styles.barEmpty,
                ]}
              >
                { value !== 0 && (
                  <View
                    style={[
                      styles.bar,
                      inverted && styles.barInverted,
                      value !== 0 && {
                        backgroundColor: color,
                        height: '100%',
                        opacity: (highlight && highlight === index) ? 1 : 0.33,
                      },
                    ]}
                  />
                )}
              </View>
            </View>
          ))}
        </View>
        { captions && (
          <View style={[styles.captions, styles.row, scales && styles.rowScale]}>
            { captions.map((caption, index) => (
              <View key={caption} style={styles.column}>
                <Text lighten style={[styles.legend, highlight === index && styles.legendHighlight]}>
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
