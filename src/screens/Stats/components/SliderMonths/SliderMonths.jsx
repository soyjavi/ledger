import {
  // components
  ScrollView,
  // hooks
  useDevice,
} from '@lookiero/aurora';
import PropTypes from 'prop-types';
import React from 'react';

import { C, L10N } from '@common';
import { Option, OPTION_SIZE } from '@components';

import { getLastMonths } from './modules';
import { style } from './SliderMonths.style';

const { STATS_MONTHS_LIMIT } = C;

const SliderMonths = ({ index, onChange, ...others }) => {
  const {
    screen: { width },
  } = useDevice();

  return (
    <ScrollView
      horizontal
      scrollTo={(index - 1) * OPTION_SIZE}
      snapInterval={OPTION_SIZE}
      style={[style.slider, others.style]}
      width={width}
    >
      {getLastMonths(STATS_MONTHS_LIMIT).map(({ month, year }, i) => (
        <Option
          key={`${month}-${year}`}
          caption={L10N.MONTHS[month].substr(0, 3).toUpperCase()}
          legend={year}
          selected={index === i}
          style={i === 0 ? style.firstCard : style.card}
          onPress={() => onChange({ index: i, month, year })}
        />
      ))}
    </ScrollView>
  );
};

SliderMonths.propTypes = {
  index: PropTypes.number,
  onChange: PropTypes.func,
};

export { SliderMonths };
