import { array, bool, func, node, number, object, oneOfType } from 'prop-types';
import React, { useEffect, useState } from 'react';

import {
  // helpers
  POSITION,
  MOTION_TIMING,
  SIZE,
  Theme,
  // components
  Motion,
  SafeAreaView,
  View,
  // hooks
  useDevice,
  useSwipe,
} from '@lookiero/aurora';
import { style } from './Viewport.style';
import { MOTION } from 'expo-permissions';

const { motionCollapse } = Theme.get();

export const Viewport = ({ backward = false, children, visible = true, onClose }) => {
  const {
    screen: { height, width, ...screen },
  } = useDevice();

  const handleSwipe = useSwipe({
    onSwiping: ({ deltaX, right } = {}) => {
      if (!right) return;
      setRight(parseInt(deltaX, 10));
      setSwiping(true);
    },
    onSwiped: ({ deltaX, right } = {}) => {
      if (!right) return;
      else if (onClose && Math.abs(deltaX) >= screen.width / 3) onClose();
      else {
        setRight(0);
        setTimeout(() => setSwiping(false), motionCollapse);
      }
    },
  });

  const [right, setRight] = useState(0);
  const [swiping, setSwiping] = useState(false);

  useEffect(() => {
    setSwiping(false);
    if (visible) setRight(0);
  }, [visible]);

  console.log({ right, swiping });
  return (
    <Motion
      customStyle={[style.container, { height, width }]}
      disabled={right !== 0}
      duration={visible ? MOTION.EXPAND : MOTION.COLLAPSE}
      position={POSITION.ABSOLUTE}
      timing={swiping && visible ? MOTION_TIMING.SPRING : undefined}
      value={{ translateX: right ? right : visible ? (backward ? -(width / 8) : 0) : width }}
    >
      <SafeAreaView flex={SIZE.XS}>
        {children}
        <View
          {...(onClose && visible ? handleSwipe : undefined)}
          customStyle={style.swipper}
          position={POSITION.ABSOLUTE}
        />
      </SafeAreaView>
    </Motion>
  );
};

Viewport.propTypes = {
  backward: bool,
  children: node,
  visible: bool,
  onClose: func,
};
