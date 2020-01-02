import {
  array, arrayOf, bool, number, oneOfType, string,
} from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { THEME } from '../../reactor/common';
import { Text } from '../../reactor/components';
import { Heading } from '../Heading';
import { PriceFriendly } from '../PriceFriendly';

import { calcHeight } from './modules';
import styles from './Chart.style';

const { COLOR } = THEME;


const HeadingExtended = ({
  title, max, min, ...inherit
}) => (
  <Heading value={title} style={styles.heading}>
    <View style={styles.row}>
      { max > 0 && <PriceFriendly {...inherit} label="max " value={max} style={styles.legend} />}
      { min > 0 && <PriceFriendly {...inherit} label="  min " value={min} style={styles.legend} />}
    </View>
  </Heading>
);

HeadingExtended.propTypes = {
  title: string,
  max: number,
  min: number,
};

HeadingExtended.defaultProps = {
  title: undefined,
  max: undefined,
  min: undefined,
};

const Chart = React.memo(({
  captions, highlight, inverted, values, styleContainer, ...inherit
}) => {
  const {
    color, currency, max, min, med: avg,
  } = inherit;
  let firstValueIndex = values.findIndex((value) => value !== 0);
  if (firstValueIndex === -1) firstValueIndex = undefined;

  return (
    <View style={styleContainer}>
      { !inverted && <HeadingExtended {...inherit} /> }
      <View style={[styles.container, inverted && styles.containerInverted]}>
        { avg > 0 && (
          <View style={styles.scales}>
            <View style={[styles.scaleAvg, { top: `${100 - parseInt(((avg - min) * 100) / (max - min), 10)}%` }]}>
              <View style={[styles.scaleLine, { backgroundColor: color }]} />
              <View style={[styles.tag, { backgroundColor: color }]}>
                <PriceFriendly
                  currency={currency}
                  value={avg}
                  lighten
                  style={[styles.legend, styles.legendHighlight]}
                />
              </View>
            </View>
          </View>
        )}

        <View style={[styles.content, styles.row, inherit.style]}>
          { values.map((value, index) => (
            <View
              key={`${value}-${index.toString()}`}
              style={[styles.column, inverted && styles.columnInverted]}
            >
              <View
                style={[
                  styles.bar,
                  inverted && styles.barInverted,
                  value !== 0 && { height: `${calcHeight(value, { min, max, avg })}%` },
                  {
                    backgroundColor: color,
                    opacity: (highlight && highlight === index) ? 1 : 0.68,
                  },
                ]}
              />
            </View>
          ))}
        </View>

        { inverted && <HeadingExtended {...inherit} /> }

        { captions && (
          <View style={[styles.captions, styles.row]}>
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
    </View>
  );
});

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
  color: COLOR.PRIMARY,
  currency: undefined,
  highlight: undefined,
  inverted: false,
  styleContainer: undefined,
  title: undefined,
  values: [],
};


export { Chart };
