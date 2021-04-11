import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { THEME } from 'reactor/common';
import { Text, Slider, View } from 'reactor/components';

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
    <View {...others}>
      <Slider ref={slider} itemWidth={OPTION_SIZE} itemMargin={SPACE.S}>
        {getLastMonths(STATS_MONTHS_LIMIT).map(({ month, year }, i) => (
          <Option
            key={`${month}-${year}`}
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
    </View>
  );
};

SliderMonths.propTypes = {
  index: PropTypes.number,
  month: PropTypes.number,
  year: PropTypes.number,
  onChange: PropTypes.func,
};

SliderMonths.defaultProps = {
  index: undefined,
  month: 0,
  onChange: undefined,
  year: 0,
};

export { SliderMonths };
