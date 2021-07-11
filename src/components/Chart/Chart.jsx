import {
  // helpers
  COLOR,
  // components
  Text,
  View,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { PriceFriendly } from '../PriceFriendly';
import { ChartHeading } from './Chart.Heading';
import { style } from './Chart.style';
import { calcHeight } from './modules';

const Chart = ({ captions, highlight, inverted, values = [], style: styleContainer, ...others }) => {
  const { color = COLOR.CONTENT, currency, max, min, med: avg } = others;
  let firstValueIndex = values.findIndex((value) => value !== 0);
  if (firstValueIndex === -1) firstValueIndex = undefined;

  return (
    <View style={styleContainer}>
      {!inverted && <ChartHeading {...others} />}

      <View style={[style.content, !inverted && style.border]}>
        {avg > 0 && (
          <View style={style.scales}>
            <View
              style={[
                style.scaleAvg,
                {
                  top: inverted ? `${calcHeight(avg, { min, max })}%` : `${100 - calcHeight(avg, { min, max })}%`,
                },
              ]}
            >
              <View backgroundColor={color} style={style.scaleLine} />
              <View backgroundColor={color} style={style.tag}>
                <PriceFriendly detail level={2} color={COLOR.BASE} currency={currency} fixed={0} value={avg} />
              </View>
            </View>
          </View>
        )}

        <View style={style.bars}>
          {values.map((value, index) => (
            <View key={`${value}-${index.toString()}`} style={[style.column, inverted && style.columnInverted]}>
              <View
                backgroundColor={color}
                style={[
                  style.bar,
                  inverted && style.barInverted,
                  value !== 0 && { height: `${calcHeight(value, { min, max })}%` },
                  { opacity: highlight !== index ? 0.25 : 1 },
                ]}
              />
            </View>
          ))}
        </View>
      </View>

      {inverted && <ChartHeading {...others} inverted />}

      {captions && (
        <View style={[style.content, style.captions]}>
          {captions.map((caption, index) => (
            <Text
              key={`${caption}-${index}`}
              style={style.caption}
              {...(highlight === index
                ? {
                    action: true,
                  }
                : {
                    detail: true,
                    color: COLOR.GRAYSCALE_L,
                  })}
            >
              {caption.substring(0, 3).toUpperCase()}
            </Text>
          ))}
        </View>
      )}
      {/* </View> */}
    </View>
  );
};

Chart.propTypes = {
  captions: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.string,
  currency: PropTypes.string,
  highlight: PropTypes.number,
  inverted: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  title: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.number),
};

export { Chart };
