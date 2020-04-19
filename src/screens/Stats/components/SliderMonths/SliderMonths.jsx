import { number, func } from 'prop-types';
import React, { useEffect, useRef } from 'react';

import { THEME } from '../../../../reactor/common';
import { Text, Slider } from '../../../../reactor/components';
import { useL10N } from '../../../../context';
import { CardOption } from '../../../../components';
import styles, { CARD_WIDTH } from './SliderMonths.style';
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
      scrollview.current.scrollTo({ x: (index - 3) * (CARD_WIDTH + SPACE.S), animated: true });
    }
  }, [index]);

  return (
    <Slider ref={slider} itemWidth={CARD_WIDTH + SPACE.S} itemMargin={0} style={[styles.slider, others.style]}>
      {getLastMonths(l10n.MONTHS).map(({ month, year }, i) => (
        <CardOption
          key={month}
          title={l10n.MONTHS[month].substr(0, 3)}
          onPress={() => onChange({ index: i, month, year })}
          selected={index === i}
          style={styles.card}
        >
          <Text bold caption color={index === i ? COLOR.TEXT : COLOR.LIGHTEN}>
            {year}
          </Text>
        </CardOption>
      ))}
    </Slider>
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
