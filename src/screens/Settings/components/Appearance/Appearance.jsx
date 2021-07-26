import {
  // helpers,
  styles,
  Theme,
  // components
  Touchable,
  View,
} from '@lookiero/aurora';
import React from 'react';

import { changeAppearance, L10N } from '@common';
import { Heading } from '@components';
import { useStore } from '@context';

import { style } from './Appearance.style';
import { getColors } from './helpers';

const Appearance = () => {
  const { updateSettings } = useStore();

  const appearance = Theme.get('colorPrimary');

  return (
    <View style={style.container}>
      <Heading value={L10N.APPEARANCE} />

      <View style={[style.offset, style.colors]}>
        {getColors().map(({ color }) => (
          <Touchable
            key={color}
            style={styles(style.color, color === appearance && style.active, { backgroundColor: color })}
            onPress={() => changeAppearance({ color, updateSettings })}
          >
            <View />
          </Touchable>
        ))}
      </View>
    </View>
  );
};

Appearance.displayName = 'Appearance';

export { Appearance };
