import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { THEME } from 'reactor/common';
import { Text, Slider } from 'reactor/components';

import { C } from '@common';
import { Option, OPTION_SIZE } from '@components';
import { useL10N } from '@context';

import { getLastMonths } from './modules';

const { STATS_MONTHS_LIMIT } = C;
const { COLOR, SPACE } = THEME;

const SliderMonths = ({ index, onChange, ...others }) => {
  const l10n = useL10N();
  const slider = useRef(null);

  useEffect(() => {
    if (index) {
      const { current } = slider;
      current.scrollTo({ x: (index - 3) * (OPTION_SIZE + SPACE.S), animated: index < STATS_MONTHS_LIMIT - 1 });
    }
  }, [index]);

  return (
    <Slider ref={slider} itemWidth={OPTION_SIZE} itemMargin={SPACE.S} {...others}>
      {getLastMonths(STATS_MONTHS_LIMIT).map(({ month, year }, i) => (
        <Option
          key={`${month}-${year}`}
          color={COLOR.BASE}
          marginRight="S"
          onPress={() => onChange({ index: i, month, year })}
          selected={index === i}
          caption={l10n.MONTHS[month].substr(0, 3).toUpperCase()}
        >
          <Text bold caption color={index === i ? COLOR.BACKGROUND : COLOR.LIGHTEN}>
            {year}
          </Text>
        </Option>
      ))}
    </Slider>
  );
};

SliderMonths.propTypes = {
  index: PropTypes.number,
  onChange: PropTypes.func,
};

export { SliderMonths };
