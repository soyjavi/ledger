import { number, func } from 'prop-types';
import React, { useEffect, useRef } from 'react';
import { THEME } from 'reactor/common';
import { Text, Slider, View } from 'reactor/components';

import { useL10N } from '@context';
import { Option, OPTION_SIZE } from '@components';
import getLastMonths from './modules/getLastMonths';

const { COLOR, SPACE } = THEME;

const SliderMonths = ({ index, onChange, ...others }) => {
  const l10n = useL10N();
  const slider = useRef(null);

  useEffect(() => {
    if (index) {
      const {
        current: { scrollview },
      } = slider;
      scrollview.current.scrollTo({ x: (index - 3) * (OPTION_SIZE + SPACE.S), animated: true });
    }
  }, [index]);

  return (
    <View {...others}>
      <Slider ref={slider} itemWidth={OPTION_SIZE} itemMargin={SPACE.S}>
        {getLastMonths(l10n.MONTHS).map(({ month, year }, i) => (
          <Option
            key={month}
            marginRight="S"
            onPress={() => onChange({ index: i, month, year })}
            selected={index === i}
            caption={l10n.MONTHS[month].substr(0, 3)}
          >
            <Text bold caption color={COLOR.LIGHTEN}>
              {year}
            </Text>
          </Option>
        ))}
      </Slider>
    </View>
  );
};

SliderMonths.propTypes = {
  index: number,
  month: number,
  onChange: func,
  year: number,
};

SliderMonths.defaultProps = {
  index: undefined,
  month: 0,
  onChange: undefined,
  year: 0,
};

export default SliderMonths;
