import {
  // helpers,
  styles,
  Theme,
  // components
  ScrollView,
  View,
  // hooks
  useDevice,
} from '@lookiero/aurora';
import React from 'react';

import { changeAppearance, L10N } from '@common';
import { Heading, Option, OPTION_SIZE } from '@components';
import { useStore } from '@context';

import { style } from './Appearance.style';
import { getColors } from './helpers';

const Appearance = () => {
  const {
    screen: { width },
  } = useDevice();
  const { updateSettings } = useStore();

  const appearance = Theme.get('colorPrimary');

  const colors = getColors();

  return (
    <View style={style.container}>
      <Heading value={L10N.APPEARANCE} />

      <ScrollView horizontal snapInterval={OPTION_SIZE} width={width}>
        {colors.map(({ color }, index) => (
          <Option
            //
            key={color}
            selected={color === appearance}
            style={styles(style.card, index === 0 && style.firstCard, index === colors.length - 1 && style.lastCard)}
            onPress={() => changeAppearance({ color, updateSettings })}
          >
            <View style={styles(style.color, { backgroundColor: color })} />
          </Option>
        ))}
      </ScrollView>
    </View>
  );
};

Appearance.displayName = 'Appearance';

export { Appearance };
